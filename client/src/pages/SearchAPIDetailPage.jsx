import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";

export default function SearchAPIDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/search/api/details", {
            params: {
              propertyId: id,
            },
          });
          setPlace(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div
              className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>
    );
  }

  if (!place) {
    return "";
  }
  const {
    name,
    needToKnows,
    shouldMentions,
    tagline,
    googleMapLink,
    address,
    whatsAround,
    amenities,
    photos,
  } = place;

  if (showAllPhotos) {
    return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header />
        <div className="absolute inset-0 min-h-screen text-white bg-black">
          <div className="grid gap-4 p-8 bg-black sm:gap-2 sm:p-4">
            <div>
              <h2 className="mr-20 text-2xl md:mr-36 ms-10">
                Photos of {place.name}
              </h2>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="fixed flex gap-1 px-4 py-2 text-black bg-white shadow right-9 top-5 rounded-2xl shadow-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* Close photos */}
              </button>
            </div>
            {/* {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img src={photo} alt={`Photo ${index + 1}`}
                         className="w-full max-h-screen"/>
                  </div>
              ))} */}
            <div className="flex flex-row flex-wrap gap-4 p-8">
              {place?.photos?.length > 0 &&
                place.photos.map((photo, index) => (
                  <div className="w-full" key={index}>
                    <img
                      src={photo}
                      alt=""
                      className="object-cover w-full h-full aspect-square"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header />
      <div className="p-6 font-light bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">{name}</h2>
        <p className="mb-6 text-gray-600 border-b">{tagline}</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Location</h3>
            <p className="mb-2">Address: {address}</p>
            <div className="flex text-gray-500 cursor-pointer">
              <a href={place.googleMapLink}>View on Google maps</a>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>

            <h3 className="pt-4 mt-4 mb-2 text-lg font-semibold border-t">
              Need to Know
            </h3>
            <ul className="mb-6 list-disc list-inside">
              {needToKnows &&
                needToKnows.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <h3 className="pt-4 mb-2 text-lg font-semibold border-t">
              Extra Info
            </h3>
            <ul className="mb-6 list-disc list-inside">
              {shouldMentions &&
                shouldMentions.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <h3 className="pt-4 mb-2 text-lg font-semibold border-t">
              Amenities
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {amenities &&
                amenities.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-2xl"
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">What's Around</h3>
            <p className="mb-6">{whatsAround}</p>

            <h3 className="pt-4 mb-2 text-lg font-semibold border-t">Photos</h3>
            <div
              onClick={() => setShowAllPhotos(true)}
              className="grid grid-cols-2 gap-4 cursor-pointer md:grid-cols-3"
            >
              {photos &&
                photos.map((photo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center overflow-hidden rounded-lg aspect-w-1 aspect-h-1"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
