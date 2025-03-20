import React, { useState } from 'react'
import ProfileInfo from '../Cards/Profileinfo'
import { useNavigate } from 'react-router-dom';
import Searchbar from '../SearchBar/SearchBar';


const Navbar = ({userInfo, onSearchNote, onClearSearch, hideControls = false}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = ()=>{
    localStorage.clear()
    navigate("/login")
  }

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  }

  const handleClearSearch = () =>{
    setSearchQuery("");
    onClearSearch();
  }

  return (
    <div className="bg-white flex items-center px-6 py-2 drop-shadow h-16 relative">
        <h2 className={`text-xl font-medium text-black ${hideControls ? 'absolute left-1/2 transform -translate-x-1/2' : ''}`}>Notes</h2>

        {!hideControls && (
          <>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Searchbar
                value={searchQuery}
                onChange={({target}) => {
                  setSearchQuery(target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>
            <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
          </>
        )}
    </div>
  )
}

export default Navbar
