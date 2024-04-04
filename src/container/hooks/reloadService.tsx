import { DefaultWrapper } from '../styles';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function ReloadService() {

	return (
		<DefaultWrapper>
			<p>서비스 리로드</p>
			<p>cookie 제한이 걸린 브라우저를 대상으로한 timer 형태의 hook 이 필요할 것 같음</p>
			<p>아래 hook은 cookie 값을 기반으로 함</p>
			<SyntaxHighlighter>
				{useReloadService}
			</SyntaxHighlighter>
		</DefaultWrapper>
	)
}

const useReloadService = `
export default function useReloadService() {
	const router = useRouter();
	const [reloadFlag, setReloadFlag] = useState(false);

	const getMaxAgeVisitCookie = () => {
		const standardTime = 60 * 10; // 10min;
		const remainMidNight = Math.floor(getRemainingTimeUntilNextDay()/1000);
		return Math.min(standardTime, remainMidNight);
	}

	const setVisitApp = useCallback(() => {
		document.cookie = \`\${LAST_VISITED}=true; path=/; max-age=\$\{getMaxAgeVisitCookie()}\`;
		setReloadFlag(true);
	}, []);

	const checkToReload = useCallback(() => {
		const lastVisitedCookie = getCookieValue(LAST_VISITED);
		if (!lastVisitedCookie && reloadFlag) {
			router.reload();
		}
	}, [reloadFlag]);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (!window.navigator.cookieEnabled) return;

		window.addEventListener('focus', checkToReload);
		window.addEventListener('blur', setVisitApp);
		return () => {
			window.removeEventListener('focus', checkToReload);
			window.removeEventListener('blur', setVisitApp);
		}
	}, [checkToReload]);
}`