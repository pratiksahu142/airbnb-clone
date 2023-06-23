import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function BookingWidget({place}) {

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user])

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut),
        new Date(checkIn));
  }

  async function bookThisPlace() {
    if(!user) {
      setRedirect('/login');
    }
    if (user && checkIn && checkOut && name && phone) {
      const response = await axios.post('/bookings', {
        place: place._id,
        price: numberOfNights * place.price,
        checkIn, checkOut, numberOfGuests, name, phone
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    }
  }

  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
      <div className="p-4 bg-white shadow rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="mt-4 border rounded-2xl">
          <div className="flex">
            <div className="px-2 py-3 ">
              <label>Check-in: </label>
              <input className="text-gray-500 " type="date" value={checkIn}
                     onChange={ev => setCheckIn(ev.target.value)}/>
            </div>
            <div className="px-2 py-3 border-l">
              <label>Check-out: </label>
              <input className="text-gray-500 " type="date" value={checkOut}
                     onChange={ev => setCheckOut(ev.target.value)}/>
            </div>
          </div>
          <div className="px-4 py-3 border-t">
            <label>Number of guests:</label>
            <input type="number" value={numberOfGuests}
                   onChange={ev => setNumberOfGuests(ev.target.value)}/>
          </div>
          {numberOfNights > 0 && (
              <div className="px-4 py-3 border-t">
                <label>Your full name:</label>
                <input type="text" value={name}
                       onChange={ev => setName(ev.target.value)}/>
                <label>Phone number:</label>
                <input type="tel" value={phone}
                       onChange={ev => setPhone(ev.target.value)}/>
              </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="mt-4 primary">
          Book
          {numberOfNights > 0 && (
              <span> for ${numberOfNights * place.price} </span>
          )}
        </button>
      </div>
  );
}