// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const colors = ['red', 'blue', 'green', 'yellow'];

const SimonGame = () => {
  const [gameSequence, setGameSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [message, setMessage] = useState("Press Start to Play");

  const startGame = () => {
    setIsGameStarted(true);
    setMessage("Watch the sequence...");
    addNewColorToSequence();
  };

  const addNewColorToSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGameSequence(prevSequence => [...prevSequence, randomColor]);
  };

  useEffect(() => {
    if (isGameStarted && gameSequence.length > 0) {
      setTimeout(() => {
        setIsPlayerTurn(true);
        setMessage("Now it's your turn!");
      }, gameSequence.length * 1000); // Delay based on sequence length
    }
  }, [gameSequence]);

  const handleColorClick = (color) => {
    if (!isPlayerTurn) return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== gameSequence[newUserSequence.length - 1]) {
      setMessage("Wrong sequence! Game Over.");
      resetGame();
    } else if (newUserSequence.length === gameSequence.length) {
      setMessage("Good job! Watch the next sequence.");
      setUserSequence([]);
      setIsPlayerTurn(false);
      setTimeout(addNewColorToSequence, 1000);
    }
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setGameSequence([]);
    setUserSequence([]);
    setIsPlayerTurn(false);
  };

  const flashColor = (color) => {
    const button = document.querySelector(`.${color}`);
    button.classList.add('flash');
    setTimeout(() => button.classList.remove('flash'), 500);
  };
  
  useEffect(() => {
    if (isGameStarted && !isPlayerTurn) {
      gameSequence.forEach((color, index) => {
        setTimeout(() => flashColor(color), index * 1000);
      });
    }
  }, [gameSequence, isPlayerTurn]);
  
  return (
    <div className="game-container">
      <h1>Simon Game</h1>
      <p>{message}</p>
      <div className="button-container">
        {colors.map(color => (
          <button
            key={color}
            className={`color-button ${color}`}
            onClick={() => handleColorClick(color)}
            disabled={!isPlayerTurn}
          >
            {color}
          </button>
        ))}
      </div>
      {!isGameStarted && (
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
      )}
    </div>
  );
};

export default SimonGame;
