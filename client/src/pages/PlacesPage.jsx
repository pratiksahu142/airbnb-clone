import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import { UserContext } from "../UserContext";
import AdminNav from "../admin-pages/AdminNav";
import Header from "../Header";

export default function PlacesPage() {
  const { user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);

  const fetchData = async () => {
    if (user) {
      if (user.userType === "admin") {
        await axios.get("/a/user-places").then(({ data }) => {
          setPlaces(data);
        });
      } else {
        await axios.get("/user-places").then(({ data }) => {
          setPlaces(data);
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  function handleDeletePlace(placeId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (confirmDelete) {
      axios
        .delete(`/a/places/${placeId}`)
        .then((response) => {
          console.log("Place deleted successfully");
          setPlaces([]);
          fetchData();
        })
        .catch((error) => {
          console.error("An error occurred while deleting the booking", error);
        });
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

      {user && user.userType === "business" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 px-6 py-2 text-white rounded-full bg-primary"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      <div className="mt-4">
        {places.length > 0 && places.map((place) => (
            <div key={place._id} className="relative">
              <Link
                to={"/account/places/" + place._id}
                className="flex gap-4 p-4 mb-4 bg-gray-100 cursor-pointer rounded-2xl"
              >
                <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl ">{place.title}</h2>
                  <p className="mt-2 text-sm ">{place.description}</p>
                </div>
              </Link>
              {!!user && user.userType === "admin" && (
                <button
                  className="absolute text-primary top-2 right-2 bg-transparent mt-2 me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlace(place._id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
