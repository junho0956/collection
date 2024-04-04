import {DefaultWrapper} from "../styles";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function Defer() {
  return (
    <DefaultWrapper>
      <p>Defer event</p>
      <SyntaxHighlighter>
        {throttle}
      </SyntaxHighlighter>
      <SyntaxHighlighter>
        {debounce}
      </SyntaxHighlighter>
    </DefaultWrapper>
  )
}

const throttle = `[throttle]
const throttle = (handler:(...arg:any[]) => void, timeout=300) => {
  let calledTime:number;
  let timer: NodeJS.Timer;
  return function(this: any, ...args: any[]) {
    if (!calledTime) {
      handler.apply(this, args);
      calledTime = Date.now();
    }
    else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - calledTime >= timeout) {
          handler.apply(this, args);
          calledTime = Date.now();
        }
      }, Math.max(timeout - (Date.now() - calledTime), 0));
    }
  }
}`

const debounce = `[debounce]
const debounce = (cb:any, ms:number) => {
  let timer:any = undefined;
  return function (this:any, ...args:any) {
    clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, args), ms);
  }
}`