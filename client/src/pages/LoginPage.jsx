import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import Header from "../Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUser, user } = useContext(UserContext);
  const [userType, setUserType] = useState("user");

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(`/login/${userType}`, { email, password });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if(user) {
    return <Navigate to={"/"} />;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
      <Header/>

      <div className="flex items-center justify-around mt-4 grow">
        <div className="mb-64">
          <h1 className="mb-4 text-4xl text-center">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
            <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <select onChange={(ev) => setUserType(ev.target.value)}>
              <option value="user">User</option>
              <option value="business">Business Owner</option>
            </select>
            <button className="primary">Login</button>
            <div className="py-2 text-center text-gray-500">
              Don't have an account yet?{" "}
              <Link className="text-black underline" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
  );
}
