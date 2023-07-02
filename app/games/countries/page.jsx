"use client"
import React, { useState, useEffect } from "react";
import MemoBase from "@/app/components/Base/MemoBase";
import "../../../styles/globals.css"

const Countries = () => {
  const props = {
    imgRoute: "countriesIMG",
  };
  return (
    <div className="container">
      <div className="insideContainer">
        <h1 style={{marginBottom: '30px'}}>Memo de Paises</h1>
        <MemoBase {...props}/>
      </div>
      
    </div>
  );
};

export default Countries;
