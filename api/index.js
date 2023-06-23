const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const BusinessOwner = require("./models/BusinessOwner");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const multer = require("multer");
const fs = require("fs");
const mime = require('mime-types');
const axios = require("axios");
require("dotenv").config();
const app = express();
const photosMiddleware = multer({dest:'/tmp'});
const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "djfnrkjvbwc";
const bucket = 'airbnb-clone-uploads';
mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5173","https://master--roaring-lollipop-68e43f.netlify.app"],
  })
);

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFilename,
    ContentType: mimetype,
    ACL: 'public-read',
  }));
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  // const bcryptSalt = await bcrypt.genSalt(10);
  mongoose.connect(process.env.MONGO_URL);
  const {
    name,
    email,
    password,
    userType,
    businessName,
    businessContact,
    businessAddress,
    businessWebsite,
  } = req.body;

  if (userType === "business") {
    try {
      const businessOwnerDoc = await BusinessOwner.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        businessName,
        businessContact,
        businessAddress,
        businessWebsite,
        userType,
        profileImg: "",
      });
      res.json(businessOwnerDoc);
    } catch (e) {
      console.log(e);
      res.status(422).json(e);
    }
  } else {
    try {
      const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        userType,
        profileImg: "",
      });
      res.json(userDoc);
    } catch (e) {
      console.log(e);
      res.status(422).json(e);
    }
  }
});

app.post("/a/register", async (req, res) => {
  const bcryptSalt = await bcrypt.genSalt(10);
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  try {
    const userDoc = await Admin.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      userType: "admin",
      profileImg: "",
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(422).json(e);
  }
});

app.get("/profile", (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      let result;
      if (userData.userType === "business") {
        result = await BusinessOwner.findById(userData.id);
      } else if (userData.userType === "admin") {
        result = await Admin.findById(userData.id);
      } else {
        result = await User.findById(userData.id);
      }
      res.json(result);
    });
  } else {
    res.json(null);
  }
});

app.put("/profile", photosMiddleware.array("photos", 100), async (req, res) => {
  // const bcryptSalt = await bcrypt.genSalt(10);
  // mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  let userDoc;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err;
    }

    if (userData.userType === "business") {
      userDoc = await BusinessOwner.findById(userData.id);
      const {
        name,
        email,
        password,
        businessName,
        businessContact,
        businessAddress,
        businessWebsite,
        profileImg,
      } = req.body;
      if (password.trim()) {
        userDoc.set({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
          businessName,
          businessContact,
          businessAddress,
          businessWebsite,
          profileImg,
        });
      } else {
        userDoc.set({
          name,
          email,
          businessName,
          businessContact,
          businessAddress,
          businessWebsite,
          profileImg,
        });
      }
    } else {
      userDoc = await User.findById(userData.id);
      const { name, email, password, profileImg } = req.body;

      if (password.trim()) {
        userDoc.set({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
          profileImg,
        });
      } else {
        userDoc.set({
          name,
          email,
          profileImg,
        });
      }
    }
    await userDoc.save();
    jwt.sign(
      {
        email: userDoc.email,
        id: userDoc._id,
        name: userDoc.name,
        userType: userDoc.userType,
      },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token).json(userDoc);
      }
    );
  });
});

app.get("/public-profile/:id", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  let id = req.params.id;
  let result = await BusinessOwner.findById(id);
  res.json(result);
});

app.get("/business-places/:id", async (req, res) => {
  let id = req.params.id;
  res.json(await Place.find({ owner: id }));
});

app.post("/login/:userType", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userType = req.params.userType;
  let userDoc;

  if (userType === "business") {
    userDoc = await BusinessOwner.findOne({ email });
  } else {
    userDoc = await User.findOne({ email });
  }
  console.log(userDoc);

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
          userType: userType,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(400).json("not found");
  }
});

app.post("/a/login", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  let userDoc = await Admin.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
          userType: "admin",
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token, {
            // expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
            httpOnly: true,
            sameSite: "none",
            secure: "false",
        }).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(400).json("not found");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: '/tmp/' +newName,
  });
  const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
  console.log(url)
  res.json(url);
});


app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname,mimetype} = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post(
  "/upload-profile-img",
  photosMiddleware.array("photos", 1),
  async (req, res) => {
    const {path,originalname,mimetype} = req.files[0];
    const url = await uploadToS3(path, originalname, mimetype);
    res.json(url);
  }
);

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err;
    }
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    // const {id} = userData.id;
    if (err) {
      throw err;
    }
    res.json(await Place.find({ owner: userData.id }));
  });
});

