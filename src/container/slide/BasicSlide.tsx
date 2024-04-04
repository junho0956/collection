import styled from "styled-components";
import Slider from "./Slider";
import {useState} from "react";
import {basicSliderData} from "../../common/db";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function BasicSlide() {

  const [option, setOption] = useState<BasicSliderOption>({
    arrow: false,
    pointer: true,
    auto: true,
    speed: 600,
  })

  return (
    <Wrapper>
      <div className="slider-options">
        <button onClick={() => setOption(state => ({...state, arrow: !state.arrow}))}>
          arrow {option.arrow ? "on" : "off"}
        </button>
        <button onClick={() => setOption(state => ({...state, pointer: !state.pointer}))}>
          pointer {option.pointer ? "on" : "off"}
        </button>
        <button onClick={() => setOption(state => ({...state, auto: !state.auto}))}>
          auto {option.auto ? "on" : "off"}
        </button>
        <button onClick={() => setOption(state => ({...state, speed: state.speed - 200 > 0 ? state.speed - 200 : 10}))}>
          speed +
        </button>
        <button onClick={() => setOption(state => ({...state, speed: state.speed + 200}))}>
          speed -
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