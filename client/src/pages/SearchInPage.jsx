import {useLocation} from "react-router-dom";
import Header from "../Header";

export default function SearchInPage() {
  const ulocation = useLocation();
  const searchParams = new URLSearchParams(ulocation.search);
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const numberOfGuests = searchParams.get('numberOfGuests');

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>

        <div>SearchInPage</div>
      </div>

  );
}