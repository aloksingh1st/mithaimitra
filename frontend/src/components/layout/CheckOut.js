import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import "./checkOut.css";
import { MdLibraryAdd, MdLocalShipping, MdPayment } from "react-icons/md";

const CheckOut = ({ activeSteps }) => {
  const iconStyle = {
    width: "250px",
  };
  const steps = [
    {
      label: <Typography>Shipping Detaiks</Typography>,
      icon: <MdLocalShipping style={iconStyle} />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAdd style={iconStyle} />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdPayment style={iconStyle} />,
    },
  ];
  const stepStyle = {
    boxSizing: "border-box",
  };

  return (
    <>
      <Stepper alternativeLabel activeSteps={activeSteps} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeSteps === index ? true : false}
            completed={activeSteps >= index ? true : false}
          >
            <StepLabel icon={item.icon} style={{
              color:activeSteps >= index ? "brown" : "rgba(0, 0, 0 ,0.649)",
            }}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOut;
