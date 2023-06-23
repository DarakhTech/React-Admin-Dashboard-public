import React, {useEffect, useState} from 'react'

import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import './App.css'

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };
    useEffect(()=>{
        const AsyncFunc = async () => {
          const token = localStorage.getItem('logintoken')
          if (token) {
              await axios.post(`https://a22-server-production.up.railway.app/checkToken`,{token:token})
                .then(function (response) {
                    if(response.data.name !== "JWSInvalid"){
                      if(response.data.access < 2){
                        document.location.href = '/upload'
                      }
                    }else{
                        localStorage.removeItem('logintoken')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                }) 
          }
        }
        AsyncFunc();
      }, [])
  return (
    <div className="App">
    <div className="AppGlass">
      <Sidebar onSelectOption={handleOptionSelect} />
      <MainDash selectedOption={selectedOption} />
      <RightSide />
    </div>
  </div>
  )
}
