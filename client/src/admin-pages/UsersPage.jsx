import {useEffect, useState} from "react";
import axios from "axios";
// import PlaceImg from "./pages/PlaceImg";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";
import Header from "../Header";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  
  function fetchUsers() {
    axios.get("/a/users/user").then((response) => {
      setUsers(response.data);
    });
  }

  function fetchOwners() {
    axios.get("/a/users/business").then((response) => {
      setOwners(response.data);
    });
  }
  
  useEffect(() => {
    fetchUsers();
    fetchOwners();
  }, []);

  function handleDeleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`/a/users/user/${id}`)
        .then((response) => {
          console.log("user deleted successfully");
          fetchUsers();
        })
        .catch((error) => {
          console.error("An error occurred while deleting the user", error);
        });
    }
  }

  function handleDeleteOwner(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this owner?"
    );
    if (confirmDelete) {
      axios
        .delete(`/a/users/business/${id}`)
        .then((response) => {
          console.log("owner deleted successfully");
          fetchOwners();
        })
        .catch((error) => {
          console.error("An error occurred while deleting the owner", error);
        });
    }
  }

  return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        <AdminNav/>
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
                <div
                    className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
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
                              <td className="px-2 py-2 mb-6 text-sm text-right bg-white border-b border-gray-200">
                                <button
                                    type="button"
                                    className="inline-block text-gray-500 hover:text-gray-700"
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 fill-current"
                                  >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                                <Link to={`/a/users/edit/${user._id}`}
                                      className="inline-block text-gray-500 hover:text-gray-700 ms-4">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                  >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </Link>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold leading-tight">
                  Business Owners
                </h2>
                <div className="text-right">
                  <Link
                      className="px-6 py-2 mb-4 text-white rounded-full bg-primary"
                      to={"/a/owners/new"}
                  >
                    New Owner
                  </Link>
                </div>
              </div>
              <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div
                    className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                  <table className="min-w-full leading-normal">
                    <thead>
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Name
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Email
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Business Name
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Business Contact
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Business Address
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Business Website
                      </th>
                      <th className="px-5 py-3 bg-gray-100 border-b-2 border-gray-200"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {owners?.length > 0 &&
                        owners.map((user) => (
                            <tr key={user.id}>
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
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.businessName}
                                </p>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.businessContact}
                                </p>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.businessAddress}
                                </p>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.businessWebsite}
                                </p>
                              </td>
                              <td className="px-2 py-2 mb-6 text-sm text-right bg-white border-b border-gray-200">
                                <button
                                    type="button"
                                    className="inline-block text-gray-500 hover:text-gray-700"
                                    onClick={() => handleDeleteOwner(user._id)}
                                >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 fill-current"
                                  >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                                <Link to={`/a/owners/edit/${user._id}`}
                                      className="inline-block text-gray-500 hover:text-gray-700 ms-4">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                  >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </Link>
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
