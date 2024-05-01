import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/react-router.svg";
import './layout.scss'

export const Layout = () => {
  return (
    <main>
      <section className="container-wrap">
        <img src={logo} alt="Emiorad logo" />
        <Outlet />
      </section>
    </main>
  );
};
