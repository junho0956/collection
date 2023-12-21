import styled from "styled-components";
import { useMemo, useState, useLayoutEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import useBasicSlider from "../../hooks/slider/useBasicSlider";

type Props = {
  data: SliderData[];
  option: BasicSliderOption;
}

export default function Slider({data, option}:Props) {
  const {
    sliderData,
    seq,
    sliderWrapperRef,
    initSliderWrapperSize,
    runSlide,
  } = useBasicSlider({data, option});

  useLayoutEffect(() => {
    initSliderWrapperSize();
  }, [sliderData, option]);

  return (
    <SliderContainer>
      <ul className="slider-wrapper" ref={sliderWrapperRef}>
        {sliderData.map((i, idx) => (
          <li key={`${i.id}-${idx}`} style={{backgroundColor:i.color}} className="slider-item">{i.text}</li>
        ))}
      </ul>
      {option.arrow && (
        <>
          <div className="arrow left" onClick={() => runSlide('prev')}><IoIosArrowBack /></div>
          <div className="arrow right" onClick={() => runSlide('next')} ><IoIosArrowForward /></div>
        </>
      )}
      {option.pointer && (
        <div className="pointers">
          {Array(sliderData.length-2).fill(true).map((_, idx) => (
            <div key={idx} className={`pointer ${seq === idx+1 && "current"}`} />
          ))}
        </div>
      )}
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  &>.slider-wrapper {
    position: relative;
    display: flex;
    height: 100%;
    
    &>.slider-item {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 40px;
      font-weight: 700;
      text-align: center;
      line-height: 400px;
      user-select: none;
    }
  }
  &>.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    svg {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
  }
  &>.pointers {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    column-gap: 10px;
    
    &>.pointer {
      transition: all 0.5s;
      background-color: lightblue;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
    &>.pointer.current {
      background-color: deepskyblue;
      transform: scale(1.3);
    }
  }
`