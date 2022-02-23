import React, { useEffect } from "react";
import MetaData from "../MetaData";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useHistory } from "react-router-dom";
import "./Profile.css"

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    
    if(!isAuthenticated){
        history.push("/login");
    }
  }, [history, isAuthenticated]);
  



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />

          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <CgProfile />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
