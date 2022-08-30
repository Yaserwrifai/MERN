import "./App.css";
import { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import { getToken } from "./utils/getToken";
import Profile from "./views/Profile";

function App() {
  const [user, setUser] = useState(false)

  const isUserLoggedIn = () => {
    
    const token = getToken()
    if(token) {
      setUser(true)
      console.log("you are ALREADY logged in")
    } else {
      setUser(false)
      console.log("you are NOT logged in");
    }
  }

  useEffect(() => {
    
  isUserLoggedIn()
   console.log(user);
  }, [user])

  const logout = () => {
    localStorage.removeItem('token');
    setUser(false)
    console.log("you are logged out");
  }
  
  return (
    <div className="App">
      <h1>Our wonderful APP</h1>
      <button onClick={logout} style={{backgroundColor: "red"}}>logout</button>
      <hr />
      <Register />
      <hr />
      <Login />
      <hr />
      <Profile/>
    </div>
  );
}

export default App;