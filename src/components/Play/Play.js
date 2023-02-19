import React from 'react';
import styled from 'styled-components';
import PlayHeader from './PlayHeader';
import rocketImage from '../../assets/waldoScenes/rocketScene.jpg';
import rocketWoman from '../../assets/imgs/rocketWoman.jpg';
import rocketPaper from '../../assets/imgs/rocketPaper.jpg';
import rocketDesk from '../../assets/imgs/rocketDesk.jpg';

const BackgroundImage = styled.img`
  width: 100%;
`;
const Play = () => {
  // TODO get image id from backend

  const target = { name: 'Sample Target', coordinates: [149, 419] };
  const img = rocketImage;
  const getClickLocation = (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    return [x, y];
  };

  const handleClick = (e) => {
    const [xClick, yClick] = getClickLocation(e);
    const xDiff = Math.abs(xClick - target.coordinates[0]);
    const yDiff = Math.abs(yClick - target.coordinates[1]);

    console.log(xDiff + yDiff < 50);
  };

  return (
    <div>
      <PlayHeader chars={chars} />
      <BackgroundImage src={img} alt="Background Scene" onClick={handleClick} />
    </div>
  );
};

export default Play;

const chars = [
  { name: 'Rocket Woman', img: rocketWoman, found: false },
  { name: 'Rocket Paper', img: rocketPaper, found: false },
  { name: 'Rocket Desk', img: rocketDesk, found: false },
];
