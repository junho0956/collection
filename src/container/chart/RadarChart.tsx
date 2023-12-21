import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';
import {screens} from "../../common/media";

const RadarChart = () => {
  return (
    <Wrapper>
      <div>Used: react-chartjs-2</div>
      <div>Todo</div>
      <div>- D3.js 사용해보기</div>
      <RaderContainer>
        <Radar
          data={{
            labels: ['key1', 'key2', 'key3', 'key4', 'key5', 'key6'],
            datasets: [
              {
                label: '5',
                data: [9,7,5,9,8,7],
                backgroundColor: 'transparent',
                borderColor: 'black',
                borderWidth: 3,
                pointRadius: 0,
                order: 6
              },
              {
                label: '4',
                data: [2,2,2,2,2,2],
                backgroundColor: '#D4511B',
                pointRadius: 0,
                order: 1
              },
              {
                label: '3',
                data: [4,4,4,4,4,4],
                backgroundColor: '#E09D59',
                pointRadius: 0,
                order: 2
              },
              {
                label: '2',
                data: [6,6,6,6,6,6],
                backgroundColor: '#ECD178',
                pointRadius: 0,
                order: 3
              },
              {
                label: '1',
                data: [8,8,8,8,8,8],
                backgroundColor: '#C79E2A',
                pointRadius: 0,
                order: 4
              },
              {
                label: '0',
                data: [10,10,10,10,10,10],
                backgroundColor: '#FFD76F',
                pointRadius: 0,
                order: 5
              },
            ],
          }}
          options={{

            tooltips: {
              enabled: false
            },
            legend: {
              display: false,
            },
            scale: {
              pointLabels: {
                fontSize: 16,
                fontColor: 'red',
              },
              ticks: {
                stepSize: 2,
                min: 0,
                max: 10,
                display: false,
              },
            },
          }}
        />
      </RaderContainer>
    </Wrapper>
  );
};

export default RadarChart;

const Wrapper = styled.section`
  padding: 20px;
`
const RaderContainer = styled.div`
  @media ${screens.desktop} {
    width: 1000px;
  }
  @media ${screens.mobile} {
    width: 100%;
  }
`
