// images
import "../images/icons8_Books_16.png";
import "../images/icons8_Books_32.png";
import "../images/icons8_Books_48.png";
import "../images/icons8_Books_64.png";
import "../images/icons8_Books_128.png";

// styles
//import "../css/material-icons.css";
//import "../css/materialize.min.css";
import "../css/popup.css";

// js
//import "./lib/materialize.min";
//import "./popup/index";
import React from "react";
import ReactDOM from "react-dom";
import Popup from "./components/popup/Popup";

const element = document.getElementById("root");
element && ReactDOM.render(<Popup />, element);
