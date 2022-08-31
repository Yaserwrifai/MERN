import React, { useState } from "react";
import { getToken } from "../utils/getToken";
function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    const getProfile = async () => {
        const token = getToken();
        if (token) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
            try {
                const response = await fetch(
                    "http://localhost:5000/api/users/profile",
                    requestOptions
                );
                const result = await response.json();
                setUserProfile({
                    email: result.email,
                    userName: result.userName,
                    avatarPicture: result.avatarPicture,
                });
            } catch (error) {
                console.log("error getting profile", error);
                setError("you need login first");
            }
        } else {
            setError("Please login first")
            alert("Please login First")
        }
    };
    return (
        <div>
            <h2>User Profile</h2>
            <button onClick={getProfile}>getProfile</button>
            {userProfile && (
                <div>
                    <p>{userProfile.userName}</p>
                    <p>{userProfile.email}</p>
                    <img src={userProfile.avatarPicture} alt="" />
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Profile