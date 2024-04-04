import {navRoutes} from "../../common/nav";
import React, {useMemo} from "react";
import styled from "styled-components";
import {screens} from "../../common/media";
import {SystemColor} from "../../common/colors";
import { Link } from 'react-router-dom';

const LinkRoute = ({url, title}:{url:string, title:string}) => {
  return (
    <Link to={url}>• {title}</Link>
  )
}

const Route = ({title}:{title:string}) => {
  return (
    <div>• {title}</div>
  )
}

export default function NavRoutes() {
  // const sortedNavRoutes = useMemo(() => {
  //   return navRoutes
  //     .sort((a,b) => {
  //       if (a.title < b.title) return -1;
  //       else if (a.title == b.title) return 0;
  //       else return 1;
  //     })
  // }, []);
  return (
    <Wrapper className="navRoutes">
      {navRoutes.map((route) => (
        <li key={route.path}>
          {!route.children ? (
            <LinkRoute url={`/${route.path}`} title={route.title} />
          ) : (
            <>
              <Route title={route.title} />
              <div className="child-routes">
                {route.children.map(croute => (
                  <LinkRoute
                    key={croute.title}
                    url={`/${route.path}/${croute.path}`}
                    title={croute.title}
                  />
                ))}
              </div>
            </>
          )}
        </li>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  &>li {
    padding: 10px 0;
    border-top: 1px solid ${SystemColor.third};
    
    &>.child-routes {
      display: flex;
      flex-direction: column;
      padding-top: 4px;
      padding-left: 20px;
      * {
        padding: 2px 0;
        user-select: none;
      }
    }
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  @media ${screens.desktop} {
    margin-top: 100px;
    height: calc(100% - 100px);
  }
  @media ${screens.mobile} {
    margin-top: 50px;
    height: calc(100% - 50px);
  }
`
