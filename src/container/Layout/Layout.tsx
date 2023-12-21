import styled from "styled-components";
import Nav from "../nav/Nav";
import Main from "../main/Main";
import {useRef, useState} from "react";
import useMouseGlobalEvent from "../../hooks/global/useMouseGlobalEvent";

const Layout = () => {
  const navOpenButtonRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(true);
  const handleNavOpen = () => setNavOpen(state => !state);

  const handleNavOpenButton = (e:MouseEvent) => {
    if (!navOpenButtonRef.current) return;
    const button = navOpenButtonRef.current;
    if (!navOpen && e.clientX < 50 && !button.classList.contains('view')) {
      button.classList.add('view');
    }
    else if (e.clientX >= 50 && button.classList.contains('view')) {
      button.classList.remove('view');
    }
  }

  useMouseGlobalEvent(handleNavOpenButton);

  return (
    <Container>
      <Nav navOpen={navOpen} handleNavOpen={handleNavOpen} ref={navOpenButtonRef} />
      <Main navOpen={navOpen} />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
`
