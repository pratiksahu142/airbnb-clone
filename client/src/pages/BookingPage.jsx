import {Navigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import {UserContext} from "../UserContext";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import Header from "../Header";

export default function BookingPage() {
  const {id} = useParams();
  const {user} = useContext(UserContext);
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    if (id && user) {
      if (user.userType === 'admin') {
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

  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        <div className="my-8">
          <div className="flex">
            <h1 className="text-2xl">{booking.place.title}</h1>
          </div>
          <div>
            <button onClick={returnToBookings}
                    className="float-right px-4 py-2 text-white bg-primary w-fit rounded-2xl">Go
              back
            </button>
          </div>

          <AddressLink
              className="block my-2">{booking.place.address}</AddressLink>
          <div
              className="flex flex-wrap justify-between p-6 my-6 bg-gray-200 rounded-2xl">
            <div className="mb-6">
              <h2 className="mb-4 text-2xl">Your booking information:</h2>
              <BookingDates booking={booking}/>
            </div>
            <div className="p-6 text-white bg-primary rounded-2xl">
              <div>Total price</div>
              <div className="text-3xl">${booking.price}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place}/>
        </div>
      </div>
  );
}