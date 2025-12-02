import React from "react";
import "./DanaPensiun.css";
import NavBar from "../components/NavBar/NavBar";

export default function DanaPensiun() {
  return (
    <>
        <NavBar isLoggedIn={true} />
        <div class="pensiun-wrapper">
            Hi there! wanna sign my petition?
        </div>
    </>

  );
}
