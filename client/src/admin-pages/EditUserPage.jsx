import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import UserForm from './UserForm';
import axios from 'axios';
import Header from '../Header';

const EditUserPage = () => {
  const {id} = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to an API
    const response = await axios.put("/a/users", {
      id,
      name,
      email,
      password
    });
    console.log(response);
    setRedirect(true);
  };

  const fetchUserData = async () => {
    try {
      console.log(id);
      const response = await axios.get(`/a/users/${id}`);
      console.log(response);
      if (response.data) {
        setName(response.data.name);
        setEmail(response.data.email);
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (redirect) {
    return <Navigate to={'/a/users'}/>
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header/>
      <div className="items-center justify-around grow">
          <div className="mt-40">
          <UserForm handleSubmit={handleSubmit} name={name} setName={setName} email={email} setEmail={setEmail}
              password={password} setPassword={setPassword} title={"Edit User Form"}/>
          </div>
      </div>
    </div>
  );
};

export default EditUserPage;
