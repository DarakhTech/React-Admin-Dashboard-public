import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { styled } from 'twin.macro';
import Logo from '../../imgs/logo.png';
// import useScanDetection from 'use-scan-detection'

import HashLoader from "react-spinners/HashLoader";

const PageContainer = styled.div`
  position: relative;
  background: linear-gradient(90deg, rgba(40, 33, 158, 1) 0%, rgba(71, 71, 207, 1) 21%, rgba(0, 212, 255, 1) 100%);
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-blur: 5px;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  width: 120px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

function Page() {
  const [email, setEmail] = useState('');
  const [entryType, setEntryType] = useState('');
  const [loading, setLoading] = useState(false);

  // useScanDetection({
  //   onComplete:setEmail,
  //   minLength:3
  // })

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await axios.post('https://a22-server-production.up.railway.app/checkuser', { email, entryType });
      if (response.data.code === 'ok') {
        setLoading(false)
        toast.success(response.data.message);
      } else {
        setLoading(false)
        toast.error(response.data.message);
      }
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PageContainer>
    {
      loading
      ?
      ( <div className='HashLoaderClass'><HashLoader color={"A336D7"} loading={loading} size={30} style={{margin:'auto', justifyContent:'center'}} /> </div>)
          
      :
      
      <><Image src={Logo} alt="Logo" /><InputGroup>
            <Label>Email ID:</Label>
            <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputGroup><InputGroup>
              <Label>Entry Type:</Label>
              <Select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="E">E</option>
                <option value="D">D</option>
              </Select>
            </InputGroup><Button onClick={handleSearch}>Search</Button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              theme="colored"/>
            </>
    }
     </PageContainer>
  );
}

export default Page;
