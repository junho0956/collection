import Chart from 'chart.js';
import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import useLineChartCustomScroll from 'src/hooks/useLineChartCustomScroll';
import {screens} from "../../common/media";

const makeDummyData = () => {
  return Array(Math.floor(Math.random()*38+1)).fill(true).map(() => Math.floor(Math.random()*1000+1));
}
const makeDummyLabelData = () => {
  return Array(38).fill(true).map((_, idx) => {
    return {
      round: `${idx + 1}`,
      date: '12/7'
    }
  })
} 

const LineChart = () => {

  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const chartData = useMemo(() => makeDummyData(), []);
  const labelData = useMemo(() => makeDummyLabelData(), []);

  useLineChartCustomScroll(chartWrapperRef);

  const [minValue, maxValue] = useMemo(() => {
    let min = Math.min(...chartData);
    let max = Math.max(...chartData);
    min = Math.min(1, min - 50); // 고등수일때 캔버스 안으로 안정적으로 보여줌
    max += max / 3;
    return [min, max];
  }, [])

  useEffect(() => {
    if (!chartWrapperRef.current) return;
    // document.body.style.background = '#000B33';

    const wrapper = chartWrapperRef.current
    const canvas = wrapper.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
    requestAnimationFrame(() => {
      new Chart(canvas, {
        type: 'line',
        data: {
          datasets: [
            {
              data: chartData,
              backgroundColor: (() => {
                const ctx = canvas.getContext('2d');
                // x1 을 이용해서 deg 를 표현, 이때 y1은 2배 (수직표현을 사용할 때 이렇게 해야함)
                const gradient = (ctx as CanvasRenderingContext2D).createLinearGradient(0, 0, 0, 258*2);
                gradient.addColorStop(0, 'rgba(16, 78, 213, 0.5)');
                gradient.addColorStop(1, 'rgba(16, 78, 213, 0)');
                return gradient;
              })(),
              borderColor: (() => {
                const ctx = canvas.getContext('2d');
                const gradient = (ctx as CanvasRenderingContext2D).createLinearGradient(0, 0, 38*125, 258);
                gradient.addColorStop(0.071, '#66A3FF');
                gradient.addColorStop(0.8434, '#104ED5');
                return gradient;
              })(),
              borderWidth: 3,
              pointBorderWidth: 0,
              pointBorderColor: '#FFF',
              pointBackgroundColor: '#FFF',
            }
          ],
          labels: labelData.map(label => label.round),
        },
        options:{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000,
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                gridLines:{color:'rgba(64, 79, 111, 0.3)'},
                ticks: {
                  fontColor: '#FFF',
                  fontSize: 18,
                  padding: 5,
                  fontStyle: '700'
                },
              }
            ],
            yAxes: [
              {
                display: false, // display 가 false 여도 ticks 속성들은 적용됨
                ticks: {
                  beginAtZero: true,
                  reverse: true, // 랭킹같은 역순 그래프
                  max: maxValue,
                  min: minValue
                }
              }
            ]
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            titleFontSize: 22,
            bodyFontSize: 0,
            caretPadding: 2,
            bodyFontColor: '#FFF',
            backgroundColor: 'transparent',
            bodyAlign: 'left',
            displayColors: false,
            callbacks: {
              title(item, data) {
                if (!item.length) return '';
                return item[0].value + '';
              },
            },
          },
        },
      })

    });

    return () => {
      document.body.style.background = 'inherit';
    }
  }, [])

  return (
    <Container>
      <div>스타일링한 Line 차트</div>
      <div>Used: Chart.js</div>
      <div>Todo</div>
      <div>- D3.js 사용해보기</div>
      <div className="chart">
        <div className="background" />
        <Wrapper ref={chartWrapperRef}>
          <span>legend</span>
          <ChartWrapper>
            <canvas id="chart" height="258" width={38 * 125}></canvas>
          </ChartWrapper>
        </Wrapper>
      </div>
    </Container>
  );
};

export default LineChart;

const Container = styled.section`
  padding: 20px;
  &>.chart {
    position: relative;
    width: 1200px;
    .background {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: radial-gradient(50% 87.67% at 50% 48.8%, #021351 62.5%, #00226C 77.6%, #321FAB 100%);
    }
  }
  
  @media ${screens.desktop} {
    &>.chart {
      //width: 1200px;
    }
  }
  @media ${screens.mobile} {
    &>.chart {
      //width: 100%;
    }
  }
`

const Wrapper = styled.div`
  position: relative;
  height: 258px;
  //width: 1200px;
  overflow-x: auto;
  overflow-y: hidden;

  &>:first-child {
    font-size: 12px;
    line-height: 17px;
    color: #828EA8;
    position: absolute;
    top: 12px;
    left: 20px;
  }

  &::-webkit-scrollbar {
    background: #223559;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #B4BDD2;
  }
`

const ChartWrapper = styled.div`
  position: relative;
  width: calc(38 * 125px);
  height: 258px;
`