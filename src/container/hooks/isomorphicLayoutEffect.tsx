import { DefaultWrapper } from '../styles';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export default function IsomorphicLayoutEffect() {
	return (
		<DefaultWrapper>
			<a href="https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85" target="_blank">
				https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
			</a><br/>
			<p>[참고]Next.JS 서버사이드에서는 layoutEffect 가 동작하지 않는다.</p>
			<SyntaxHighlighter>
				{isomorphicLayoutEffect}
			</SyntaxHighlighter>
		</DefaultWrapper>
	)
}

const isomorphicLayoutEffect = `
import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;`