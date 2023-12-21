import React, { useRef } from 'react';
import styled from 'styled-components';

const Item = ({data}:{data:BoardContentType}) => {
  const Ref = useRef<HTMLLIElement>(null);

  return (
    <Container ref={Ref} className="boardItem" data-id={data.id}>
      <RItem data={data} />
      <RItem data={data} />
    </Container>
  )
};

const RItem = React.forwardRef<HTMLImageElement, {data:BoardContentType}>((props, ref) => {
  return (
    <RContainer>
      <p>{props.data.content}</p>
      <div>
        <div>
          <img src={props.data.avatar} ref={ref} alt="" />
        </div>
        <span>{props.data.author}</span>
      </div>
      <div>{props.data.createdAt}</div>
    </RContainer>
  )
});

export default Item;

const RContainer = styled.div`
  width: 280px;
  padding: 15px;
  user-select: none;
  box-sizing: border-box;
  background-color: #fff;

  & > :first-child {
    margin-bottom: 10px;
  }
  & > :nth-child(2) {
    margin-bottom: 5px;
    & > :first-child {
      display: inline-block;
      position: relative;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      object-fit: contain;
      overflow: hidden;
      right: 7px;
      top: 7px;
    }
  }
  & > :nth-child(2), & > :last-child {
    font-size: 15px;
    text-align: right;
  }
`

const Container = styled.li`
  background-color: #fff;
  font-size: 20px;
  margin: 0 10px 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  position: relative;

  &.switch{
    box-shadow: 0px 3px 0px 0px lightskyblue;
  }
  &>:first-child {
    cursor: pointer;
    visibility: visible;
    &:hover {
      transform: scale(1.01);
    }
  }
  &>:nth-child(2) {
    z-index: -1000;
    display: none;
  }
`
