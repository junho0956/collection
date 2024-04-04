import { DefaultWrapper } from '../styles';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function Cookie() {
	return (
		<DefaultWrapper>
			<p>Cookie</p>
			<SyntaxHighlighter>
				{getCookieValue}
			</SyntaxHighlighter>
		</DefaultWrapper>
	)
}
const getCookieValue = `[쿠키값 반환]
const getCookieValue = (key:string) => {
	const result =
		document.cookie.split(';')
			.map(v => v.trim().split('='))
			.filter(v => v[0] === key);

	return result.length ? result[0][1] : undefined;
}`