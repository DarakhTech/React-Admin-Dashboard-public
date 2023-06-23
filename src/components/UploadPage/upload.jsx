import React, {useEffect, useState} from 'react';
import FileUploadForm from './FileUploadForm';
import './upload.css'
import { Space, Spin, Typography } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Upload() {
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const AsyncFunc = async () => {
      setLoading(true)
      const token = localStorage.getItem('logintoken')
      if (token) {
          await axios.post(`http://localhost:8000/checkToken`,{token:token})
            .then(function (response) {
                if(response.data.name !== "JWSInvalid"){
                  // document.location.href = '/dashboard'
                  // console.log(response.data.loggedUser)
                  localStorage.setItem('username',response.data.loggedUser)
                  setLoading(false)
                }else{
                  localStorage.removeItem('logintoken')
                  document.location.href = '/login'
                }
            })
            .catch(function (error) {
                console.log(error);
            }) 
      }else{
        document.location.href = '/login'
      }
    }
    AsyncFunc();
  }, [])

  const handleSubmit = (formData) => {
    
    // console.log("uploading")
    setLoading(true)
    fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        // console.log(data)
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
      .catch((error) => {
        // Handle error
        toast.error('Error Uploading', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      });
  };
  return (
    <div className='App'>
       <ToastContainer />
      {
      loading ?
      <>
        <Space>
          <Spin tip="Loading..." size="large">
          </Spin>
        </Space>
        </>
      :
      <>
      <Space direction='vertical'>
        {/* <Space >
          <Typography>Upload Data</Typography>
        </Space> */}

        <Space>
          <FileUploadForm onSubmit={handleSubmit} /> 
        </Space>
        
      </Space>
      </>
    }
    </div>
  )
}

export default Upload
