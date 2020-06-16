import React, { useState } from 'react';
import styled from '@emotion/styled';
import Searchbar from './Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Match } from '@reach/router';

const NavbarContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 16px;
  padding: 0 20px 0 0;
  margin: 0;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }
`;

const LogoContainer = styled.div`
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1%;
  height: 100%;
  width: 80px;
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: auto;
  margin-top: -15%;

  svg {
    :nth-of-type(1) {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
`;

const NavListContainer = styled.div`
  margin-right: 1%;
  flex: 3;
  display: flex;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: flex-start;
`;

const NavListItems = styled.li`
  text-transform: uppercase;
  height: 100%;
  margin: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${(props) => (props.isActive ? '2px solid white' : 0)};

  &:hover {
    border-bottom: 2px solid white;
    margin-bottom: -2px;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 4;
  margin-right: 1%;
`;

const LoginContainer = styled.div`
  width: 125px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 25px;

  svg {
    cursor: pointer;
  }
`;

const MobileNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding: 0 10px;

  svg {
    width: 20px;

    &.hamburger {
      margin-right: 10px;
    }
  }

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    display: none;
  }
`;

const SearchMobileContainer = styled.div`
  width: 100%;
  display: none;

  &.showMobileSearch {
    display: block;
  }
`;

const DesktopNav = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.maxPageWidth.tablet}) {
    display: flex;
    width: 100%;
  }
`;

const Navbar = () => {
  const [showSearch, setshowSearch] = useState(false);
  return (
    <NavbarContainer>
      <MobileNav>
        <FontAwesomeIcon icon='bars' size='lg' className='hamburger' />

        {!showSearch && (
          <FontAwesomeIcon
            icon='search'
            size='lg'
            onClick={() => setshowSearch(true)}
          />
        )}
        {showSearch && (
          <SearchMobileContainer className={showSearch && 'showMobileSearch'}>
            <Searchbar onIconClick={() => setshowSearch(false)} />
          </SearchMobileContainer>
        )}
      </MobileNav>

      <DesktopNav>
        <LogoContainer>
          <LogoItem>
            <Link to='/'>
              <FontAwesomeIcon icon='ticket-alt' color={'deepskyblue'} />
              <FontAwesomeIcon icon='film' color={'tomato'} />
            </Link>
          </LogoItem>
        </LogoContainer>
        <NavListContainer>
          <NavList>
            <Match key={'home'} path={'/'}>
              {({ match }) => (
                <Link to='/'>
                  <NavListItems isActive={match !== null}>Home</NavListItems>
                </Link>
              )}
            </Match>
            <Match key={'tv'} path={'/tv'}>
              {({ match }) => (
                <Link to='/tv'>
                  <NavListItems isActive={match !== null}>Tv</NavListItems>
                </Link>
              )}
            </Match>
            <Match key={'films'} path={'/films'}>
              {({ match }) => (
                <Link to='/films'>
                  <NavListItems isActive={match !== null}>Films</NavListItems>
                </Link>
              )}
            </Match>
            <Match key={'trailers'} path={'/trailers'}>
              {({ match }) => (
                <Link to='/trailers'>
                  <NavListItems isActive={match !== null}>
                    Trailers
                  </NavListItems>
                </Link>
              )}
            </Match>
            <Match key={'playlists'} path={'/playlists'}>
              {({ match }) => (
                <Link to='/playlists'>
                  <NavListItems isActive={match !== null}>
                    Playlists
                  </NavListItems>
                </Link>
              )}
            </Match>
          </NavList>
        </NavListContainer>
        <SearchContainer>
          <Searchbar />
        </SearchContainer>
        <LoginContainer>
          <FontAwesomeIcon icon='bell' />
          <FontAwesomeIcon icon='user-circle' />
        </LoginContainer>
      </DesktopNav>
    </NavbarContainer>
  );
};

export default Navbar;
