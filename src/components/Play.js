import React from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.img`
  width: 100%;
`;
const Play = ({img}) => {
  return (
    <div>
      <BackgroundImage src={img} alt="Background Scene" />
    </div>
  );
};

export default Play;
