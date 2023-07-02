"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import '../styles/globals.css'

const HomePage = () => {
  const [inputValue, setValue] = useState('');
  const [memoElements, setMemoElements] = useState([]);
  const memoArray = [
    {
      imgSrc: '/countriesIMG/18.jpg',
      name: 'Paises',
      linkHref: '/games/countries'
    },
    {
      imgSrc: '/footballIMG/1.jpg',
      name: 'Fútbol',
      linkHref: '/games/football'
    },
    {
      imgSrc: '/sportsIMG/1.jpg',
      name: 'Deportes',
      linkHref: '/games/sports'
    }
  ];

  useEffect(() => {
    
    const elements = showMemos(filterArray(memoArray, inputValue));
    setMemoElements(elements);
  }, [inputValue]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  function showMemos(memoArrayModified) {
    const elements = memoArrayModified.map((element, index) => (
      <Link key={index} href={element.linkHref}>
        <div className="memoContainer">
          <img src={element.imgSrc} className="memoImg" />
          <p className="memoName">{element.name}</p>
        </div>
      </Link>
    ));
    return elements;
  }
  function filterArray(array, value){
    const memoArrayInput = []
    array.forEach(element => {
        if (element.name.toLowerCase().includes(value.toLowerCase())){
            console.log(element.name)
            memoArrayInput.push(element)
        }
    });
    return memoArrayInput
  }

  return (
    <div className="homeContainer">
      <h1>Busque su MemoTest</h1>
      <div className="searchContainer">
        <input
          type="text"
          className="searchMemo"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ej: Fútbol"
        />
        <button className="searchBtn">
          <img src="/lens.png" style={{ width: '30px' }} />
        </button>
      </div>
      <div>
        <div className="cardContainer" >
          {memoElements}
        </div>
      </div>
    </div>
  );
}

export default HomePage;


