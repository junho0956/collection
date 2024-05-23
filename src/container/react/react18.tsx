import {DefaultWrapper} from "../styles";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import styled from "styled-components";

export default function React18() {
  return (
    <DefaultWrapper>
      <h1>React18 간단하게 정리</h1>
      <Section>
        <h2>Transition</h2>
        <p>Transition, 즉 전환과 관련된 업데이트가 중점적으로 이루어짐</p>
        <ul>
          <li>- Fiber Architecture</li>
          <li>- New Hooks</li>
        </ul>

        <article>
          <h3>Fiber Architecture</h3>
          <p>Fiber 구조는 React16 에서 상태관리 및 UX 의 Transition 성능을 개선하기 위해 도입된 React 의 핵심 아키텍처</p>
          <p>React15 까지는 VirtualDOM 을 활용해서 조정 알고리즘을 진행 후 변경사항에 해당하는 노드들을 한번에 전환하는 방식</p>
          <p>모든 업데이트가 '동일한' 우선순위로 처리되기 때문에 컴포넌트의 규모가 커질수록 성능 저하 및 인터페이스의 블로킹을 유발함</p>
          <p>위 문제를 해결하기 위해 React16에서 Fiber 아키텍처를 도입</p>
          <ul>
            <li>
              <div>재조정 알고리즘의 변화</div>
              <p>상태관리(작업)에 우선순위를 부여, 우선순위에 따른 조정 알고리즘을 통한 효율적인 렌더링</p>
            </li>
            <li>
              <div>작업의 청크화</div>
              <p>작업을 작은 단위로 쪼갬</p>
              <p>requestAnimationFrame 기반의 짧은 프레임 단위로 작업을 분리하고 처리하게 되는데, 언급했던 작업의 우선순위 개념을 더해 인터페이스를 업데이트함으로서 사용자는 더욱 유연한 인터페이스, 반응성을 가져갈 수 있음</p>
            </li>
            <li>
              <div>React18</div>
              <p>Fiber 구조를 기반으로 Concurrent Mode, Automatic Batching, New Hooks 등의 추가적인 개선사항을 가져감</p>
              <p>Automatic Batching: 상태 업데이트 범위의 변화, 이벤트 핸들러 외부의 상태 업데이트를 포함한 모든 상태 업데이트를 병합하여 성능 개선을 목적으로 함</p>
              <p>New Hooks: useTransition, useDeferredValue</p>
            </li>
          </ul>
        </article>

        <article>
          <h3>New Hooks - useTransition, useDeferredValue</h3>
          <p>언급했던 작업의 우선순위 조정에 관여하는 훅, 상태 업데이트의 우선순위를 낮추는데 활용</p>
          <p>useTransition는 함수를, useDeferredValue 는 값을 전달받는데 각각 useCallback, useMemo 와 빗대어 생각하면 편함</p>
        </article>
      </Section>
    </DefaultWrapper>
  )
}

const Section = styled.section`
    padding-top: 10px;
    h2 {
        font-size: 1.5rem;
    }
    h2+p:nth-of-type(1) {
        font-size: 1.2rem;
    }
    h2+p+ul:nth-of-type(1) {
        font-size: 1.2rem;
        font-weight: 500;
        padding: 10px;
    }
    
    &>article {
        h3 {
            font-size: 1.5rem;
            margin: 1rem 0;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 0.4rem;
        }
        ul {
            li {
                padding-top: 0.5rem;
                &>:first-child {
                    font-weight: 500;
                    font-size: 1.3rem;
                    margin-bottom: 0.4rem;
                }
                &>:not(:first-child) {
                    padding-left: 1rem;
                }
            }
        }
    }
`
