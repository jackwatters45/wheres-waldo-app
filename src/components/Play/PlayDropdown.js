import React, { useState } from 'react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';
import CheckboxWithFill from '../utils/CheckboxWithFill';

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Characters = styled.div`
  position: absolute;
  display: flex;
  margin: 48px 0 0 0;
  padding: 15px 20px;
  gap: 20px;
  background-color: var(--main-background-color);
`;

const CharacterImg = styled.img`
  height: 140px;
  object-fit: cover;
`;

const CharacterImgGreenBorder = styled(CharacterImg)`
  outline: solid 3px green;
`;

const PlayDropdown = ({ characters }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClickDropdown = () => setShowDropdown(!showDropdown);

  return showDropdown ? (
    <DropdownContainer>
      <Icon path={mdiChevronUp} size={1.5} onClick={handleClickDropdown} />
      <Characters>
        {characters.map((char, index) =>
          char.found ? (
            <>
              <CharacterImgGreenBorder src={char.img} key={char.id} />
              <CheckboxWithFill index={index} />
            </>
          ) : (
            <CharacterImg src={char.img} key={char.id} />
          ),
        )}
      </Characters>
    </DropdownContainer>
  ) : (
    <Icon path={mdiChevronDown} size={1.5} onClick={handleClickDropdown} />
  );
};

export default PlayDropdown;
