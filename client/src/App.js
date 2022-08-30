import "./App.css";
import { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import { getToken } from "./utils/getToken";

function App() {
  const [user, setUser] = useState(false)

  const isUserLoggedIn = () => {

    const token = getToken()
    if (token) {
      setUser(true)
      console.log("You are ALREADY logged in")
    } else {
      setUser(false)
      console.log("You are NOT logged in");
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
      <h1>MERN APPLICATION</h1>

      <hr />
      <Register />
      <hr />
      <Login />
      <button onClick={logout} >logout</button>

      //NOTE Build the Routing sistem. A route per view : : a route for the landing page, route for the list of cities, route for list museums/hotels, one for login, and one register.
    
    </div>
  );
}

export default App;