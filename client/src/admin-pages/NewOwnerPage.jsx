import {useState} from 'react';
import OwnerForm from './OwnerForm';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Header from '../Header';
import AdminNav from './AdminNav';

const NewOwnerPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessContact, setBusinessContact] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to an API
    await axios.post("/a/users/business", {
      name,
      email,
      password,
      "userType": "business",
      businessName,
      businessContact,
      businessAddress,
      businessWebsite
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/a/users'}/>
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header/>
      <AdminNav/>
      <div className="items-center justify-around grow">
          <div className="mt-16">
          <OwnerForm handleSubmit={handleSubmit} name={name} setName={setName} email={email} setEmail={setEmail} businessName={businessName} setBusinessName={setBusinessName} businessContact={businessContact} setBusinessContact={setBusinessContact} businessAddress={businessAddress} setBusinessAddress={setBusinessAddress} businessWebsite={businessWebsite} setBusinessWebsite={setBusinessWebsite}
              password={password} setPassword={setPassword} title={"New Owner Form"}/>
          </div>
      </div>
    </div>
  );
};

export default NewOwnerPage;
