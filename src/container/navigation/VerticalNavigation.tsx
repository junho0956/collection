import {navRoutes} from "../../common/nav";
import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {SystemColor} from "../../common/colors";

export default function VerticalNavigation() {
  return (
    <Wrapper>
      <ul>
        {navRoutes.map((nav, idx) => (
          <Li
            key={nav.title}
            childCnts={nav.children ? nav.children.length : 0}
          >
            {!nav.children ? (
              <Link to={`/${nav.path}`}>{nav.title}</Link>
            ) : (
              <>
                <div>{nav.title}</div>
                <ul className="subRoutes">
                  {nav.children.map(nc => (
                    <li key={nc.title}>
                      <Link to={`/${nav.path}/${nc.path}`}>{nc.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Li>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  padding: 20px;
  
  li {
    position: relative;
    width: 150px;
    height: 50px;
    user-select: none;
    div, a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      line-height: 50px;
      text-decoration: none;
      text-align: center;
      color: inherit;
    }
    a:hover {
      font-weight: 700;
    }
  }
  
  li:hover {
    background-color: lightblue;
  }

  &>ul {
    background: ${SystemColor.second};
    font-size: 14px;
    font-weight: 500;
    width: min-content;
  }
`

const Li = styled.li<{childCnts:number}>`
  ul.subRoutes {
    overflow: hidden;
    position: absolute;
    visibility: hidden;
    transition: .1s ease;
    top: 0px;
    left: 150px;
    background: ${SystemColor.second};
    height: 0;
  }
  &:hover ul.subRoutes {
    visibility: visible;
    height: calc(100% * ${props => props.childCnts});
  }
`