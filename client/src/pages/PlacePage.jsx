import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

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
      <div className="px-8 pt-8 mt-4 -mx-8 bg-gray-100">
        <h2 className="text-3xl ">{place.title}</h2>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place}/>
        <div className="mt-4">
          <Link
              className="px-4 py-2 text-white rounded-lg bg-primary"
              to={'/profile/' + place.owner}
          >
            See other properties from this owner
          </Link>
        </div>

        <div
            className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>

            <div className="my-4">
              <h2 className="text-2xl font-semibold">Description</h2>
              {place.description}
            </div>
            Check-in: {place.checkIn} <br/>
            Check-out: {place.checkOut} <br/>
            Maximum Number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place}/>
          </div>
          <div className="px-8 py-8 -mx-8 bg-white border-t">
            <div>
              <h2 className="text-2xl font-semibold">Extra Info</h2>
            </div>
            <div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
              {place.extraInfo}
            </div>
          </div>

        </div>
      </div>
  );
}