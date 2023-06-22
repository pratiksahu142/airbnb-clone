import {useState} from 'react';
import UserForm from './UserForm';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

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
      <div className="flex items-center justify-around mt-4 grow">
        <div className="mt-40">
          <h2 className="mb-4 text-2xl font-bold">New User Form</h2>
          <UserForm handleSubmit={handleSubmit} name={name} setName={setName}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}/>
        </div>
      </div>
  );
};

export default NewUserPage;
