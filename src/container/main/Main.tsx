import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Board from "../board/Board";
import RadarChart from "../chart/RadarChart";
import ChartCustom from "../chart/ChartCustom";
import Geolocation from "../Geolocation/Geolocation";
import Head from "../head/Head";
import Home from "../Home";
import NotFound from "../NotFound";
import LineChart from "../chart/LineChart";
import ClientRect from "../clientRect/ClientRect";
import Query from "../Query/Query";
import {screens} from "../../common/media";
import HorizontalNavigation from "../navigation/HorizontalNavigation";
import VerticalNavigation from "../navigation/VerticalNavigation";
import CardPerspective from "../css/CardPerspective";
import BasicSlide from "../slide/BasicSlide";
import NextJS from "../nextjs/nextjs";
import HTTPCache from "../http/cache";
import Defer from "../utils/defer";
import DateUtils from "../utils/date";
import Cookie from "../utils/cookie";
import ETC from "../utils/etc";
import InfiniteScroll from "../hooks/InfiniteScroll";
import IsomorphicLayoutEffect from "../hooks/isomorphicLayoutEffect";
import ReloadService from "../hooks/reloadService";
import React19 from "../react/react19";
import React18 from "../react/react18";

type Props = {
  navOpen: boolean;
}

const Main = (props:Props) => {
  return (
    <Container className={props.navOpen ? "navOpen" : ""}>
      <Head />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nextjs" element={<NextJS />} />
        <Route path="/react/18" element={<React18 />} />
        <Route path="/react/19" element={<React19 />} />
        <Route path="/board" element={<Board />}/>
        <Route path="/client-rect" element={<ClientRect />} />
        <Route path="/css/perspective" element={<CardPerspective />} />
        <Route path="/slide/basic" element={<BasicSlide />} />
        <Route path='/react-query' element={<Query />} />
        <Route path='/http/cache' element={<HTTPCache />} />

        <Route path="/chart/radar" element={<RadarChart />} />
        <Route path="/chart/custom-radar" element={<ChartCustom />}/>
        <Route path="/chart/line" element={<LineChart />}/>

        <Route path="/geolocation" element={<Geolocation />}/>

        <Route path="/navigation/horizontal/basic" element={<HorizontalNavigation />} />
        <Route path="/navigation/vertical/basic" element={<VerticalNavigation />} />

        <Route path='/utils/defer' element={<Defer />} />
        <Route path='/utils/date' element={<DateUtils />} />
        <Route path='/utils/cookie' element={<Cookie />} />
        <Route path='/utils/etc' element={<ETC />} />

        <Route path='/hooks/infiniteScroll' element={<InfiniteScroll />} />
        <Route path='/hooks/isomorphicLayoutEffect' element={<IsomorphicLayoutEffect />} />
        <Route path='/hooks/reloadService' element={<ReloadService />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default Main;

const Container = styled.main`
  position: relative;
  width: 100%;
  
  @media ${screens.desktop} {
    transition: 0.4s ease;
    &.navOpen {
      margin-left: 300px;
    }
  }
  @media ${screens.mobile} {
    overflow-x: hidden;
    overflow-y: auto;
    &.navOpen {
      overflow-y: hidden;
    }
  }
`
