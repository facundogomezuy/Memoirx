"use client"
import React from "react";
import MemoBase from "@/app/components/Base/MemoBase";
import "../../../styles/globals.css"

const Countries = () => {
  // Props para el MemoBase
  const props = {
    imgRoute: "footballIMG",
  };

  return (
    <div className="container">
      <div className="insideContainer">
        <h1 style={{marginBottom: '30px'}}>Memo de Fútbol</h1>
        <MemoBase {...props} />
      </div>
    </div>
  );
};

export default Countries;
