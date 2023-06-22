import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import UserForm from './UserForm';
import axios from 'axios';

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
      <div className="flex items-center justify-around mt-4 grow">
        <div className="mt-40">
          <h2 className="mb-4 text-2xl font-bold">Edit User Form</h2>
          <UserForm handleSubmit={handleSubmit} name={name} setName={setName}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}/>
        </div>
      </div>
  );
};

export default EditUserPage;
