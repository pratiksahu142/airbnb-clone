import {useContext,} from "react";
import {UserContext} from "./UserContext";
import {Navigate} from "react-router-dom";

const AuthGuard = ({allowedUserTypes, children}) => {
  const {user, ready} = useContext(UserContext);

  if (!ready) {
    // If user context is not ready, you can show a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  if (!user) {
    // If user is not logged in, redirect to login page or any other appropriate route
    return <Navigate to="/login"/>;
  }

  if (!allowedUserTypes.includes(user.userType)) {
    // If the user type is not allowed, redirect to a different route or show an access denied message
    return <Navigate to="/login"/>;
  }

  // Render the protected route if user type is allowed
  // return <Route {...rest} element={<Component />} />;
  return (<div className={`${!ready ? "d-none" : ""}`}>
    {children}
  </div>);
};

export default AuthGuard;
