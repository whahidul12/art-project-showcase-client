import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="bg-primary-light dark:bg-primary-dark">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
