export const debounce = (cb:any, delay:number) => {
  let timer:NodeJS.Timer|undefined;
  return function(this:any, ...args:any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, args), delay);
  }
}

/**
 * return hex type color
 */
export const getRandomColor = ():string => {
  let result = "#";
  for (let i = 0; i < 6; i++) result += Math.floor(Math.random() * 9) + 1;

  return result;
}