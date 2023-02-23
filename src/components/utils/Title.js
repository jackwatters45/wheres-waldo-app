import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TitleText = styled.h1`
  font-size: 28px;
  &:hover {
    opacity: 0.8;
  }
`;

const Title = () => (
  <Link to="/wheres-waldo-app/">
    <TitleText>Where's Waldo</TitleText>
  </Link>
);

export default Title;
