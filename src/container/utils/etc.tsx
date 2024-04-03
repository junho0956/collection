import { DefaultWrapper } from '../styles';

export default function ETC() {
	return (
		<DefaultWrapper>

		</DefaultWrapper>
	)
}

// export const blockScrollOfGlobal = (() => {
// 	const getDesktopNavTop = () => document.body.querySelector('.nav-top') as HTMLElement;
// 	const blockScroll = () => {
// 		const curWidth = document.body.offsetWidth;
// 		document.body.style.overflow = 'hidden';
// 		if(window.matchMedia(screen.desktop).matches) {
// 			const scrollWidth = document.body.offsetWidth - curWidth;
// 			document.body.style.paddingRight = `${scrollWidth}px`;
// 			getDesktopNavTop().style.paddingRight = `${scrollWidth}px`;
// 		}
// 	}
// 	const autoScroll = () => {
// 		document.body.style.overflow = 'auto';
// 		document.body.style.paddingRight = '0px';
// 		getDesktopNavTop().style.paddingRight = `0px`;
// 	}
// 	return {
// 		block: blockScroll,
// 		auto: autoScroll
// 	}
// })();

// export const copyInClipboard = (text:string) => {
// 	if (navigator.clipboard) {
// 		const type = 'text/plain';
// 		const blob = new Blob([text], {type});
// 		const data = [new ClipboardItem({ [type]:blob })];
// 		navigator.clipboard.write(data)
// 			.catch(err => {
// 				console.error('failed copy in clipboard')
// 			})
// 	}
// 	else {
// 		let input = document.createElement('input');
// 		input.setAttribute('value', text);
// 		document.body.appendChild(input);
// 		input.select();
// 		document.execCommand('copy');
// 		document.body.removeChild(input);
// 	}
// }

// export const transformToOrdinalNumber = (num:number) => {
// 	if (num <= 0) return;
//
// 	function getOrdinal(num:number) {
// 		if (num%10 === 1) return `${num}st`;
// 		if (num%10 === 2) return `${num}nd`;
// 		if (num%10 === 3) return `${num}rd`;
// 		return `${num}th`;
// 	}
//
// 	if (num <= 10 || num >= 21) {
// 		return getOrdinal(num);
// 	}
// 	if (num < 21) {
// 		return `${num}th`;
// 	}
// 	return '';
// }

// export const pointingNumber = (num?:number) => {
// 	if (num === 0) return 0;
// 	if (!num) return '';
//
// 	const isMinus = num < 0;
//
// 	let str:string|string[] = String(isMinus ? num * -1 : num);
// 	str = str.split('').reverse();
//
// 	let res = '';
// 	for(let i = 0; i < str.length; i++) {
// 		res += str[i];
// 		if ((i+1)%3 == 0 && i+1 < str.length) {
// 			res += ',';
// 		}
// 	}
//
// 	let result = res.split('').reverse().join('');
// 	if (isMinus) result = "-" + result;
// 	return result;
// }

// export const uid = ():number => {
// 	return Math.floor(Math.random()*100000);
// }

