import React, {useEffect, useState} from "react";
import "./Login.css";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin =  async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password
			}),
		})

		const data = await response.json()
		if (data.status === 'ok') {
      localStorage.setItem('logintoken', data.token)
      // console.log(data.loginData)
      if(data.loginData.access === 1){
        document.location.href = '/upload'
      }else{
        document.location.href = '/dashboard'
      }

		}else{
      alert(data.error)
    }
  };

  useEffect(()=>{
    const AsyncFunc = async () => {
      const token = localStorage.getItem('logintoken')
      if (token) {
          await axios.post(`http://localhost:8000/checkToken`,{token:token})
            .then(function (response) {
                if(response.data.name !== "JWSInvalid"){
                  // document.location.href = '/dashboard'
                  console.log(response.data.loggedUser)
                  console.log(response.data.access)
                  if(response.data.access === 1){
                    document.location.href = '/upload'
                  }else{
                    document.location.href = '/dashboard'
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
    <div className="MainContainer">
      {loading
      ?
      <></>
      :
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      }
      
    </div>
  );
};

export default Login;
