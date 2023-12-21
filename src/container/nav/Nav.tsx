import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import styled from 'styled-components';
import {SystemColor} from "../../common/colors";
import {screens} from "../../common/media";
import NavRoutes from "./NavRoutes";

type Props = {
  navOpen: boolean;
  handleNavOpen: () => void;
}

const Nav = React.forwardRef<HTMLDivElement,Props>((props, ref) => {
  return (
    <Container className={props.navOpen ? "navOpen" : ""}>
      <div
        className={`nav-icon`}
        ref={ref}
        onClick={props.handleNavOpen}
      >
        <MdDoubleArrow color="rgb(100,100,100)" />
      </div>
      <NavRoutes />
    </Container>
  );
})

export default Nav;

const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  height: 100%;
  background-color: ${SystemColor.second};
  border-right: 1px solid ${SystemColor.third};
  transition: 0.4s ease;
  z-index: 9999;
  
  &>.nav-icon {
    transition: 0.1s linear;
    position: absolute;
  }
  
  @media ${screens.desktop} {
    width: 300px;
    &:not(.navOpen) {
      transform: translateX(-300px);
    }
    &>.nav-icon {
      top: 20px;
      cursor: pointer;
      &>svg {
        width: 24px;
        height: 24px;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
    &.navOpen>.nav-icon {
      right: 20px !important;
    }
    &>.nav-icon:not(.view) {
      right: 20px;
    }
    &>.nav-icon.view {
      right: -44px;
    }
  }
  @media ${screens.mobile} {
    width: 100%;
    max-width: 100vw;
    &:not(.navOpen) {
      transform: translateX(-100%);
    }
    &>.nav-icon {
      top: 20px;
      cursor: pointer;
      &>svg {
        width: 24px;
        height: 24px;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
    &.navOpen>.nav-icon {
      right: 20px !important;
    }
    &:not(.navOpen)>.nav-icon {
      right: -44px;
    }
  }
`;
