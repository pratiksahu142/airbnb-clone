import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Header from "../Header";

export default function RegisterPage() {
  //   const [redirect, setRedirect] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [businessName, setBusinessName] = useState("");
  const [businessContact, setBusinessContact] = useState("");
  const [businessAddress, setbusinessAddress] = useState("");
  const [businessWebsite, setbusinessWebsite] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const [registrationError, setRegistrationError] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      console.log(
          name,
          email,
          password,
          userType,
          businessName,
          businessContact,
          businessAddress,
          businessWebsite
      );
      await axios.post("/register", {
        name,
        email,
        password,
        userType,
        businessName,
        businessContact,
        businessAddress,
        businessWebsite
      });
      setRegistrationSuccess(true);
      // return <Navigate to={"/login"} />;
      //   alert("Registration successful. Now you can log in");
    } catch (e) {
      //    setRegistrationError(true);
      alert("Registration failed. Please try again later");
    }
  }

  if (registrationSuccess) {
    return <Navigate to={'/login'}/>
  }

  return (
      <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
              <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
              />
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

              {userType === "business" && (
                  <>
                    <input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(ev) => setBusinessName(ev.target.value)}
                    />

                    <input
                        type="tel"
                        placeholder="Business Contact"
                        value={businessContact}
                        onChange={(ev) => setBusinessContact(ev.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Business Address"
                        value={businessAddress}
                        onChange={(ev) => setbusinessAddress(ev.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Business Website"
                        value={businessWebsite}
                        onChange={(ev) => setbusinessWebsite(ev.target.value)}
                    />
                  </>
              )}

              <button className="primary">Register</button>
              <div className="text-center py-2 text-gray-500">
                Already a member?{" "}
                <Link className="underline text-black" to={"/login"}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
