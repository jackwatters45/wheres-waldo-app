import React from 'react';
import { mdiCheckboxMarked, mdiCheckboxBlank } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';

const StyledIcon = styled(Icon)`
  position: absolute;
  margin: 115px 0 0 0;
`;

const CheckboxWithFill = ({ index }) => {
  const getPosition = () => index * 132 + 86;
  return (
    <>
      <StyledIcon
        path={mdiCheckboxBlank}
        size={0.9}
        color={'white'}
        style={{ marginLeft: getPosition() }}
      />
      <StyledIcon
        path={mdiCheckboxMarked}
        size={1}
        color={'green'}
        style={{ marginLeft: getPosition() }}
      />
    </>
  );
};

export default CheckboxWithFill;
