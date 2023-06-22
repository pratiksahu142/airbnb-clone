import React, {useContext, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {UserContext} from "./UserContext";
import Image from "./Image.jsx";
import logo from './assets/pocket.svg';

export default function Header() {
  const {user} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [kindOfStay, setKindOfStay] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [redirect, setRedirect] = useState('');

  const togglePopup = () => {
    setKindOfStay('');
    setMaxPrice(200);
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  async function handleAPISearch() {
    if (kindOfStay && checkIn && checkOut && numberOfGuests) {
      const redirectPath = `/search/api?location=${kindOfStay}&checkIn=${checkIn}&checkOut=${checkOut}&minPrice=0&maxPrice=${maxPrice}&numberOfGuests=${numberOfGuests}`;
      setRedirect(redirectPath);
    }
  }

  async function handleInternalSearch() {
    if (kindOfStay && maxPrice) {
      const redirectPath = `/search?keyword=${kindOfStay}&maxPrice=${maxPrice}`;
      setRedirect(redirectPath);
    }
  }

  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
      <header className="flex justify-between">
        <Link to={'/'}
              className="flex items-center gap-1 border p-2 rounded-2xl shadow shadow-gray-300">
          <img src={logo} alt="WanderWise Logo" className="h-8 w-8"/>
          <span className="font-bold text-xl">WanderWise</span>
        </Link>
        <div
            className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300 "></div>
          <div>Any week</div>
          <div className="border-l border-gray-300 "></div>
          <div>Add Guests</div>
          <button onClick={togglePopup}
                  className="bg-primary text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                 className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </button>
          {isOpen && (
              <div
                  className="fixed inset-0 flex items-center justify-center z-50 ">
                <div
                    className="bg-white p-8 rounded-lg shadow-2xl shadow-gray-500">
                  <div className="flex mb-4 border-gray-300">
                    <button
                        className={`flex-1 mr-2 py-2 px-4 font-bold ${
                            activeTab === 1 ? 'bg-primary text-white'
                                : 'bg-white text-gray-700'
                        } rounded-2xl`}
                        onClick={() => handleTabClick(1)}>
                      Search our own
                      listings
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 font-bold ${
                            activeTab === 2 ? 'bg-primary text-white'
                                : 'bg-white text-gray-700'
                        } rounded-2xl`}
                        onClick={() => handleTabClick(2)}>
                      Search with API
                    </button>
                  </div>
                  {activeTab === 1 && (
                      <div>
                        {/* Form 1 content */}
                        <div className="py-3 px-4 ">
                          <label className="ms-2 font-bold">What kind of stay
                            are you looking for</label>
                          <input type="text" placeholder="beach, forest etc."
                                 value={kindOfStay}
                                 onChange={ev => setKindOfStay(
                                     ev.target.value)}/>
                        </div>
                        {/*<div className="flex border-t border-b">*/}
                        {/*  <div className="py-3 px-4 ">*/}
                        {/*    <label>Check-in: </label>*/}
                        {/*    <input type="date" value={checkIn}*/}
                        {/*           onChange={ev => setCheckIn(*/}
                        {/*               ev.target.value)}/>*/}
                        {/*  </div>*/}
                        {/*  <div className="py-3 px-4 border-l">*/}
                        {/*    <label>Check-out: </label>*/}
                        {/*    <input type="date" value={checkOut}*/}
                        {/*           onChange={ev => setCheckOut(*/}
                        {/*               ev.target.value)}/>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <div className="py-3 px-4 ">
                          <label className="font-bold">Max Price: <span
                              className="text-gray-500">{maxPrice}</span></label>
                          <input
                              className="w-full"
                              type="range"
                              min={0}
                              max={2000}
                              value={maxPrice}
                              onChange={ev => setMaxPrice(ev.target.value)}
                          />
                        </div>
                        {/*<div className="py-3 px-4 border-t">*/}
                        {/*  <label>Number of guests:</label>*/}
                        {/*  <input type="number" value={numberOfGuests}*/}
                        {/*         onChange={ev => setNumberOfGuests(*/}
                        {/*             ev.target.value)}/>*/}
                        {/*</div>*/}
                        <div className="flex">
                          <button
                              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                              onClick={handleInternalSearch}>
                            Search
                          </button>
                          <button
                              className="ml-2 float-right bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                              onClick={togglePopup}
                          >
                            Close
                          </button>
                        </div>
                      </div>

                  )}
                  {activeTab === 2 && (
                      <div>
                        {/* Form 2 content */}
                        <div className="py-3 px-4 ">
                          <label className="ms-2 font-bold">Where</label>
                          <input type="text"
                                 placeholder="Name of city, state, area etc."
                                 value={kindOfStay}
                                 onChange={ev => setKindOfStay(
                                     ev.target.value)}/>
                        </div>
                        <div className="flex border-t border-b">
                          <div className="py-3 px-4 ">
                            <label className="font-bold">Check-in: </label>
                            <input className=" text-gray-500" type="date"
                                   value={checkIn}
                                   onChange={ev => setCheckIn(
                                       ev.target.value)}/>
                          </div>
                          <div className="py-3 px-4 border-l">
                            <label className="font-bold">Check-out: </label>
                            <input className=" text-gray-500" type="date"
                                   value={checkOut}
                                   onChange={ev => setCheckOut(
                                       ev.target.value)}/>
                          </div>
                        </div>
                        <div className="py-3 px-4 ">
                          <label className="font-bold">Max Price: <span
                              className=" text-gray-500">{maxPrice}</span></label>
                          <input
                              className="w-full"
                              type="range"
                              min={0}
                              max={2000}
                              value={maxPrice}
                              onChange={ev => setMaxPrice(ev.target.value)}
                          />
                        </div>
                        <div className="py-3 px-4 border-t">
                          <label className="font-bold">Number of guests:</label>
                          <input type="number" value={numberOfGuests}
                                 onChange={ev => setNumberOfGuests(
                                     ev.target.value)}/>
                        </div>
                        <div className="flex">
                          <button
                              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                              onClick={handleAPISearch}>
                            Search
                          </button>
                          <button
                              className="ml-2 float-right bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                              onClick={togglePopup}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
        <Link
            to={user ? "/account" : "/login"}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full shadow shadow-gray-300"
        >

          {!user && (
              <div className="flex">
                <div
                    className="overflow-hidden text-white bg-gray-500 border rounded-full border-l-gray-500">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="relative w-6 h-6 top-1"
                  >
                    <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ms-2 font-bold text-gray-700">Login</div>
              </div>
          )}
          {(!!user && user.profileImg) && (
              <div
                  className="overflow-hidden text-white bg-gray-500 border rounded-full border-l-gray-500">
                <Image className="relative w-6 h-6 top-1" src={user.profileImg}
                       alt=""/>
              </div>
          )}
          {(!!user && !user.profileImg) && (
              <div
                  className="overflow-hidden text-white bg-gray-500 border rounded-full border-l-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative w-6 h-6 top-1"
                >
                  <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                  />
                </svg>
              </div>
          )}
          {!!user && (
              <div>
                {user.name}
              </div>
          )}
        </Link>
      </header>
  );
}