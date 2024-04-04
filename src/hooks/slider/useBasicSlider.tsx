import {useEffect, useMemo, useRef, useState} from "react";

type Props = {
  data: SliderData[];
  option: BasicSliderOption;
}

export default function useBasicSlider({data, option}:Props) {
  const [seq, setSeq] = useState(1);
  const sliderWrapperRef = useRef<HTMLUListElement>(null);
  const autoSlideTimer = useRef<NodeJS.Timer>();
  const sliderData = useMemo(() => {
    return [data[data.length-1], ...data, data[0]];
  }, [data]);

  const canSlide = ():boolean => {
    if (!sliderWrapperRef.current) return false;
    return !(sliderWrapperRef.current.classList.contains('ing'));
  }
  const slideWithSeq = (seq:number) => {
    sliderWrapperRef.current!.classList.add('ing');

    if (seq === sliderData.length - 1) sliderWrapperRef.current!.addEventListener('transitionend', transitionEndWithLastSeq);
    else if (seq === 0) sliderWrapperRef.current!.addEventListener('transitionend', transitionEndWithFirstSeq);
    else sliderWrapperRef.current!.addEventListener('transitionend', transitionEnd);

    if (option.speed) sliderWrapperRef.current!.style.transition = `all ${option.speed * 0.001}s ease`;
    else sliderWrapperRef.current!.style.transition = `all 0.4s ease`;

    const itemWidth = (sliderWrapperRef.current!.querySelector('.slider-item') as HTMLElement).clientWidth;
    sliderWrapperRef.current!.style.transform = `translateX(${-seq * itemWidth}px)`;
  }
  const transitionEndWithFirstSeq = () => {
    if (!sliderWrapperRef.current) return;
    sliderWrapperRef.current.removeEventListener('transitionend', transitionEndWithFirstSeq);
    setSeq(sliderData.length-2);
    const itemWidth = sliderWrapperRef.current.querySelector('.slider-item')!.clientWidth;
    sliderWrapperRef.current.style.transition = ``;
    sliderWrapperRef.current.style.transform = `translateX(${-(sliderData.length-2) * itemWidth}px)`;
    sliderWrapperRef.current.classList.remove('ing');
  }
  const transitionEndWithLastSeq = () => {
    if (!sliderWrapperRef.current) return;
    sliderWrapperRef.current.removeEventListener('transitionend', transitionEndWithLastSeq);
    setSeq(1);
    const itemWidth = sliderWrapperRef.current.querySelector('.slider-item')!.clientWidth;
    sliderWrapperRef.current.style.transition = ``;
    sliderWrapperRef.current.style.transform = `translateX(${-1 * itemWidth}px)`;
    sliderWrapperRef.current.classList.remove('ing');
  }
  const transitionEnd = () => {
    if (!sliderWrapperRef.current) return;
    sliderWrapperRef.current.removeEventListener('transitionend', transitionEnd);
    sliderWrapperRef.current.classList.remove('ing');
  }
  const initSliderWrapperSize = () => {
    if (!sliderWrapperRef.current) return;
    sliderWrapperRef.current.style.width = `calc(${sliderData.length} * 100%)`;
    const itemWidth = (sliderWrapperRef.current.querySelector('.slider-item') as HTMLElement).clientWidth;
    sliderWrapperRef.current.style.transform = `translateX(${-seq * itemWidth}px)`;
  }
  const runSlide = (dir:'prev'|'next') => {
    if (!canSlide()) return;
    let nextSeq = 0;
    if (dir === 'prev') nextSeq = seq-1 < 0 ? sliderData.length-1 : seq-1;
    if (dir === 'next') nextSeq = (seq+1) % sliderData.length;
    slideWithSeq(nextSeq);
    setSeq(nextSeq);
  }
  const setAutoSlide = (on:boolean) => {
    autoSlideTimer.current && clearTimeout(autoSlideTimer.current);
    if (on) {
      autoSlideTimer.current = setTimeout(() => runSlide('next'), 3000);
    }
  }

  useEffect(() => {
    setAutoSlide(option.auto);
    return () => setAutoSlide(false);
  }, [option.auto, seq]);

  return {
    sliderData,
    seq,
    sliderWrapperRef,
    initSliderWrapperSize,
    runSlide
  }
}