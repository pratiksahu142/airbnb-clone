import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
// import PlaceImg from "./pages/PlaceImg";
import { Link } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/a/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  function deleteUser(id) {
    // ev.preventDefault();
    console.log(id);
  }

  return (
    <div>
      <AccountNav />
      <div>
        <div className="container px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="mb-4 text-2xl font-semibold leading-tight">
                Users
              </h2>
              <div className="text-right">
                <Link
                  className="px-6 py-2 mb-4 text-white rounded-full bg-primary"
                  to={"/a/users/new"}
                >
                  New User
                </Link>
              </div>
            </div>
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Name
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Email
                      </th>
                      {/* <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                            Issued / Due
                          </th>
                          <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                            Status
                          </th> */}
                      <th className="px-5 py-3 bg-gray-100 border-b-2 border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.length > 0 &&
                      users.map((user) => (
                        <tr key={user.id}>
                          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Molly Sanders
                                </p>
                                <p className="text-gray-600 whitespace-no-wrap">
                                  000004
                                </p>
                              </div>
                            </div>
                          </td> */}
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.email}
                            </p>
                          </td>
                          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                              ></span>
                              <span className="relative">Paid</span>
                            </span>
                          </td> */}
                          <td className="px-5 py-5 text-sm text-right bg-white border-b border-gray-200">
                            <button
                              type="button"
                              className="inline-block text-gray-500 hover:text-gray-700"
                              onClick={() => deleteUser(user._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="inline-block w-6 h-6 fill-current"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
