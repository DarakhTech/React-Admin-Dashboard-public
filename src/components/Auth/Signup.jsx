import React, {useState} from "react";
import "./Signup.css";
import {axios} from "axios";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('https://a22-server-production.up.railway.app/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
        confirmPassword
			}),
		})

		const data = await response.json()
    console.log(data)
    // alert(data)
		if (data.status === 'ok') {
      // seterrMsg(data.msg)
      // history("/login")
      document.location.href='/login'
		}else{
      //setLoading(false)
      // seterrMsg(data.error)
      alert(data.error)
    }

  };
  return (
    <div className="MainContainer">
    <div className="Signup">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
