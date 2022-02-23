import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { CgProfile } from "react-icons/cg";
import { Dashboard, Person, ListAlt, ExitToApp, ShoppingBasket } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Backdrop } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import "./userOptions.css"

const UserOptions = ({ user }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();

  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Prfile", func: account },
    { icon: <ShoppingBasket />, name: "Cart", func: cartFunc },
    { icon: <ExitToApp />, name: "LogOut", func: logOut },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard(){
      history.push("/admin/dashboard");
    }
    function orders(){
      history.push("/orders");
  }
  function cartFunc(){
    history.push("/cart");
  }

  function account(){
      history.push("/account")
  }

  function logOut(){ 
      dispatch(logout());
      alert.success("LogOut successfully");
  }
  function handleSpeed(){
    setOpen(!open);
  }
  return (
    <>

    <Backdrop open={open} style={{zIndex : "10" }}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speed_dial"
        onClick={handleSpeed}
        open={open}
        icon={<CgProfile />}
        FabProps={{ style: { backgroundColor: "#a82a37" } }}
        direction="down"
      >
           {options.map((item)=>(
               <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
              
              ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
