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

  console.log(place.owner)

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <div className="mt-4 -mx-8 px-8 pt-8 ">
          <h2 className="text-3xl border-b">{place.title}</h2>
          <AddressLink>{place.address}</AddressLink>
          <PlaceGallery place={place}/>
          <div className="mt-4">
            <Link
                className=" text-white bg-primary rounded-lg py-2 px-4 "
                to={'/profile/' + place.owner}
            >
              See more properties from this owner
            </Link>
          </div>

          <div
              className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>

              <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
              </div>
              <p className="text-gray-600">
                <span
                    className="p-2 font-semibold">Check-in:</span> {place.checkIn}
                <span
                    className="p-2 ms-8 font-semibold">Check-out:</span> {place.checkOut}
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
                <h2 className="mt-2 font-semibold text-2xl">Extra Info</h2>
              </div>
              <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
                {place.extraInfo}
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}