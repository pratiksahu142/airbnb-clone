import {useEffect, useState} from "react";
import axios from "axios";
import PlaceComponent from "../PlaceComponent";
import Header from "../Header";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);
  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <div
            className="grid grid-cols-2 mt-8 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 && places.map(place => (
              <PlaceComponent place={place} key={place._id}/>
          ))}
        </div>
      </div>
  );
}