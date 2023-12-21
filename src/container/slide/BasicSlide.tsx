import styled from "styled-components";
import Slider from "./Slider";
import {useState} from "react";
import {basicSliderData} from "../../common/db";

export default function BasicSlide() {

  const [option, setOption] = useState<BasicSliderOption>({
    arrow: false,
    pointer: true,
    auto: true,
    speed: 600,
  })

  return (
    <Wrapper>
      <p>
        Used: javascript
      </p>

      <div className="slider-options">
        <button onClick={() => setOption(state => ({...state, arrow: !state.arrow}))}>
          arrow {option.arrow ? "off" : "on"}
        </button>
        <button onClick={() => setOption(state => ({...state, pointer: !state.pointer}))}>
          pointer {option.pointer ? "off" : "on"}
        </button>
        <button onClick={() => setOption(state => ({...state, auto: !state.auto}))}>
          auto {option.auto ? "off" : "on"}
        </button>
        <button onClick={() => setOption(state => ({...state, speed: state.speed - 200 > 0 ? state.speed - 200 : 10}))}>
          speed up
        </button>
        <button onClick={() => setOption(state => ({...state, speed: state.speed + 200}))}>
          speed down
        </button>
      </div>

      <div className="slider-basic">
        <Slider option={option} data={basicSliderData} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 20px;
  &>.slider-options {
    margin-top: 20px;
    margin-bottom: 20px;
    * {
      margin-right: 10px;
    }
  }
  &>.slider-basic {
    width: 100%;
    height: 400px;
  }
`