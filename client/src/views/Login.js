import React, { useState } from "react";

function Login() {
    const [userLogin, setUserLogin] = useState({})
    

const handleChangeHandler = (e) => {
  setUserLogin({...userLogin, [e.target.name]: e.target.value})
}
 const login = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", userLogin.email);
    urlencoded.append("password", userLogin.password);
    
    var requestOptions = {
      method: 'POST',
      body: urlencoded,
    };
    try {
        const response = await fetch("http://localhost:5000/api/users/login", requestOptions)
        const result = await response.json()
        const {token, user} = result
        console.log('loging successful', result)
        if (token) {
            localStorage.setItem("token", token)
        }
    } catch (error) {
        console.log('error during Login :>> ', error);
    }
    
    
    
 }
  return (
  <div>
    <div className="container">
        
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            name="email"
            id="email"  placeholder="Your Email"
            value={userLogin.email ? userLogin.email : ""}
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"  placeholder="Password"
            value={userLogin.password ? userLogin.password : ""}
            onChange={handleChangeHandler}
          />
        </div>
       
       
      </div>
      <button onClick={login}>Login</button>
  </div>

  )
}

export default Login;