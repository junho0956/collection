import styled from "styled-components";
import {images} from "../../common/images";
import {useEffect, useRef} from "react";

const Card = ({img}:{img:string}) => {
  return (
    <CardStyle className="card">
      <img src={img} alt="" draggable={false} />
      <div className="light" />
    </CardStyle>
  )
}

export default function CardPerspective() {
  const imgs:string[] = [images.lol, images.lol2, images.lol3];
  const ref = useRef<HTMLDivElement>(null);

  const mousemove = (e:MouseEvent) => {
    if (!ref.current) return;
    const x = e.offsetX, y = e.offsetY;
    /**
     * rotateY() 의 deg 를 음수를 주는 경우 오른쪽이 올라오는 형태
     * rotateX() 의 deg 를 음수를 주는 경우 아래쪽이 올라오는 형태
     */
    const rotateY = (-4 / 30) * x + 20;
    const rotateX = (2 / 25) * y - 20;
    (e.currentTarget as HTMLElement).style.transform = `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    const light = (e.currentTarget as HTMLElement).querySelector('.light');
    if (light) {
      (light as HTMLElement).style.top = `${y}px`;
      (light as HTMLElement).style.left = `${x}px`;
    }
  }

  const init = (e:MouseEvent) => {
    if (!ref.current) return;
    (e.currentTarget as HTMLElement).style.transform = 'none';
    ((e.currentTarget as HTMLElement).querySelector('.light') as HTMLElement).style.top = `calc(50% - 50px)`;
    ((e.currentTarget as HTMLElement).querySelector('.light') as HTMLElement).style.left = `calc(50% - 50px)`;
  }

  const addEvent = () => {
    if (!ref.current) return;
    Array.from(ref.current.children).forEach(card => {
      (card as HTMLElement).addEventListener('mousemove', mousemove);
      (card as HTMLElement).addEventListener('mouseleave', init);
    })
  }

  const removeEvent = () => {
    if (!ref.current) return;
    Array.from(ref.current.children).forEach(card => {
      (card as HTMLElement).removeEventListener('mousemove', mousemove);
      (card as HTMLElement).removeEventListener('mouseleave', init);
    })
  }

  useEffect(() => {
    addEvent();
    return () => removeEvent();
  }, []);

  return (
    <Wrapper style={{padding:'20px'}} ref={ref}>
      {imgs.map(img => (
        <Card key={img} img={img} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  & img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CardStyle = styled.div`
  position: relative;
  width: 300px;
  height: 500px;
  overflow: hidden;

  &>.light {
    position: absolute;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.7);
    filter: blur(45px);
    border-radius: 50%;
    top: 50%;
    left: 50%;
  }
`