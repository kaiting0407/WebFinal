"use client";
import Image from "next/image";
import "@/styles/style.css";
import Animation from "@/components/component/Animation";
import { Homepage } from "@/components/component/Homepage";
import SCW from "@/components/component/SCW";
import Grade from "@/components/component/Grade";
import Header from "@/components/component/Header";
import { useState } from "react";
import { CC } from "@/components/component/CC";

export default function Home() {
  const [handleMenuClick, sethandleMenuClick] = useState("HOME");
  const handleLearnMoreClick = () => {
    sethandleMenuClick("GRADE");
  };
  return (
    <div className="App">
      <Animation />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> 
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> 
         <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> 
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        /> 

        
      <Header onMenuClick={sethandleMenuClick} />
      <main className="Main">
        {handleMenuClick === "HOME" ? (
          <Homepage onButtonClick={sethandleMenuClick} />
        ) : handleMenuClick === "GRADE" ? (
          <Grade />
        ) : handleMenuClick === "SCW" ? (
          <SCW />
        ) : handleMenuClick === "CreditCalculator" ? (
          <CC />
        )  : null}
      </main>
    </div>
  );
}
