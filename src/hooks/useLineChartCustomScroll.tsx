import { useCallback, useEffect, useRef } from "react";

export default function useLineChartCustomScroll(ref:React.RefObject<HTMLDivElement>) {

  const isMoving = useRef<boolean>(false);
  const x = useRef<number>(0);
  const scrollX = useRef<number>(0);

  const mouseLeave = useCallback(() => {
    isMoving.current = false;
  }, [])

  const mouseDown = useCallback((e:MouseEvent) => {
    isMoving.current = true;
    x.current = e.clientX;
    scrollX.current = ref.current?.scrollLeft ?? 0;
  }, [])

  const mouseMove = useCallback((e:MouseEvent) => {
    if (isMoving.current) {
      const moving = e.clientX - x.current;
      ref.current?.scrollTo(-1 * moving + scrollX.current, 0);
    }
  }, [])

  const mouseUp = useCallback((e:MouseEvent) => {
    isMoving.current = false;
  }, [])

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener('mousedown', mouseDown);
    ref.current.addEventListener('mousemove', mouseMove);
    ref.current.addEventListener('mouseup', mouseUp);
    ref.current.addEventListener('mouseleave', mouseLeave);

    return () => {
      if (!ref.current) return;
      
      ref.current.removeEventListener('mousedown', mouseDown);
      ref.current.removeEventListener('mousemove', mouseMove);
      ref.current.removeEventListener('mouseup', mouseUp);
      ref.current.removeEventListener('mouseleave', mouseLeave);
    }
  }, [ref])
}