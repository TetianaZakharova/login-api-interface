import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import './layout.scss'

export const Layout = () => {
  return (
    <main>
      <section className="container-wrap">
        <img src={logo} alt="Qencode logo" />
        <Outlet />
      </section>
    </main>
  );
};
