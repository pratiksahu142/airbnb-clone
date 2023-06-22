import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../Header";

export default function SearchAPIPage() {
  const ulocation = useLocation();
  const searchParams = new URLSearchParams(ulocation.search);
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const numberOfGuests = searchParams.get('numberOfGuests');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location && checkIn && checkOut && minPrice && maxPrice
        && numberOfGuests) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/search/api', {
            params: {
              location,
              checkIn,
              checkOut,
              minPrice,
              maxPrice,
              numberOfGuests,
            },
          });
          // Handle the response data
          setPlaces(response.data)
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      };
      fetchData();
    }
  }, [ulocation]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div
              className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>
    );
  }

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <div>
          <div
              className="mt-6 border border-gray-300 bg-white rounded-lg p-4 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold mb-2">Reservation Details</p>
              <p className="mb-1">
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Check-in:</span> {checkIn}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Check-out:</span> {checkOut}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Pricing Details</p>
              <p className="mb-1">
                <span className="font-semibold">Min Price:</span> {minPrice}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Max Price:</span> {maxPrice}
              </p>
              <p className="mb-1">
                <span
                    className="font-semibold">Number of Guests:</span> {numberOfGuests}
              </p>
            </div>
          </div>

          <div
              className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {places.length > 0 && places.map(place => (
                <div>
                  <Link to={'/search/api/detail/' + place.id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                      {place.photo && (
                          <img
                              className=" rounded-2xl object-cover aspect-square"
                              src={place.photo} alt=""/>
                      )}
                    </div>

                    <div>
                      <h2 className="font-bold">{place.name}</h2>
                    </div>
                    {/*<h3 className="text-sm text-gray-500">{place.description}</h3>*/}
                    <div className="mt-1"><span
                        className="font-bold">{place.price}</span> per night
                    </div>
                  </Link>
                  <div className="cursor-pointer flex text-gray-500">
                    <a href={place.googleMapLink}>View on Google maps</a>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}