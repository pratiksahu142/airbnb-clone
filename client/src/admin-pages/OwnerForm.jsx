const OwnerForm = ({
    handleSubmit,
    email,
    setEmail,
    name,
    setName,
    title,
    password,
    setPassword,
    businessName,
    setBusinessName,
    businessContact,
    setBusinessContact,
    businessAddress,
    setBusinessAddress,
    businessWebsite,
    setBusinessWebsite
  }) => {
    return (
      <div className="max-w-lg mx-auto">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <form onSubmit={handleSubmit} className="">
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
            onChange={(ev) => setBusinessAddress(ev.target.value)}
          />
  
          <input
            type="text"
            placeholder="Business Website"
            value={businessWebsite}
            onChange={(ev) => setBusinessWebsite(ev.target.value)}
          />
  
          <button className="mt-5 primary" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  };
  
  export default OwnerForm;
  