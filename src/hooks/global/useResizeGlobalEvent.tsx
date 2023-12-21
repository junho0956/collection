import {useEffect, useRef, useState} from "react";
import {debounce} from "../../common/utils";

export default function useResizeGlobalEvent() {
  const [isMobile, setIsMobile] = useState<boolean>();
  const resizeEventRef = useRef<any>(undefined);
  const orientEventRef = useRef<any>(undefined);

  const resizeEvent = () => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 1024) {
      setIsMobile(true);
    }
    else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    const eventDelay = 200; // 0.2s;
    resizeEventRef.current = debounce(resizeEvent, eventDelay);
    orientEventRef.current = debounce(resizeEvent, eventDelay);
    window.addEventListener('resize', resizeEventRef.current);
    window.addEventListener('orientationchange', orientEventRef.current);
    return () => {
      resizeEventRef.current && window.removeEventListener('resize', resizeEventRef.current);
      orientEventRef.current && window.removeEventListener('orientationchange', orientEventRef.current);
    }
  }, [])

  return isMobile;
}