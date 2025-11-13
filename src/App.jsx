import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "./Components/Footer/Footer";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

function App() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="bg-primary-light dark:bg-primary-dark">
      <Navbar></Navbar>
      <ScrollToTop></ScrollToTop>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
