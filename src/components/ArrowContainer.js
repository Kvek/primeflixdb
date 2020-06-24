import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Chevron } from '@app/src/assets';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.colors.white};
  width: ${(props) => props.width ?? '50px'};
  z-index: 3;
  pointer-events: auto;

  svg {
    cursor: pointer;
    transition: transform 0.2s linear, padding-right 0.2s linear,
      padding-left 0.2s linear;

    &:hover {
      padding-left: 10px;

      &.right {
        padding-right: 10px;
      }
    }
  }

  &.left {
    left: 0;

    svg {
      transform: rotate(-180deg);
    }
  }

  &.right {
    right: 0;
  }
`;

const ArrowContainer = React.forwardRef(({ isRight, width }, ref) => {
  return (
    <Container width={width} className={isRight ? 'right' : 'left'} ref={ref}>
      <Chevron />
    </Container>
  );
});

ArrowContainer.propTypes = {
  isRight: PropTypes.bool,
};

ArrowContainer.defaultProps = {
  isRight: false,
};

export default ArrowContainer;
