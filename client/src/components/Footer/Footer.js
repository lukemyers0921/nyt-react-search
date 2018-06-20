import React from "react";
const footerStyle = {
  marginRight: "auto",
  marginLeft: "auto"
}
const Footer = () => (
  <footer>
    <nav className="navbar navbar-dark bg-dark">
    <span style = {footerStyle} className="navbar-text">New York Times React Search 2018</span>
</nav>
  </footer>
);

export default Footer;