app.get("/a/user-places", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    res.json(await Place.find());
  } else {
    res.sendStatus(401);
  }
});

app.get("/user-places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.find({ owner: id }));
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err;
    }
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.get("/a/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    res.json(await Booking.find().populate("place"));
  } else {
    res.sendStatus(401);
  }
});

app.delete("/a/bookings/:id", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    const bookingId = req.params.id;
    try {
      console.log(bookingId);
      const result = await Booking.deleteOne({ _id: bookingId });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Booking deleted successfully" });
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the booking" });
    }
  } else {
    res.sendStatus(401);
  }
});

app.delete("/a/places/:id", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    const placeId = req.params.id;
    try {
      const result = await Place.deleteOne({ _id: placeId });
      await Booking.deleteMany({ place: placeId });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Place deleted successfully" });
      } else {
        res.status(404).json({ error: "Place not found" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the place" });
    }
  } else {
    res.sendStatus(401);
  }
});

app.delete("/a/users/:userType/:id", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const userId = req.params.id;
  const userType = req.params.userType;
  let result;

  if (userData.userType === "admin") {
    try {
      if(userType === 'business') {
        result = await BusinessOwner.deleteOne({ _id: userId });
      } else {
        result = await User.deleteOne({ _id: userId });
      }
      
      await Booking.deleteMany({ user: userId });
      await Place.deleteMany({ owner: userId });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
    }
  } else {
    res.sendStatus(401);
  }
});

app.get("/a/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    res.json(await Booking.find().populate("place"));
  } else {
    res.sendStatus(401);
  }
});

app.get("/a/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    res.json(await Booking.find().populate("place"));
  } else {
    res.sendStatus(401);
  }
});

app.get("/a/users/:userType", async (req, res) => {
  const { userType } = req.params;
  const userData = await getUserDataFromRequest(req);
  if (userData.userType === "admin") {
    if (userType === "business") {
      res.json(await BusinessOwner.find());
    } else {
      res.json(await User.find());
    }
  } else {
    res.sendStatus(401);
  }
});

app.post("/a/users/:userType", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { userType } = req.params;
  let userDoc;
  if (userData.userType === "admin") {
    if (userType === "business") {
      const {
        name,
        email,
        password,
        businessName,
        businessContact,
        businessAddress,
        businessWebsite,
      } = req.body;
      userDoc = await BusinessOwner.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        businessName,
        businessContact,
        businessAddress,
        businessWebsite,
        userType: "business",
        profileImg: "",
      });
    } else {
      const { name, email, password } = req.body;
      userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        userType: "user",
        profileImg: "",
      });
    }
    res.json(userDoc);
  } else {
    res.sendStatus(401);
  }
});

app.put("/a/users/:userType", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { userType } = req.params;
  let userDoc;
  if (userData.userType === "admin") {
    if (userType === "business") {
      const {
        id,
        name,
        email,
        password,
        businessName,
        businessContact,
        businessAddress,
        businessWebsite,
      } = req.body;

      userDoc = await BusinessOwner.findById(id);

      if (password.trim()) {
        userDoc.set({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
          businessName,
          businessContact,
          businessAddress,
          businessWebsite,
        });
      } else {
        userDoc.set({
          name,
          email,
          businessName,
          businessContact,
          businessAddress,
          businessWebsite,
        });
      }
    } else {
      const { id, name, email, password } = req.body;
      userDoc = await User.findById(id);
      if (password.trim()) {
        userDoc.set({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
        });
      } else {
        userDoc.set({
          name,
          email,
        });
      }
    }

    await userDoc.save();
    res.json(userDoc);
  } else {
    res.sendStatus(401);
  }
});

