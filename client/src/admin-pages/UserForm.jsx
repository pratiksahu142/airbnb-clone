import { Link } from "react-router-dom";

const UserForm = ({handleSubmit, email, setEmail, name, setName, title, password, setPassword}) => {

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <form onSubmit={handleSubmit} className="">
          <input
              type="text"
              value={name}
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
          />
          <input
              type="email"
              value={email}
              placeholder="johndoe@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
          />
        
        <button className="mt-5 primary" type="submit">
          Save
        </button>
        <Link to={"/a/users"}>
          <button className="mt-2 secondary" type="button">
            Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default UserForm;
