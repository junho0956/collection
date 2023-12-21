import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ChartInfo {
  min: number;
  max: number;
}

interface Props {
  props?: {
    width?: number;
    height?: number;
  }
}

const ChartCustom = ({props}:Props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coordinate, setCoordinate] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })
  const [chartStyle, _] = useState({
    width: props?.width ?? 300,
    height: props?.height ?? 300
  })
  const [chartInfo, setChartInfo] = useState<ChartInfo>();

  /**
   * canvas 는 기본적으로 width 300, height 150 을 가짐
   * css 크기를 초기 캔버스의 비율을 고려하지 않아 왜곡되는 경우 명시적으로 지정해줄 수 있음
   * 
   * img 태그처럼 margin, border, background 와 같은 스타일링이 가능하지만 실제 canvas 에는 영향을 주지 않음
   * 
   * canvas 를 지원하지 않는 브라우저의 경우 대체 콘텐츠를 제공할 수 있음
   * <canvas><img ..></canvas>
   * 
   * canvas 는 고정 크기의 드로잉 영역을 생성하고 하나 이상의 '렌더링 컨텍스(rendering contexts)'를 노출하여 출력할 컨텐츠를 생성하고 다루게됨
   * canvas 요소는 getContext() 메서드를 이용해서 렌더링 컨텍스트와 그리기 함수를 사용할 수 있음
   * getContext() 는 렌더링 컨텍스트 타입을 지정하는 파라미터를 가짐
   * 2D 그래픽의 경우, CanvasRenderingContext2D 를 얻기 위해 '2d' 로 표현함
   */

  /**
   * 기본적으로 그리드의 1단위는 캔버스의 1px과 같음
   * 모든 요소들은 그리드의 원점인 좌측상단 (0, 0) 에서 시작
   * 기본적으로 제공되는 직사각형은 fillRect, strokeRect, clearRect 를 통해 그릴 수 있음
   * 나머지 도형들은 path 를 이용해서 그려야함
   * path 를 사용하는 도형은 점들의 집합인 경로로 이루어지며 그 경로들을 연결하여 도형을 그림
   * 
   * 1. 경로 생성
   * beginPath(), 경로를 생성, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용
   * 2. 그리기 명령어
   * closePath(), 현재 하위 경로의 시작부분과 연결된 직선을 추가함 
   * stroke(), 윤곽선을 사용하여 도형을 그림
   * fill(), 경로의 내부를 채워서 도형을 그림, fill 를 호출시 열린 도형은 자동으로 닫히게 되므로 closePath 를 사용하지 않아도됨
   * moveTo(x, y), 펜을 x, y의 지정된 좌표로 옮김
   * beginPath 를 통해 경로가 열리면, 반드시 다음 메소드는 시작 위치를 설정하는 moveTo 를 사용
   * lineTo(x, y), 현재 드로윙 위치에서 x, y 의 지정된 위치까지 선을 그림
   * arc(x, y, radius, startAngle, endAngle, anticlockwise), (x,y)에 원점을 두고 반지름은 radius 를 가지며 startAngle 에서 시작해서 endAngle 로 끝나는 anticlockwise(default:시계) 방향의 원을 그림
   * fillText("text", x, y [, max-width])
   * font = "weight size family"
   */

  function makeDefaultRadar(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    const cWidth = canvas.clientWidth;
    const cHeight = canvas.clientHeight;

    const gradient = ctx.createConicGradient(Math.PI * 1.5, cWidth*0.5, cHeight*0.5);
    gradient.addColorStop(0, 'rgba(255, 105, 177, 0.5)');
    gradient.addColorStop(1, 'rgba(232, 26, 75, 0.5)');

    ctx.beginPath();
    ctx.moveTo(cWidth*0.5, cHeight*0.15);
    ctx.lineTo(cWidth*0.2, cHeight*0.35);
    ctx.lineTo(cWidth*0.2, cHeight*0.65);
    ctx.lineTo(cWidth*0.5, cHeight*0.85);
    ctx.lineTo(cWidth*0.8, cHeight*0.65);
    ctx.lineTo(cWidth*0.8, cHeight*0.35);
    ctx.fillStyle = gradient;

    ctx.fill();

    // draw border
    
    const borderGradient = ctx.createLinearGradient(0, 0, cWidth, cHeight);
    borderGradient.addColorStop(0.2, '#E81A4B');
    borderGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(cWidth*0.5, cHeight*0.15);
    ctx.lineTo(cWidth*0.2, cHeight*0.35);
    ctx.lineTo(cWidth*0.2, cHeight*0.65);
    ctx.lineTo(cWidth*0.5, cHeight*0.85);
    ctx.lineTo(cWidth*0.8, cHeight*0.65);
    ctx.lineTo(cWidth*0.8, cHeight*0.35);

    ctx.lineWidth = 1.5;
    ctx.closePath();
    ctx.strokeStyle = borderGradient;
    ctx.stroke();
  }
  
  function calculatePosition(idx:number, value:number, center:[number, number]):[number, number] {
    const [cx, cy] = center;
    const { min, max } = chartInfo as ChartInfo;
    const perValue = value / (max - min);

    switch(idx) {
      case 0: {
        const vy = cy * 2 * 0.15;
        const dx = cx;
        const dy = cy - ((cy - vy) * perValue);
        return [dx, dy];
      }
      case 1: {
        const vx = cx * 2 * 0.2;
        const vy = cy * 2 * 0.35;
        const dx = cx - ((cx - vx) * perValue);
        const dy = cy - ((cy - vy) * perValue);
        return [dx, dy];
      }
      case 2: {
        const vx = cx * 2 * 0.2;
        const vy = cy * 2 * 0.65;
        const dx = cx - ((cx - vx) * perValue);
        const dy = cy + ((vy - cy) * perValue);
        return [dx, dy];
      }
      case 3: {
        const vx = cx;
        const vy = cy * 2 * 0.85;
        const dx = vx;
        const dy = cy + ((vy - cy) * perValue);
        return [dx, dy];
      }
      case 4: {
        const vx = cx * 2 * 0.8;
        const vy = cy * 2 * 0.65;
        const dx = cx + ((vx - cx) * perValue);
        const dy = cy + ((vy - cy) * perValue);
        return [dx, dy];
      }
      case 5: {
        const vx = cx * 2 * 0.8;
        const vy = cy * 2 * 0.35;
        const dx = cx + ((vx - cx) * perValue);
        const dy = cy - ((cy - vy) * perValue);
        return [dx, dy];
      }
      default: 
        return [cx, cy];
    }
  }

  function makeValueRadar(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    const center:[number, number] = [canvas.clientWidth*0.5, canvas.clientHeight*0.5];

    // draw radar

    const RadarGradient = ctx.createConicGradient(Math.PI * 1.5, canvas.clientWidth*0.5, canvas.clientHeight*0.5);
    RadarGradient.addColorStop(0, '#FF69B1');
    RadarGradient.addColorStop(1, '#E73862');

    const chartData = [
      {key:'key1', value:4},
      {key:'key2', value:2.8,},
      {key:'key3', value:3.6},
      {key:'key4', value:3.2},
      {key:'key5', value:4.2},
      {key:'key6', value:1.2},
    ]

    ctx.beginPath();
    const [x, y] = calculatePosition(0, chartData[0].value, center);
    ctx.moveTo(x, y);

    for (let i = 1; i < chartData.length; i++) {
      const [x, y] = calculatePosition(i, chartData[i].value, center);
      ctx.lineTo(x, y);
    }

    ctx.fillStyle = RadarGradient;
    ctx.fill();


    // draw border

    const borderGradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
    borderGradient.addColorStop(0.1321, '#FFF');
    borderGradient.addColorStop(0.8133, 'rgba(255, 255, 255, 0)');

    const [dx, dy] = calculatePosition(0, chartData[0].value, center);
    ctx.moveTo(dx, dy);

    for (let i = 1; i < chartData.length; i++) {
      const [dx, dy] = calculatePosition(i, chartData[i].value, center);
      ctx.lineTo(dx, dy);
    }

    ctx.strokeStyle = borderGradient;
    ctx.closePath();
    ctx.stroke();

    // draw point
    const [px, py] = calculatePosition(0, chartData[0].value, center);

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, 3, 0, Math.PI * 2, true);

    for (let i = 1; i < chartData.length; i++) {
      const [px, py] = calculatePosition(i, chartData[i].value, center);
      ctx.moveTo(px, py);
      ctx.arc(px, py, 3, 0, Math.PI * 2, true);
    }

    ctx.rotate(0);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // draw text
    let [tx, ty] = [0, 0];
    let cWidth = canvas.clientWidth;
    let cHeight = canvas.clientHeight;
    
    ctx.beginPath();
    ctx.fillStyle = 'rgba(254, 94, 148, 1)';
    ctx.font = '700 13px NanumSquareNeoBold';

    ctx.textAlign = 'center';
    ctx.fillText(chartData[0].key, cWidth*0.5, cHeight*0.15 - 10, cWidth*0.2 - 10);
    ctx.textAlign = 'right';
    ctx.fillText(chartData[1].key, cWidth*0.2 - 10, cHeight*0.35, cWidth*0.2 - 10);
    ctx.textAlign = 'right';
    ctx.fillText(chartData[2].key.slice(0, 3), cWidth*0.2 - 10, cHeight*0.65, cWidth*0.20 - 10);
    ctx.fillText(chartData[2].key.slice(4), cWidth*0.2 - 10, cHeight*0.7, cWidth*0.20 - 10);
    ctx.textAlign = 'center';
    ctx.fillText(chartData[3].key, cWidth*0.5, cHeight*0.85 + 20, cWidth*0.2 - 10);
    ctx.textAlign = 'left';
    ctx.fillText(chartData[4].key.slice(0, 3), cWidth*0.8 + 10, cHeight*0.65, cWidth*0.2 - 10);
    ctx.fillText(chartData[4].key.slice(4), cWidth*0.8 + 10, cHeight*0.7, cWidth*0.2 - 10);
    ctx.textAlign = 'left';
    ctx.fillText(chartData[5].key, cWidth*0.8 + 10, cHeight*0.35, cWidth*0.2 - 10);

    ctx.closePath();
  }

  useEffect(() => {
    if (!chartInfo) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; // CanvasRenderingContext2D, 드로잉 컨텍스트에 접근

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(chartStyle.width, 0);
    ctx.lineTo(chartStyle.width, chartStyle.height);
    ctx.lineTo(0, chartStyle.height);
    ctx.fillStyle = '#000';
    ctx.fill();

    makeDefaultRadar(ctx, canvas);
    makeValueRadar(ctx, canvas);
  }, [chartInfo])

  useEffect(() => {
    setChartInfo({
      min: 0,
      max: 5,
    })
  }, [])

  return (
    <Container>
      <div>직접 레이더 차트 그리기</div>
      <div>Used: javascript, canvas</div>
      <div>Todo</div>
      <div>- 코드 정리</div>
      <canvas
      ref={canvasRef}
      width={chartStyle.width}
      height={chartStyle.height}>
      </canvas>
    </Container>
  );
};

export default ChartCustom;

const Container = styled.section`
  padding: 20px;
  canvas {
    border: 1px solid #000;
    opacity: 1;
  }
`
