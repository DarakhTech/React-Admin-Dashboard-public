import React, { useState } from 'react';
import './upload.css'

import tw from "twin.macro";
function FileUploadForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [payType, setPayType] = useState("GEMS");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  
  const handleSubmit = (event) => {
    const loggeduser = localStorage.getItem('username')
    event.preventDefault();
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user', loggeduser);
        formData.append('payType', payType)
        onSubmit(formData);
      }
  };

  const Logout = () =>{
    localStorage.removeItem('logintoken')
    document.location.href='/login'
  }

  const Input = tw.input`px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5`;
  const Select = tw.select`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5`;
  return (
    <div>
    <form onSubmit={handleSubmit}>
        { file === null
            ?
            (<>
              <Input type="file" onChange={handleFileChange} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' />
              {/* <button type="submit">Upload</button> */}
              </>
            )
            :
            (<>
            <Input type="text" placeholder="Sheet Selected" disabled />
            <button type="submit" onClick={()=>{setFile(null)}}>Clear Sheet</button>
            </>
            )
          }
        {/* <Input type="file" onChange={handleFileChange} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'/> */}
        
        <div style={{paddingTop:'10px'}}>
          <Select id="dropdown" placeholder='Pay Type' value={payType} onChange={(e)=>{setPayType(e.target.value)}}>
            <option value="XX">Choose Option</option>
            <option value="GEMS">GEMS</option>
            <option value="Cash">Cash</option>
          </Select>
        </div>
        
    <button type="submit">Upload</button>
    </form>
    <div style={{paddingTop:'10px'}}>
      <button type="submit" onClick={Logout}>Logout</button>
    </div>
    </div>
    
  );
}

export default FileUploadForm;
