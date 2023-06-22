import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import Profile from "../Profile";
import AdminNav from "../admin-pages/AdminNav";
import Header from "../Header";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  const navigate = useNavigate();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
<<<<<<< HEAD
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        {user.userType === 'admin' &&
          <AdminNav/>
        }

        {(user.userType === 'user' || user.userType === 'business') &&
          <AccountNav />
        }
        
=======
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>
        <AccountNav />
>>>>>>> 50bf6eb67b05bbed20eb9d568c773e3118fe254a
        {subpage === "profile" && (
            <div className="w-full">
              {/* Logged in as {user.name} ({user.email}) */}
              <Profile setRedirect={setRedirect}  setUser={setUser} user={user} />
            </div>
        )}

        {subpage === "places" && (
            <div>
              <PlacesPage />
            </div>
        )}
      </div>
  );
}
