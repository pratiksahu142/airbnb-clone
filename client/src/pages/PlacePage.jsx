import {Link, Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Header from "../Header";
import Perks from "../Perks";

export default function PlacePage() {
  const {id} = useParams();
  const [place, setPlace] = useState(null);
  const [redirect, setRedirect] = useState('');
  const [perks, setPerks] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      setPlace(response.data);
      setPerks(response.data.perks);
    })
  }, [id]);

  if (!place) {
    return '';
  }

  function returnToIndex() {
    setRedirect('/')
  }

  if (redirect) {
    return <Navigate to={redirect}/>;
  }

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <div className="mt-2">
          <button onClick={returnToIndex}
                  className="bg-primary w-fit text-white rounded-2xl float-right py-2 px-4">Go
            back
          </button>
        </div>
        <div className=" px-2 pt-2 ">
          <div className="">
            <h2 className="text-3xl border-b">{place.title}</h2>
          </div>
          <AddressLink>{place.address}</AddressLink>
          <PlaceGallery place={place}/>
          <div className="mt-6">
            <Link
                className=" text-white bg-primary rounded-2xl py-2 px-4 "
                to={'/profile/' + place.owner}
            >
              See more properties from this owner
            </Link>
          </div>

          <div
              className="mt-4 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>

              <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
              </div>
              <p className="border-t pt-4">
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
            <div>
              <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t pt-4">
                <Perks selected={perks} onChange={setPerks}/>
              </div>
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