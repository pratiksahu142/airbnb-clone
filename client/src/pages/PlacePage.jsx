import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Header from "../Header";

export default function PlacePage() {
  const {id} = useParams();
  const [place, setPlace] = useState(null);  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      setPlace(response.data);

    })
  }, [id]);

  if (!place) {
    return '';
  }

  return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        <div className="px-8 pt-8 mt-4 -mx-8 ">
          <h2 className="text-3xl border-b">{place.title}</h2>
          <AddressLink>{place.address}</AddressLink>
          <PlaceGallery place={place}/>
          <div className="mt-4">
            <Link
                className="px-4 py-2 text-white rounded-lg  bg-primary"
                to={'/profile/' + place.owner}
            >
              See more properties from this owner
            </Link>
          </div>

          <div
              className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>

              <div className="my-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                {place.description}
              </div>
              <p className="text-gray-600">
                <span
                    className="p-2 font-semibold">Check-in:</span> {place.checkIn}
                <span
                    className="p-2 font-semibold ms-8">Check-out:</span> {place.checkOut}
                <br/>
                <span
                    className="p-2 font-semibold">Maximum Number of Guests:</span> {place.maxGuests}
              </p>
            </div>
            <div>
              <BookingWidget place={place}/>
            </div>
            <div className="border-t">
              <div>
                <h2 className="mt-2 text-2xl font-semibold">Extra Info</h2>
              </div>
              <div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
                {place.extraInfo}
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}