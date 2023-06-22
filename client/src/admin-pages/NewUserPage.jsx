import {useState} from 'react';
import UserForm from './UserForm';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Header from '../Header';

const NewUserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to an API
    await axios.post("/a/users", {
      name,
      email,
      password,
      "userType": "user"
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/a/users'}/>
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header/>
      <div className="items-center justify-around grow">
          <div className="mt-40">
          <UserForm handleSubmit={handleSubmit} name={name} setName={setName} email={email} setEmail={setEmail}
              password={password} setPassword={setPassword} title={"New User Form"}/>
          </div>
      </div>
    </div>
  );
};

export default NewUserPage;
