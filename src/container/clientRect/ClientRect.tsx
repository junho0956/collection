import React, {useEffect, useRef, useState} from 'react';
import styled, {keyframes, css} from "styled-components";

interface ItemProps {
    sx:number;
    sy:number;
    ex:number;
    ey:number;
}

const ClientRect = () => {
    const [initPos, setInitPos] = useState<Omit<ItemProps, "ex"|"ey">>();
    const [movingLocation, setMovingLocation] = useState<ItemProps>();

    const elRef = useRef<HTMLDivElement>(null)
    const fixedElRef = useRef<HTMLDivElement>(null)

    const getRect = (ref:React.RefObject<HTMLDivElement>) => {
        const rect = (ref.current as HTMLDivElement).getBoundingClientRect();
        return { top:rect.top, left:rect.left };
    }

    const move = () => {
        const fixedElRect = getRect(fixedElRef);
        const movingElRect = getRect(elRef);
        setMovingLocation({
            sx: movingElRect.left,
            sy: movingElRect.top,
            ex: fixedElRect.left,
            ey: fixedElRect.top
        })
    }

    const back = () => {
        const movingElRect = getRect(elRef);
        setMovingLocation({
            sx: movingElRect.left,
            sy: movingElRect.top,
            ex: initPos!.sx,
            ey: initPos!.sy,
        })
    }

    const init = () => {
        const rect = getRect(elRef);
        setInitPos({sy:rect.top, sx:rect.left});
    }

    useEffect(() => {
        if (!movingLocation) return;
        if (elRef.current?.classList.contains('moving')) return;
        elRef.current?.classList.add('moving');
    }, [movingLocation])

    useEffect(() => {
        init();
    }, [])

    return (
        <section style={{padding:'20px'}}>
            <div style={{marginBottom:50, paddingBottom:50}}>
                <h3>Element.getBoundingClientRect</h3>
                <p>
                    엘리먼트의 위치 정보를 뷰포트 좌표 기준으로 반환, 뷰포트 좌표는 문서 전체를 기준으로 함<br />
                    엘리먼트의 좌표는 요소의 외부 상자(border 를 포함한 전체영역)를 기준으로 반환
                </p><br/>
                <h3>Element.getClientRect</h3>
                <p>
                    엘리먼트의 위치 정보를 클라이언트의 좌표 기준(현재 보고 있는 뷰포트 기준)으로 반환<br />
                    엘리먼트의 좌표는 요소의 내부 상자(padding 까지만, {`content < padding < margin < border`})를 기준으로 반환
                </p>
            </div>
            <div>
                <button
                    onClick={move}
                    style={{marginBottom:50, marginRight:10}}>move</button>
                <button onClick={back}>back</button>
                <Item
                    itemProps={movingLocation}
                    ref={elRef} />
            </div>
            <FixedElement ref={fixedElRef}/>
        </section>
    );
};

export default ClientRect;

const moving = (sx:number, sy:number, ex:number, ey:number) => keyframes`
  0% {
    top: ${sy}px;
    left: ${sx}px;
  }
  100% {
    top: ${ey}px;
    left: ${ex}px;
  }
`

const Item = styled.div`
  will-change: top, left;
  width: 102px;
  height: 102px;
  background-color: #000;
  
  &.moving {
    ${(props:{itemProps?:ItemProps}) => {
        if (props.itemProps) {
          return css`
            position: fixed;
            left: ${props.itemProps.ex}px;
            top: ${props.itemProps.ey}px;
            animation: ${moving(props.itemProps.sx, props.itemProps.sy, props.itemProps.ex, props.itemProps.ey)} 1s ease;
          `
        }
    }}
  }
`

const FixedElement = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  left: 50vw;
  top: 50vh;
  border: 2px solid #000;
`
