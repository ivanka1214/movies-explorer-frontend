import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Main(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} page="master"></Header>
      <main className="page">
        <Promo></Promo>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Main;
