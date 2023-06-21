import {Link} from "react-router-dom";
import Image from "./Image.jsx";

export default function PlaceComponent({ place, key }) {
  return (
      <>
        <Link to={"/place/" + place._id} key={key}>
          <div className="flex mb-2 bg-gray-500 md:h-80 lg:h-80 h-60 rounded-2xl">
            {place.photos?.[0] && (
                <Image
                    className="object-cover w-full rounded-2xl aspect-square"
                    src={place.photos?.[0]}
                    alt=""
                />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      </>
  );
}
