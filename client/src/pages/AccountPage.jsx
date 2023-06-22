import {useContext, useState} from "react";
import {UserContext} from "../UserContext";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import Profile from "../Profile";
import Header from "../Header";
import AdminNav from "../admin-pages/AdminNav";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);

  let {subpage} = useParams();
  const navigate = useNavigate();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"}/>;
  }

  if (redirect) {
    return <Navigate to={redirect}/>;
  }

  return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        {user && (
            <>
              {user.userType === 'admin' && <AdminNav/>}
              {(user.userType === 'user' || user.userType === 'business') &&
                  <AccountNav/>}
            </>
        )}
        {subpage === "profile" && (
            <div className="w-full">
              {/* Logged in as {user.name} ({user.email}) */}
              <Profile setRedirect={setRedirect} setUser={setUser} user={user}/>
            </div>
        )}

        {subpage === "places" && (
            <div>
              <PlacesPage/>
            </div>
        )}
      </div>
  );
}
