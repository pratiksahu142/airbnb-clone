import {useLocation} from "react-router-dom";

export default function SearchInPage() {
  const ulocation = useLocation();
  const searchParams = new URLSearchParams(ulocation.search);
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const numberOfGuests = searchParams.get('numberOfGuests');


  return (
      <div></div>
  );
}