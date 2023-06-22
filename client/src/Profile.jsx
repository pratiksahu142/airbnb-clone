import { useEffect, useState } from "react";
import axios from "axios";
import PlaceComponent from "./PlaceComponent";
import Image from "./Image";

export default function Profile({ setRedirect, setUser, user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState([]);
  const [businessContact, setBusinessContact] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  function uploadProfilePhoto(ev) {
    const file = ev.target.files[0];
    const data = new FormData();
    data.append("photos", file);
    axios
      .post("/upload-profile-img", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: image } = response;
        console.log(image);
        setProfileImg(image);
      });
  }

  async function saveProfile(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append("profileImg", profileImg);
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);

    if (user.userType === "business") {
      data.append("businessName", businessName);
      data.append("businessContact", businessContact);
      data.append("businessAddress", businessAddress);
      data.append("businessWebsite", businessWebsite);
    }

    try {
      const { response } = await axios.put("/profile", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      logout();
    } catch (e) {
      console.log(e);
      alert("Update profile failed");
    }
  }

  function setData(user) {
    setName(user.name);
    setEmail(user.email);
    setProfileImg(user.profileImg);
    if (user.userType === "business") {
      setBusinessName(user.businessName);
      setBusinessContact(user.businessContact);
      setBusinessAddress(user.businessAddress);
      setBusinessWebsite(user.businessWebsite);
    }
  }

  useEffect(() => {
    setData(user);
  }, [user]);
  return (
    <div>
      <form onSubmit={saveProfile} className="mb-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <div className="flex justify-center">
              {(!user.profileImg || user.profileImg === "undefined") && (
                <>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={uploadProfilePhoto}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="object-cover w-40 h-40 text-gray-400 rounded-full md:h-64 md:w-64"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                </>
              )}
              {user.profileImg && user.profileImg !== "undefined" && (
                <>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={uploadProfilePhoto}
                    />
                    <Image
                      className="object-cover w-24 h-24 rounded-full md:h-64 md:w-64"
                      src={user.profileImg}
                      alt=""
                    />
                  </label>
                </>
              )}
            </div>
            {/* <label className="flex items-center justify-center gap-1 p-1 mt-10 text-gray-600 bg-transparent border cursor-pointer text-1xl rounded-2xl">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadProfilePhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Upload
            </label> */}
          </div>
          <div className="col-span-2 md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-2 md:gap-x-10 gap-x-5">
              <div>
                <h2 className="mt-4">Name</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div>
                <h2 className="mt-4">Email</h2>
                <input
                  type="text"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>
              <div>
                <h2 className="mt-4">Password</h2>
                <input
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              {user.userType === "business" && (
                <>
                  <div>
                    <h2 className="mt-4">Business Name</h2>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(ev) => setBusinessName(ev.target.value)}
                    />
                  </div>
                  <div>
                    <h2 className="mt-4">Business Contact</h2>
                    <input
                      type="text"
                      value={businessContact}
                      onChange={(ev) => setBusinessContact(ev.target.value)}
                    />
                  </div>
                  <div>
                    <h2 className="mt-4">Business Address</h2>
                    <input
                      type="text"
                      value={businessAddress}
                      onChange={(ev) => setBusinessAddress(ev.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <h2 className="mt-4">Business Website</h2>
                    <input
                      type="text"
                      value={businessWebsite}
                      onChange={(ev) => setBusinessWebsite(ev.target.value)}
                    />
                  </div>
                </>
              )}
              {user.userType === "user" && (
                <>
                  <div className=""></div>
                  <div className="col-span-2"></div>
                </>
              )}
              <div className="col-span-2 mt-4 text-right">
                <div className="flex justify-end">
                  <div className="flex w-64">
                    <button
                      type="button"
                      onClick={logout}
                      className="my-4 mr-4 primary"
                    >
                      Logout
                    </button>
                    <button className="w-16 my-4 primary">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {user && user.userType === "business" && (
        <>
          <hr />
          <h2 className="mt-6 text-2xl text-center">My places</h2>
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 &&
              places.map((place) => (
                <PlaceComponent place={place} key={place._id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
