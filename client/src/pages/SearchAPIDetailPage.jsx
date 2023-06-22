import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../Header";

export default function SearchAPIDetailPage() {
  const {id} = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/search/api/details', {
            params: {
              propertyId: id
            }
          });
          setPlace(response.data);
          console.log(response.data);
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  if (!place) {
    return '';
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
        <div className="py-4 px-8 flex flex-col min-h-screen">
          <Header/>
          <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="bg-black p-8 grid gap-4">
              <div>
                <h2 className="text-2xl mr-36 truncate">Photos
                  of {place.name}</h2>
                <button onClick={() => setShowAllPhotos(false)}
                        className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                       fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"/>
                  </svg>
                  Close photos
                </button>
              </div>
              {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img src={photo} alt={`Photo ${index + 1}`}
                         className="w-full max-h-screen"/>
                  </div>
              ))}
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="bg-white rounded-lg shadow-md p-6 font-light">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <p className="text-gray-600 mb-6 border-b">{tagline}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="mb-2">Address: {address}</p>
            <div className="cursor-pointer flex text-gray-500">
              <a href={place.googleMapLink}>View on Google maps</a>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                   className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
            </div>

            <h3 className="text-lg font-semibold mb-2 mt-4 pt-4 border-t">Need
              to Know</h3>
            <ul className="list-disc list-inside mb-6">
              {needToKnows && needToKnows.map((item) => (
                  <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-2 pt-4 border-t">Extra
              Info</h3>
            <ul className="list-disc list-inside mb-6">
              {shouldMentions && shouldMentions.map((item) => (
                  <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-2 pt-4 border-t">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenities && amenities.map((item, index) => (
                  <div key={index}
                       className="border border-gray-300 rounded-2xl p-4">
                    {item}
                  </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">What's Around</h3>
            <p className="mb-6">{whatsAround}</p>

            <h3 className="text-lg font-semibold mb-2 pt-4 border-t">Photos</h3>
            <div onClick={() => setShowAllPhotos(true)}
                 className="cursor-pointer grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos && photos.map((photo, index) => (
                  <div
                      key={index}
                      className="flex items-center justify-center aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
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
  );
}