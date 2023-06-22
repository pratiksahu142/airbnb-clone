const UserForm = ({
  handleSubmit,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword
}) => {

  return (
      <>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
              type="text"
              value={name}
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
          />
          <input
              type="email"
              value={email}
              placeholder="johndoe@email.com"
              onChange={(e) => setEmail(e.target.value)}
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
        </form>
      </>
  );
};

export default UserForm;
