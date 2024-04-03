import {DefaultWrapper} from "../styles";

export default function Throttle() {
  return (
    <DefaultWrapper>
      throttle
    </DefaultWrapper>
  )
}

// export const throttle = (handler:(...arg:any[]) => void, timeout=300) => {
//   let calledTime:number;
//   let timer: NodeJS.Timer;
//   return function(this: any, ...args: any[]) {
//     if (!calledTime) {
//       handler.apply(this, args);
//       calledTime = Date.now();
//     }
//     else {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         if (Date.now() - calledTime >= timeout) {
//           handler.apply(this, args);
//           calledTime = Date.now();
//         }
//       }, Math.max(timeout - (Date.now() - calledTime), 0));
//     }
//   }
// }

// export const debounce = (cb:any, ms:number) => {
//   let timer:any = undefined;
//   return function (this:any, ...args:any) {
//     clearTimeout(timer);
//     timer = setTimeout(() => cb.apply(this, args), ms);
//   }
// }