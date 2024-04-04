import { DefaultWrapper } from '../styles';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function ETC() {
	return (
		<DefaultWrapper>
			<p>이것저것</p>
			<SyntaxHighlighter>
				{blockScrollOfGlobal}
			</SyntaxHighlighter>
			<SyntaxHighlighter>
				{clipboard}
			</SyntaxHighlighter>
			<SyntaxHighlighter>
				{formatNumberWithCommas}
			</SyntaxHighlighter>
		</DefaultWrapper>
	)
}

const blockScrollOfGlobal = `[scroll block, 모달을 띄우거나 모바일 네비게이션을 띄울 때 사용]
const mediaScreen = {
	desktop: '(min-width:1024px)',
	mobile: '(max-width:1024px)'
}

const blockScrollOfGlobal = () => {
	// mediaScreen desktop 기준 '상단' 네비게이션이 있는 경우
	const getDesktopNav = () => document.body.querySelector('nav') as HTMLElement;

	const block = () => {
		const curWidth = document.body.offsetWidth;
		document.body.style.overflow = 'hidden';
		if(window.matchMedia(mediaScreen.desktop).matches) {
			const scrollWidth = (document.body.offsetWidth - curWidth) + 'px';
			document.body.style.paddingRight = scrollWidth;
			getDesktopNav().style.paddingRight = scrollWidth;
		}
	}
	const auto = () => {
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = '0px';
		getDesktopNav().style.paddingRight = '0px';
	}
	return { block, auto }
}`

const clipboard = `[클립보드(복사)]
const copyInClipboard = (text:string) => {
	if (navigator.clipboard) {
		const type = 'text/plain';
		const blob = new Blob([text], {type});
		const data = [new ClipboardItem({ [type]:blob })];
		navigator.clipboard.write(data)
			.catch(err => {
				console.error('failed copy in clipboard')
			})
	}
	else {
		let input = document.createElement('input');
		input.setAttribute('value', text);
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
	}
}`

const formatNumberWithCommas = `[숫자에 콤마 추가]
const formatNumberWithCommas = (num?:number) => {
	if (num === 0) return 0;
	if (!num) return '';

	const isMinus = num < 0;
	let str:string|string[] = String(isMinus ? num * -1 : num);
	str = str.split('').reverse();

	let res = '';
	for(let i = 0; i < str.length; i++) {
		res += str[i];
		if ((i+1)%3 == 0 && i+1 < str.length) {
			res += ',';
		}
	}

	let result = res.split('').reverse().join('');
	if (isMinus) result = "-" + result;
	return result;
}`

export const uid = ():number => {
	return Math.floor(Math.random()*100000);
}