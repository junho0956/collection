import styled from "styled-components";
import {screens} from "../../common/media";
import {SystemColor} from "../../common/colors";
import {images} from "../../common/images";

const Head = () => {
  return (
    <Container>
      <ul>
        <li>
          <a href="https://portfolio-gamma-two-50.vercel.app" target="_blank">
            portfolio
          </a>
        </li>
        <li>
          <a href="https://github.com/junho0956" target="_blank">
            <img src={images.platform.github} alt="" />
          </a>
        </li>
      </ul>
    </Container>
  );
};

export default Head;

const Container = styled.header`
  position: relative;
  width: 100%;
  font-weight: 600;
  border-bottom: 1px solid ${SystemColor.third};
  height: 60px;
  ul {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    li {
      position: relative;
    }
  }
  @media ${screens.desktop} {
    ul {
      padding: 0 40px;
      column-gap: 10px;
    }
    ul>li img {
      position: relative;
      width: 26px;
      height: 26px;
    }
  }
  @media ${screens.mobile} {
  }
`
