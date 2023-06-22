import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { useContext } from "react";
import AddressLink from "../AddressLink";
import { UserContext } from "../UserContext";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import Header from "../Header";

export default function BookingPage() {
  const {id} = useParams();
  const { user } = useContext(UserContext);
  const [booking,setBooking] = useState(null);
  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    if (id && user) {
      if(user.userType === 'admin') {
        axios.get('/a/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      } else {
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      }

    }
  }, [id, user]);

  if (!booking) {
    return '';
  }

  function returnToBookings() {
    setRedirect('/account/bookings');
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <div className="my-8">
          <div className="flex">
            <h1 className="text-2xl">{booking.place.title}</h1>
          </div>
          <div>
            <button onClick={returnToBookings} className="bg-primary w-fit text-white rounded-2xl float-right py-2 px-4">Go back</button>
          </div>

          <AddressLink
              className="my-2 block">{booking.place.address}</AddressLink>
          <div
              className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-4">Your booking information:</h2>
              <BookingDates booking={booking}/>
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
              <div>Total price</div>
              <div className="text-3xl">${booking.price}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place}/>
        </div>
      </div>
  );
}