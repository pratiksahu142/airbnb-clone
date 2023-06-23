import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import OwnerForm from './OwnerForm';
import axios from 'axios';
import Header from '../Header';
import AdminNav from './AdminNav';

const EditOwnerPage = () => {
  const {id} = useParams();
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
    const response = await axios.put("/a/users/business", {
      id,
      name,
      email,
      password,
      businessName,
      businessContact,
      businessAddress,
      businessWebsite
    });
    console.log(response);
    setRedirect(true);
  };

  const fetchOwnerData = async () => {
    try {
      const response = await axios.get(`/a/users/business/${id}`);
      console.log(response);
      if (response.data) {
        setName(response.data.name);
        setEmail(response.data.email);
        setBusinessName(response.data.businessName);
        setBusinessContact(response.data.businessContact);
        setBusinessAddress(response.data.businessAddress);
        setBusinessWebsite(response.data.businessWebsite);
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOwnerData();
    }
  }, [id]);

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
              password={password} setPassword={setPassword} title={"Edit Owner Form"}/>
          </div>
      </div>
    </div>
  );
};

export default EditOwnerPage;
