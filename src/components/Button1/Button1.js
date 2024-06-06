import React from "react";
import PropTypes from "prop-types";
import "./button1.css";

function Button1({ name }) {
  const buttonStyle = {
    "--clr": "#39FF14",
  };

  return (
    <div>
      <button className="button1" style={buttonStyle}>
        <span>{name}</span>
        <i></i>
      </button>{" "}
    </div>
  );
}

Button1.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button1;
