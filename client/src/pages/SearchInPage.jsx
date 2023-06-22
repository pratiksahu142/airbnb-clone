import {useLocation} from "react-router-dom";
import Header from "../Header";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceComponent from "../PlaceComponent";

export default function SearchInPage() {
  const ulocation = useLocation();
  const searchParams = new URLSearchParams(ulocation.search);
  const keyword = searchParams.get('keyword').toLowerCase();
  const maxPrice = searchParams.get('maxPrice');
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      const filteredData = response.data.filter((item) => {
        const {address, title, description, extraInfo, price} = item;

        const lowerCaseAddress = address.toLowerCase();
        const lowerCaseTitle = title.toLowerCase();
        const lowerCaseDescription = description.toLowerCase();
        const lowerCaseExtraInfo = extraInfo.toLowerCase();

        return (
            (lowerCaseAddress.includes(keyword) ||
                lowerCaseTitle.includes(keyword) ||
                lowerCaseDescription.includes(keyword) ||
                lowerCaseExtraInfo.includes(keyword)) && price <= maxPrice
        );
      });
      setPlaces(filteredData);
    });
  }, [ulocation]);
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