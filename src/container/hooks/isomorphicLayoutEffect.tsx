import { DefaultWrapper } from '../styles';

export default function IsomorphicLayoutEffect() {
	return (
		<DefaultWrapper>

		</DefaultWrapper>
	)
}

// import { useEffect, useLayoutEffect } from 'react';
//
// const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
//
// export default useIsomorphicLayoutEffect;