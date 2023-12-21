import {useCallback, useEffect, useRef} from "react";
import useResizeGlobalEvent from "./useResizeGlobalEvent";
import {debounce} from "../../common/utils";

export default function useMouseGlobalEvent(cb:any) {
  const isMobile = useResizeGlobalEvent();
  const eventRef = useRef<any>(undefined);

  const mouseMoveEvent = useCallback((e:MouseEvent) => {
    if (!isMobile) {
      cb(e);
    }
  }, [isMobile, cb]);

  useEffect(() => {
    const delay = 30;
    eventRef.current = debounce(mouseMoveEvent, delay);
    window.addEventListener('mousemove', eventRef.current);
    return () => {
      window.removeEventListener('mousemove', eventRef.current);
    }
  }, [isMobile, cb]);
}