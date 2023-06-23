import AccountNav from "../AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
import { UserContext } from "../UserContext";
import AdminNav from "../admin-pages/AdminNav";
import Header from "../Header";

export default function BookingsPage() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  function fetchBookingsData() {
    if (user) {
      if (user.userType === "admin") {
        axios.get("/a/bookings").then((response) => {
          setBookings(response.data);
        });
      } else {
        axios.get("/bookings").then((response) => {
          setBookings(response.data);
        });
      }
    }
  }
  useEffect(() => {
    fetchBookingsData();
  }, [user]);

  function handleDeleteBooking(bookingId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmDelete) {
      console.log(confirmDelete);
      axios
        .delete(`/a/bookings/${bookingId}`)
        .then((response) => {
          console.log("Booking deleted successfully");
          setBookings([]);
          fetchBookingsData();
        })
        .catch((error) => {
          console.error("An error occurred while deleting the booking", error);
        });
    } else {
      console.log("no");
    }
  }
  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header />
      {user && (
        <>
          {user.userType === "admin" && <AdminNav />}
          {(user.userType === "user" || user.userType === "business") && (
            <AccountNav />
          )}
        </>
      )}
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div key={booking._id} className="relative">
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-2 my-2 overflow-hidden bg-gray-200 rounded-2xl"
              >
                <div className="w-56 h-56 sm:w-40 sm:h-40">
                  <PlaceImg
                    place={booking.place}
                    className="object-cover w-full h-full aspect-square"
                  />
                </div>
                <div className="py-3 pr-3 grow">
                  <h3 className="text-lg md:text-base">
                    {booking.place.title}
                  </h3>
                  <div className="">
                    <BookingDates
                      booking={booking}
                      className="mt-4 mb-2 text-gray-500"
                    />
                    <div className="flex gap-1 mt-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-lg sm:text-md">
                        Total price: ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              {!!user && user.userType === "admin" && (
                <button
                  className="absolute text-gray-800 top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBooking(booking._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
