import "./App.css";
import { useState } from "react";

function App() {
  //REVIEW[epic=demo, seq=13] 13. create state for the file that will be uploaded and the JSX elements with the event handlers
  const [selectedFile, setSelectedFile] = useState(null);

  //REVIEW[epic=demo, seq=13.3] 13.3 create state for the user we want to register. Our user will be an object, and the image property will be set inside the submit picture function
  const [newUser, setNewUser] = useState({});

  //REVIEW[epic=demo, seq=25] 25. Create on event handler function for the 3 events OR create one event handle function for each of them
  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // REVIEW[epic=demo, seq=13.2] 13.2 Define submit function
  const submitForm = async (e) => {
    e.preventDefault();
    // call  FormData object constructor to populate with pairs of key/values (in this case {image: "our file"} )
    const formData = new FormData();
    console.log("selectedFile", selectedFile);
    formData.append("image", selectedFile);
    console.log("formData :>> ", formData);
    // compose the object with the options to be sent with our request, including the type of method, and use the body of the request to attach data

    const requestOptions = {
      method: "Post",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setNewUser({ ...newUser, avatarPicture: result.imageUrl }); // imageURL is how the field is defined in usersController.
    } catch (error) {}
  };

  //REVIEW[epic=demo, seq=26] 26. Create signUp function
  const signUp = async () => {
    //verify all necessary fields are filled
    // verify email / password length and strength with Regex

    //check code in Postman to see how composes the object that is sent in request's body
    let urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "avatarPicture",
      newUser.avatarPicture
        ? newUser.avatarPicture
        : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    );
    //REVIEW[epic=demo, seq=26.1] 26.1 Create and define the request options, including the objet created in the body
    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    //REVIEW[epic=demo, seq=26.2] 26.2 Fetch endpoint attaching the request options. Display succes/error message to user.
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signUp",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  return (
    <div className="App">
      <h1>User Registration and File Upload</h1>

      <div className="container">
        {/*  //REVIEW[epic=demo, seq=24] 24. create input fields for username, email and password.Using same handler function */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={newUser.userName ? newUser.userName : ""}
            name="userName"
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="email" >Your Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your Email"
            value={newUser.email ? newUser.email : ""}
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            value={newUser.password ? newUser.password : ""}
            onChange={handleChangeHandler}
          />
        </div>
        {/* REVIEW[epic=demo, seq=13.1] 13.1 create form element with input and button to submit the form */}
        <form >
          <input type="file" onChange={attachFileHandler} />
          <button onClick={submitForm}>Upload Picture</button>
        </form>
        {/* REVIEW[epic=demo, seq=13.4] 13.4. Conditional rendering of the user's pic, if there is one */}
        {newUser.avatarPicture && (
          <img src={newUser.avatarPicture} alt="userPic" />
        )}
      </div>
      <button onClick={signUp}>Signup</button>
    </div>
  );
}

export default App;
