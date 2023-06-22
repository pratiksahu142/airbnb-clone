import {Link} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";
<<<<<<< HEAD
import { UserContext } from "../UserContext";
import AdminNav from "../admin-pages/AdminNav";
=======
import Header from "../Header";
>>>>>>> 50bf6eb67b05bbed20eb9d568c773e3118fe254a

export default function PlacesPage() {
  const { user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () =>
    {
      if(user) {
        if(user.userType === 'admin') {
          await axios.get('/a/user-places').then(({data}) => {
            setPlaces(data);
          });
        } else {
          await axios.get('/user-places').then(({data}) => {
            setPlaces(data);
          });
        }
      }
    }
    fetchData();
  }, [user]);
  return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        {user && (
          <>
            {user.userType === 'admin' && <AdminNav />}
            {(user.userType === 'user' || user.userType === 'business') && <AccountNav />}
          </>
        )}

      {(user && user.userType === 'business') && (
        <div className="text-center">
          <Link
              className="inline-flex gap-1 px-6 py-2 text-white rounded-full bg-primary"
              to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"/>
            </svg>
            Add new place
          </Link>
        </div>
      )}

        <div className="mt-4">
          {places.length > 0 && places.map(place => (
              <Link to={'/account/places/'+place._id} className="flex gap-4 p-4 bg-gray-100 cursor-pointer rounded-2xl">
                <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                  <PlaceImg place={place}/>
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl ">{place.title}</h2>
                  <p className="mt-2 text-sm ">{place.description}</p>

                </div>
              </Link>
          ))}
        </div>
      </div>
  );
}