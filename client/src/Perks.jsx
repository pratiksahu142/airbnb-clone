export default function Perks({selected, onChange}){
  function handleCheckboxClick(ev){
    const {checked, name} = ev.target;
    if(checked){
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter( selectedName => selectedName !== name)]);
    }
  }
  return (
    <>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/>
        </svg>
        <span>Wifi</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
        </svg>
        <span>Free Parking</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('heat')} name="heat" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"/>
        </svg>

        <span>Heat</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('pool')} name="pool" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"/>
        </svg>

        <span>Pool</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('restaurant')} name="restaurant" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
        </svg>

        <span>Restaurant</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
        </svg>

        <span>TV</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
        </svg>

        <span>Pets</span>
      </label>
      <label
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCheckboxClick}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/>
        </svg>

        <span>Private Entrance</span>
      </label>
    </>
  );
}