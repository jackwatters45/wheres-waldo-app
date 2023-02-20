import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayHeader from './PlayHeader';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';
import sceneImgs from '../../assets/waldoScenes';
import snakeToCamel from '../utils/snakeToCamel';

const BackgroundImage = styled.img`
  width: 100%;
`;

// TODO add images and coordinates to other pages
// TODO mark image or something when found
// TODO logic for game over
// TODO Timing
// TODO login
// TODO high score stuff

const Play = () => {
  const { id } = useParams();

  const [backgroundImg, setBackgroundImg] = useState();
  useEffect(() => {
    const getBackgroundImgLocal = async () =>
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
  }, [id]);

  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const resetCharacters = () => setCharacters([]);
    resetCharacters();

    const fetchPost = async () => {
      const docRef = doc(db, 'levels', id);

      const collectionRef = collection(docRef, 'characters');
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
    fetchPost();
  }, [id]);

  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    const allFound = characters.every((character) => character.found);
    if (allFound) setIsGameOver(true);
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

  return (
    <div>
      <PlayHeader characters={characters} />
      <BackgroundImage
        src={backgroundImg}
        alt="Background Scene"
        onClick={handleClick}
      />
    </div>
  );
};

export default Play;
