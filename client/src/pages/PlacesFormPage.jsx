import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";
import { UserContext } from "../UserContext";
import Header from "../Header";

export default function PlacesFormPage() {
  const {id} = useParams();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, desc) {
    return (
        <div>
          {inputHeader(header)}
          {inputDescription(desc)}
        </div>);
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if (id) {
      //update
      const {data} = await axios.put('/places', {
        id,
        ...placeData
      });
    } else {
      //new place
      const {data} = await axios.post('/places', placeData);
    }
    setRedirect(true);
  }

  function returnToPlaces() {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'}/>;
  }

  function isDisabled() {
    if(user) {
      return user.userType === 'admin'
    }
  }

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
          <AccountNav/>
        <div>
          <button onClick={returnToPlaces}
                  className="bg-primary py-2 px-4 w-fit text-white rounded-2xl float-right">Go
            back
          </button>
        </div>
          <form onSubmit={savePlace}>
            {preInput('Title',
                'Title for your place, can be short and catchy!')}
            <input type="text"
                   placeholder="title, for example: My lovely apartment"
                   value={title} disabled={isDisabled()}
                   onChange={ev => setTitle(ev.target.value)}/>

            {preInput('Address', 'Address to this place')}
            <input type="text" placeholder="address"
                   value={address} disabled={isDisabled()}
                   onChange={ev => setAddress(ev.target.value)}/>

            {preInput('Photos', 'more = better')}
            <PhotosUploader addedPhotos={addedPhotos}
                            onChange={setAddedPhotos} user={user}/>

            {preInput('Description',
                'Describe the cool things of this place')}
            <textarea
                value={description} disabled={isDisabled()}
                onChange={ev => setDescription(ev.target.value)}></textarea>

            {preInput('Perks', 'Select all the perks')}
            <div
                className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} user={user} isDisabled={isDisabled}/>
            </div>

            {preInput('Extra Info', 'House rules etc.')}
            <textarea
                value={extraInfo} disabled={isDisabled()}
                onChange={ev => setExtraInfo(ev.target.value)}></textarea>

            {preInput('Checkin Details',
                'Checkin time, Checkout Time and Maximum number of guests allowed')}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Checkin Time</h3>
                <input type="text" placeholder="12:00"
                       value={checkIn} disabled={isDisabled()}
                       onChange={ev => setCheckIn(ev.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Checkout Time</h3>
                <input type="text" placeholder="11:00"
                       value={checkOut} disabled={isDisabled()}
                       onChange={ev => setCheckOut(ev.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
                <input type="number"
                       value={maxGuests} disabled={isDisabled()}
                       onChange={ev => setMaxGuests(ev.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input type="number"
                       value={price} disabled={isDisabled()}
                       onChange={ev => setPrice(ev.target.value)}/>
              </div>
            </div>
            {(user && user.userType !== 'admin') && (
              <button className="my-4 primary">Save</button>
            )}
          </form>
        </div>
  );
}