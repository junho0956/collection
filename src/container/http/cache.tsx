import {DefaultWrapper} from "../styles";

export default function HTTPCache() {
  return (
    <DefaultWrapper>
      <div className="strong br">캐시의 생명주기</div>
      <div className="indent">
        <div>HTTP 요청으로 가지고 올 수 있는 모든 파일은 <strong>리소스</strong></div>
        <div className="br">response에 담긴 Cache-Control 헤더에 따라 리소스의 생명 주기가 결정</div>
        <div className="strong br">max-age (유효 기간)</div>
        <div className="indent">
          <div>Cache-Control 헤더값으로 max-age=$seconds 이 지정되면, 이 리소스의 캐시 유효 기간은 $seconds 초로 설</div>
          <div>max-age=86400 인 경우 86,400 = 1 * 60 * 60 * 24 : 하루로 설정</div>
          <div>max-age 범위내에 있는 리소스를 요청하는 경우 브라우저는 메모리에서 리소스를 가져옴 (memory cached)</div>
          <div>
            <div className="br">
              브라우저에 이미 캐시된 경우 서버에 <strong>재요청</strong>을 하지 않기 때문에
              <strong> CDN Invalidation</strong> 을 포함한 어떤 서버쪽 작업이 있어도 브라우저의 유효한 캐시를 지우기 어려울 수 있음
            </div>
            <div className="indent">
              <div>CDN Invalidation : CDN 에 있는 캐시를 지우는 작업</div>
              <div>브라우저의 캐시와 CDN 캐시는 엄연히 다른 위치에 존재하므로 캐시를 전체적으로 지우고 싶다면</div>
              <div>CDN Invalidation 뿐만 아니라, 클라이언트 브라우저와 서버 사이에 존재하는 중간 서버에 대한 캐시를 모두 작업해야함</div>
            </div>
          </div>
        </div>
        <div className="strong br">Expires</div>
        <div className="indent">
          <div>max-age 대신에 expires 를 이용해서 <strong>만료 시간</strong>이 아닌 <strong>만료 날짜</strong>(+ 및 정확한 시각)를 지정할 수도 있음</div>
        </div>
      </div>
      <div className="strong br">캐시의 재검증 : Revalidation</div>
      <div className="indent">
        <div>캐시의 만료 기간(또는 만료 날짜)가 만족된다고 해서 캐시가 초기화되지는 않음</div>
        <div>만료된 캐시에 대한 리소스 요청이 이루어지는 경우, 브라우저는 서버로부터 <strong>재검증(revalidation)</strong>을 진행</div>
        <div className="br">재검증은 현재 브라우저에 캐시된 리소스에 대한 정보가 서버가 들고 있는 리소스와 일치하는지의 여부를 확인하는 과정</div>
        <div className="br">만약 리소스가 동일하다면</div>
        <div className="indent">
          <div>서버는 304(Not Modified) Status 를 포함한 헤더만을 클라이언트에 전송</div>
          <div className="strong">Body 부분은 텅 빈채로 내려오게됨(당연히 캐시된 리소스를 재사용하면되므로)</div>
          <div>분명 캐시의 기간이 만료되어 똑같은 네트워크 요청이 발생하는 것은 사실이나,</div>
          <div>Body 를 포함하지 않고 내려준다는 것은 네트워크 통신 비용이 대폭 줄어듬을 의미 : <strong>성능 개선의 가장 대표적인 예시</strong></div>
        </div>
        <div className="br">만약 리소스가 동일하지 않다면</div>
        <div className="indent">
          <div>서버는 새로운 값을 내려주게 되므로 200 Status 를 포함한 헤더 와 Body를 클라이언트에 전송</div>
        </div>
        <div className="strong br">어떻게 재검증을 진행하는가?</div>
        <div className="indent">
          <div className="br"><strong>Etag</strong> : 서버가 응답 헤더에 함께 내려주는 값으로, 리소스를 해시하여 만든 값</div>
          <div className="indent">
            <div>이 해시된 값은 리소스로부터 만들어진 것이므로, 리소스에 변화가 생긴다면 Etag 도 당연히 다른 값으로 변경됨</div>
            <div>클라이언트는 재검증을 위해 <strong>If-None-Match</strong> 헤더에 Etag 를 붙여서 서버에 요청하게 됨</div>
          </div>
          <div className="br"><strong>Last-Modified</strong> : 서버가 응답 헤더에 함께 내려주는 값으로, 리소스를 마지막으로 수정한 값</div>
          <div className="indent">
            <div>Etag 와 같은 개념으로 서버가 리소스를 수정한 마지막 시각을 기준으로함</div>
            <div>클라이언트는 재검증을 위해 <strong>If-Modified-Since</strong> 헤더에 Last-Modified 를 붙여서 서버에 요청하게 됨</div>
          </div>
          <div className="strong br">no-store, no-cache</div>
          <div className="indent">
            <div>no-store : 절대로 캐시해서는 안되는 리소스인 경우 사용</div>
            <div>no-cache : 캐시를 저장하긴 하는데, 매 요청마다 서버에 재검증 과정을 거쳐야 하는 리소스를 의미</div>
          </div>
          <div className="strong br">public, private, s-maxage</div>
          <div className="indent">
            <div>CDN 과 같은 중간 서버에도 리소스를 캐시할 수 있는지의 여부를 나타내는 값</div>
            <div>public : 중간 서버에 저장할 수 있음을 의미</div>
            <div>private : End point 인 사용자만 저장할 수 있음을 의미</div>
            <div>s-maxage : 중간 서버에 캐시를 저장할 수 있는 경우(public) 그 만료 기간을 정하는 값</div>
          </div>
        </div>
      </div>
    </DefaultWrapper>
  )
}
