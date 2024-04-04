import { DefaultWrapper } from '../styles';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function DateUtils() {
	return (
		<DefaultWrapper>
			<p>Date</p>
			<SyntaxHighlighter>
				{getRemainingTimeUntilNextDay}
			</SyntaxHighlighter>
		</DefaultWrapper>
	)
}
const getRemainingTimeUntilNextDay = `[다음날까지 남은 시간 반환]
const getRemainingTimeUntilNextDay = () => {
	const h = new Date().getHours();
	const m = new Date().getMinutes();
	const s = new Date().getSeconds();

	const nextDay =
		(1000 * 60 * 60 * (23 - h)) +
		(1000 * 60 * (59 - m)) +
		(1000 * (59 - s))

	return nextDay;
}`