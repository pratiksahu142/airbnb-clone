import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceComponent from "./PlaceComponent";
import Image from "./Image";

export default function PublicProfile() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/business-places/" + id).then(({ data }) => {
      console.log(data);
      setPlaces(data);
    });

    axios.get("/public-profile/" + id).then(({ data }) => {
      console.log(data);
      setUser(data);
    });
  }, [id]);

  return (
      <div className="mt-6 mb-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <div className="flex justify-center mt-4">
              {(!user.profileImg || user.profileImg === "undefined") && (
                  <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="object-cover w-40 h-40 text-gray-400 rounded-full md:h-64 md:w-64"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </>
              )}
              {user.profileImg && user.profileImg !== "undefined" && (
                  <>
                    <Image
                        className="object-cover w-24 h-24 rounded-full md:h-64 md:w-64"
                        src={user.profileImg}
                        alt=""
                    />
                  </>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-2 md:gap-x-10 gap-x-5">
              <div>
                <h2 className="mt-4 font-bold text-gray-800 md:text-xl">Name</h2>
                <p className="mt-2 text-gray-500">{user.name}</p>
              </div>
              <div>
                <h2 className="mt-4 font-bold text-gray-800 md:text-xl">Email</h2>
                <p className="mt-2 text-gray-500">{user.email}</p>
              </div>
              <div>
                <h2 className="mt-8 font-bold text-gray-800 md:text-xl">Business Name</h2>
                <p className="mt-2 text-gray-500">{user.businessName}</p>
              </div>
              <div>
                <h2 className="mt-8 font-bold text-gray-800 md:text-xl">Business Contact</h2>
                <p className="mt-2 text-gray-500">{user.businessContact}</p>
              </div>
              <div>
                <h2 className="mt-8 font-bold text-gray-800 md:text-xl">Business Address</h2>
                <p className="mt-2 text-gray-500">{user.businessAddress}</p>
              </div>
              <div>
                <h2 className="mt-8 font-bold text-gray-800 md:text-xl">Business Website</h2>
                <p className="mt-2 text-gray-500">{user.businessWebsite}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10"></div>
        <hr />
        <h2 className="mt-8 text-2xl font-bold text-center">Places</h2>
        <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 &&
              places.map((place) => (
                  <PlaceComponent place={place} key={place._id} />
              ))}
        </div>
      </div>
  );
}
