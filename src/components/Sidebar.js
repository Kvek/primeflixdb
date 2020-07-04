import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import isSidebarOpen from '@atoms/sidebarStatus.atom';

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -75vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: white;
  width: 75vw;
  transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SidebarWrapper = styled.div`
  width: 0%;
  height: 100vh;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: width 0.0125s linear;
  background-color: rgba(0, 0, 0, 0.45);
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    display: none;
  }

  &.isSidebarOpen {
    z-index: 2;
    width: 100%;

    ${SidebarContainer} {
      left: 0;
    }
  }
`;

const Sidebar = () => {
  const [sidebarOpen, setSidebarStatus] = useRecoilState(isSidebarOpen);
  const sidebarRef = useRef(null);

  const handleClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarStatus(false);
    }
  };

  return (
    <SidebarWrapper
      className={sidebarOpen && 'isSidebarOpen'}
      onClick={handleClick}
    >
      <SidebarContainer ref={sidebarRef}>Sidebar</SidebarContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;
