import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import "../../../styles/globals.css"
const MemoBase = (props) => {
  const [quantity, setQuantity] = useState(4);
  const [selectedCells, setSelectedCells] = useState([]);
  const [images, setImages] = useState([]);
  const [matchedCells, setMatchedCells] = useState([]);
  const [counter, setCounter] = useState(0);
  const [points, setPoints] = useState(0);

  /*Este useEffect sirve para que al cambiar el tamaño de la tabla, se vuelva a mixear el array, ya que en el array images no habran mas o menos imagenes */
  useEffect(() => {
    shuffleImages()
  }, [quantity]);

  /*Este useEffect sirve para que al cambiar la cantidad de emparejadas, se pueda checkear si se ha finalizado la partida o no */
  useEffect(() => {
    if (quantity === 4 && counter === 8) {
      restartGame()
    } else if (quantity === 6 && counter === 18) {
      restartGame()
    }
  }, [counter]);

  /*Funcion creada para mixear el array de imagenes */
  function shuffleImages(){
    const originalImages = [];
    for (let i = 1; i <= (quantity * quantity / 2); i++) {
      const imageUrl = `/${props.imgRoute}/${i}.jpg`;
      originalImages.push(imageUrl);
    }

    const duplicatedImages = [...originalImages, ...originalImages];
    const shuffledImages = shuffleArray(duplicatedImages);
    setImages(shuffledImages);
  }
  
  /*Funcion creada para mixear el un array x */
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
  /*Funcion creada para que al hacer click en una card se compruebe si es igual a la anteriormente pulsada o si es distinta, en funcion de eso que haga determinada tarea */
  function handleClick(index) {
    playSound()
    if (matchedCells.includes(index) || selectedCells.includes(index)) {
      return;
    }
    if (selectedCells.length === 0) {
      setSelectedCells([index]);
    } else if (selectedCells.length === 1) {
      const firstIndex = selectedCells[0];
      if (images[firstIndex] === images[index]) {
        setMatchedCells(prevMatchedCells => [...prevMatchedCells, firstIndex, index]);
        setCounter(prevCounter => prevCounter + 1);
        setSelectedCells([]);
        setPoints(points + 100);
      } else {
        setPoints(points - 10);
        setSelectedCells(prevSelectedCells => [...prevSelectedCells, index]);
        setTimeout(() => {
          setSelectedCells(prevSelectedCells => {
            if (prevSelectedCells.includes(index)) {
              return prevSelectedCells.filter(cellIndex => cellIndex !== index && cellIndex !== firstIndex);
            } else {
              return prevSelectedCells;
            }
          });
        }, 700);
      }
    }
  }

  /*Funcion para crear una tabla 4x4 o 6x6 */
  function Table({ many }) {
    let table = [];
    for (let i = 0; i < many; i++) {
      const row = [];
      for (let j = 0; j < many; j++) {
        const index = i * many + j;
        const isFlipped = selectedCells.includes(index) || matchedCells.includes(index);
        const isClickable = !matchedCells.includes(index);
        const imageSrc = isFlipped ? images[index] : `/background.png`;

        row.push(
          <td
            key={j}
            id={index}
            className={`${styles.td} ${isFlipped ? styles.flipped : ''}`}
            onClick={() => isClickable && handleClick(index)}
            style={{ backgroundImage: `url(${imageSrc})` }}
          ></td>
        );
      }
      table.push(<tr key={i} className={styles.tr}>{row}</tr>);
    }

    return (
      <table>
        <tbody className={styles.tbody}>{table}</tbody>
      </table>
    );
  }

  /*Funcion creada para Restablecer todos los parametros y reordenar el array de imagenes al finalizar la partida */
  function restartGame(){
    setMatchedCells([]);
    setSelectedCells([]);
    setCounter(0);
    document.getElementById("myModal").style.display = "flex";
    victorySound()
    shuffleImages()
  }
  /*Funcion creada para reproducir un sonido al girar una carta */
  function playSound(){
    let audio = new Audio('/flipcard.mp3');
    audio.play()
  }

  /*Funcion creada para reproducir un sonido al finalizar la partida */
  function victorySound(){
    let audio = new Audio('/victory.mp3')
    audio.play()
  }

  /*Funcion creada para cerrar el modal */
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    setPoints(0);
  }

  return (
    <div className="tableDiv">
      <div className="selectHeader">
        <button onClick={() => {
          setQuantity(4);
          setMatchedCells([]);
          setSelectedCells([]);
          setCounter(0);
          setPoints(0);
        }}>4x4</button>
        <button onClick={() => {
          setQuantity(6);
          setMatchedCells([]);
          setSelectedCells([]);
          setCounter(0);
          setPoints(0);
        }}>6x6</button>
      </div>
      <p>Puntuación: {points}</p>
      <Table many={quantity} />
      <div id="myModal" className={styles.modal}>
        <div className={styles.modalcontent}>
          <h2 style={{marginBottom:'20px'}}>Felicitaciones!</h2>
          <h2>Has completado el desafío {quantity + "x" + quantity}</h2>
          <p>Tu puntuación es de: <b>{points}</b></p>
          <button onClick={closeModal} className={styles.closeModalBtn}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default MemoBase;
