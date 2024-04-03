import { DefaultWrapper } from '../styles';

export default function ReloadService() {

	return (
		<DefaultWrapper>

		</DefaultWrapper>
	)
}

/**
 * 서비스 리로드 (전역 팝업 등의 일부 데이터 동기화를 위함)
 * 1. 쿠키 사용이 불가능한 사용자 => 사이트 최초 방문 기준으로 상태값 유지 (리로드없음 = 1회성 검사)
 * 2. 쿠키 사용이 가능한 사용자
 *    => 새로고침
 *    => 사이트 최초 방문시에는 쿠키값 저장 (1시간 단위, 자정까지 남은 시간이 1시간 미만인 경우 자정까지 남은 시간을 기준으로 설정(이벤트(ex:출석체크)))
 *    => 사이트 포커스 트리거
 *      => 저장해둔 쿠키값이 없으면 새로고침
 *      => 저장해둔 쿠키값이 있으면 미체크
 *
 * 3. visibilitychange 의 브라우저 호환성문제로 focus, blur 를 사용
 */

// export default function useReloadApp() {
// 	const router = useRouter();
// 	const [reloadFlag, setReloadFlag] = useState(false);
//
// 	const getMaxAgeVisitCookie = () => {
// 		const standardTime = 60 * 10; // 10min;
// 		const remainMidNight = Math.floor(getRemainingTimeUntilNextDay()/1000);
// 		return Math.min(standardTime, remainMidNight);
// 	}
//
// 	const setVisitApp = useCallback(() => {
// 		document.cookie = `${LAST_VISITED}=true; path=/; max-age=${getMaxAgeVisitCookie()}`;
// 		setReloadFlag(true);
// 	}, []);
//
// 	const checkToReload = useCallback(() => {
// 		const lastVisitedCookie = getCookieValue(LAST_VISITED);
// 		if (!lastVisitedCookie && reloadFlag) {
// 			router.reload();
// 		}
// 	}, [reloadFlag]);
//
// 	useEffect(() => {
// 		if (typeof window === 'undefined') return;
// 		if (!window.navigator.cookieEnabled) return;
//
// 		window.addEventListener('focus', checkToReload);
// 		window.addEventListener('blur', setVisitApp);
// 		return () => {
// 			window.removeEventListener('focus', checkToReload);
// 			window.removeEventListener('blur', setVisitApp);
// 		}
// 	}, [checkToReload]);
// }