app.get("/a/users/:userType/:id", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { userType, id } = req.params;
  if (userData.userType === "admin") {
    if(userType === 'business') {
      result = await BusinessOwner.findById(id);
    } else {
      result = await User.findById(id);
    }
    res.json(result);
  } else {
    res.sendStatus(401);
  }
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  console.log("check in : ", checkIn);
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/search/api", async (req, res) => {
  const { location, checkIn, checkOut, minPrice, maxPrice, numberOfGuests } =
    req.query;
  const rId = await getRegionId(location);
  if (rId && checkIn && checkOut && minPrice && maxPrice && numberOfGuests) {
    try {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const yearIn = checkInDate.getFullYear();
      const monthIn = checkInDate.getMonth() + 1; // Month is zero-based, so add 1
      const dayIn = checkInDate.getDate();

      const yearOut = checkOutDate.getFullYear();
      const monthOut = checkOutDate.getMonth() + 1; // Month is zero-based, so add 1
      const dayOut = checkOutDate.getDate();
      const options = {
        method: "POST",
        url: "https://hotels4.p.rapidapi.com/properties/v2/list",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "6a83d17e61mshdac97dea4a35346p16bacbjsn31933b717782",
          "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        },
        data: {
          currency: "USD",
          eapid: 1,
          locale: "en_US",
          siteId: 300000001,
          destination: {
            regionId: "6054439",
          },
          checkInDate: {
            day: 20,
            month: 10,
            year: 2022,
          },
          checkOutDate: {
            day: 15,
            month: 10,
            year: 2022,
          },
          rooms: [
            {
              adults: 2,
              children: [{ age: 5 }, { age: 7 }],
            },
          ],
          resultsStartingIndex: 0,
          resultsSize: 2,
          sort: "PRICE_LOW_TO_HIGH",
          filters: {
            price: { max: 150, min: 100 },
          },
        },
      };

      options.data.checkInDate = {
        day: checkInDate.getDate(),
        month: checkInDate.getMonth() + 1,
        year: checkInDate.getFullYear(),
      };

      options.data.checkOutDate = {
        day: checkOutDate.getDate(),
        month: checkOutDate.getMonth() + 1,
        year: checkOutDate.getFullYear(),
      };

      options.data.filters.price = {
        max: maxPrice,
        min: minPrice,
      };
      options.data.destination.regionId = rId;

      const response = await axios.request(options);
      const properties = response.data.data.propertySearch.properties.map(
        (property) => ({
          id: property.id,
          name: property.name,
          availability: property.availability.available,
          photo: property.propertyImage.image.url,
          price: property.price.lead.formatted,
          // description: property.offerBadge.primary.text,
          googleMapLink:
            "https://www.google.com/maps?q=" +
            property.mapMarker.latLong.latitude +
            "," +
            property.mapMarker.latLong.longitude,
        })
      );
      res.json(properties);
    } catch (error) {
      console.error(error);
    }
    return;
  }
  res.sendStatus(500);
});

async function getRegionId(location) {
  const options = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/locations/v3/search",
    params: {
      q: "new york",
      locale: "en_US",
      langid: "1033",
      siteid: "300000001",
    },
    headers: {
      "X-RapidAPI-Key": "6a83d17e61mshdac97dea4a35346p16bacbjsn31933b717782",
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
  };
  options.params.q = location;
  try {
    const response = await axios.request(options);
    return response.data.rid;
  } catch (error) {
    console.error(error);
  }
}

app.get("/search/api/details", async (req, res) => {
  const { propertyId } = req.query;
  const options = {
    method: "POST",
    url: "https://hotels4.p.rapidapi.com/properties/v2/detail",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "6a83d17e61mshdac97dea4a35346p16bacbjsn31933b717782",
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
    data: {
      currency: "USD",
      eapid: 1,
      locale: "en_US",
      siteId: 300000001,
      propertyId: "9209612",
    },
  };

  options.data.propertyId = propertyId;

  try {
    const response = await axios.request(options);

    const propertyInfo = response.data.data.propertyInfo;
    const id = propertyInfo.summary.id;
    const name = propertyInfo.summary.name;
    const needToKnows = propertyInfo.summary.policies.needToKnow.body;
    const shouldMentions = propertyInfo.summary.policies.shouldMention?.body;
    const tagline = propertyInfo.summary.tagline;
    const latitude = propertyInfo.summary.location.coordinates.latitude;
    const longitude = propertyInfo.summary.location.coordinates.longitude;
    const googleMapLink =
      "https://www.google.com/maps?q=" + latitude + "," + longitude;
    const address = propertyInfo.summary.location.address.addressLine;
    const whatsAround =
      propertyInfo.summary.location.whatsAround.editorial.content?.[0];
    const amenities = propertyInfo.summary.amenities.topAmenities.items.map(
      (item) => item.text
    );
    const photos = propertyInfo.propertyGallery.images.map(
      (item) => item.image.url
    );

    const propertyData = {
      id,
      name,
      needToKnows,
      shouldMentions,
      tagline,
      googleMapLink,
      address,
      whatsAround,
      amenities,
      photos,
    };
    res.json(propertyData);
  } catch (error) {
    console.error(error);
  }
});

app.listen(4000);
