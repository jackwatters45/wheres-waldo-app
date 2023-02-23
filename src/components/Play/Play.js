import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../utils/Title';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';
import sceneImgs from '../../assets/waldoScenes';
import snakeToCamel from '../utils/snakeToCamel';
import PlayDropdown from './PlayDropdown';
import GameOverOverlay from './GameOverOverlay';

const PlayHeaderContainer = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: fit-content;
  padding: 10px 50px;
  align-items: center;
  background-color: var(--main-background-color);
  width: 100%;
`;

const BackgroundImage = styled.img`
  width: 100%;
`;

const Timer = styled.h2`
  justify-self: flex-end;
`;

const Play = () => {
  const { id } = useParams();

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const handleStopTimer = () => setIsActive(false);
  useEffect(() => {
    let interval;
    if (isActive)
      interval = setInterval(() => setTime((seconds) => seconds + 0.01), 10);
    return () => clearInterval(interval);
  }, [isActive, time]);

  const [backgroundImg, setBackgroundImg] = useState();
  useEffect(() => {
    const getBackgroundImgLocal = () =>
      setBackgroundImg(sceneImgs[snakeToCamel(id)]);
    getBackgroundImgLocal();
    // how do using firebase storage
    // const getBackgroundImg = async () => {
    //   const storageRef = ref(storage, `imgs/${id}.jpg`);
    //   const backgroundImg = await getDownloadURL(storageRef);
    //   console.log(backgroundImg);
    //   // setBackgroundImg(backgroundImg);
    // };
    // getBackgroundImg();
  }, [backgroundImg, id]);

  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const resetCharacters = () => setCharacters([]);
    resetCharacters();

    const fetchCharacters = async () => {
      const collectionRef = collection(doc(db, 'levels', id), 'characters');
      const docsSnapshot = await getDocs(collectionRef);
      docsSnapshot.forEach((doc) => {
        const id = doc.id;
        const coordinates = doc.get('coordinates');
        const img = doc.get('img');
        setCharacters((prev) => [
          ...prev,
          { id, coordinates, img, found: false },
        ]);
      });
    };
    fetchCharacters();
  }, [id]);

  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    if (!characters.length || !characters.every((char) => char.found)) return;
    handleStopTimer();
    setIsGameOver(true);
  }, [characters]);

  const handleClick = (e) => {
    const charactersCopy = [...characters];

    const getClickLocation = (e) => [
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100,
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100,
    ];
    const [xClick, yClick] = getClickLocation(e);

    const getClickDistance = (xCoord, yCoord) =>
      Math.abs(xClick - xCoord) + Math.abs(yClick - yCoord);
    const clickedChar = charactersCopy.find(
      ({ coordinates }) => getClickDistance(coordinates[0], coordinates[1]) < 2,
    );

    if (!clickedChar) return;
    clickedChar.found = true;
    setCharacters([...charactersCopy]);
  };

  const handleResetGame = () => {
    const charactersCopy = [...characters];
    charactersCopy.forEach((character) => (character.found = false));
    setCharacters(charactersCopy);

    setTime(0);
    setIsActive(true);
    setIsGameOver(false);
  };

  return (
    <playcontainer>
      {isGameOver && (
        <GameOverOverlay
          time={time}
          handleResetGame={handleResetGame}
          id={id}
        />
      )}
      <PlayHeaderContainer>
        <Title />
        <PlayDropdown characters={characters} />
        <Timer>{time.toFixed(2)}s</Timer>
      </PlayHeaderContainer>
      <BackgroundImage
        src={backgroundImg}
        alt="Background Scene"
        onClick={handleClick}
      />
    </playcontainer>
  );
};

export default Play;
