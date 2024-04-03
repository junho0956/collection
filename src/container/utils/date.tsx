import { DefaultWrapper } from '../styles';

export default function Date() {
	return (
		<DefaultWrapper>
			Date
		</DefaultWrapper>
	)
}

// export const getRemainingTimeUntilNextDay = () => {
// 	const currentHour = new Date().getHours();
// 	const currentMinutes = new Date().getMinutes();
// 	const currentSeconds = new Date().getSeconds();
//
// 	const nextDay =
// 		(1000 * 60 * 60 * (23 - currentHour)) +
// 		(1000 * 60 * (59 - currentMinutes)) +
// 		(1000 * (59 - currentSeconds))
//
// 	return nextDay;
// }

// /**
//  * 현재 시각을 기준으로 다음 시각을 반환
//  */
// export const getNextHourDate = (time:Date):Date => {
// 	return new Date(
// 		time.getTime() -
// 		time.getMinutes()*60*1000 -
// 		time.getSeconds()*1000 +
// 		1000*60*60
// 	);
// }