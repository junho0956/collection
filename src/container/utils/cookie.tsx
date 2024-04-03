import { DefaultWrapper } from '../styles';

export default function Cookie() {
	return (
		<DefaultWrapper>
			Cookie
		</DefaultWrapper>
	)
}

// export const getCookieValue = (
// 	key:string,
// 	option?: {
// 		decrypt: boolean
// 	}
// ) => {
// 	const result =
// 		document.cookie.split(';')
// 			.map(v => v.trim().split('='))
// 			.filter(v => v[0] === key);
//
// 	if (option?.decrypt && result.length) {
// 		const key = process.env.NEXT_PUBLIC_SECRET_KEY;
// 		if (key) return decrypt(result[0][1], key);
// 		else return undefined;
// 	}
//
// 	return result.length ? result[0][1] : undefined;
// }