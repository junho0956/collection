import { useState } from "react";

const Geolocation = () => {

  const [geolocation, setGeolocation] = useState<{}|null>(null);

  const logCurrentPosition = () => {
    /**
     * maximumAge
     * 캐시된 위치값을 사용할 수 있는 범위
     * 위치정보는 해당 시간내의 캐시된 위치정보를 빠르게 가져올 수 있음
     * 0인 경우 항상 실시간으로 사용자의 정보를 가져옴
     * Infinity인 경우 항상 캐시된 위치 정보를 가져옴
     * 기본값은 0
     * 
     * timeout
     * 장치에서 위치를 가져오는데 걸리는 시간의 제한
     * 특정 제한이 있는 경우 그 시간내에 정보를 가져오지 못하면 위치 정보를 반환하지 않음
     * 기본값은 Infinity
     * 
     * enableHighAccuracy
     * 위치의 정확도를 boolean 값으로 구분해서 가져옴
     * true: 장치가 지원하는 내의 가장 정확한 위치 정보를 가져옴, 응답 속도가 느림
     * false: 정확도를 낮추는 대신 빠른 속도로 정보를 가져옴
     * 기본값은 false
     */
    const options = {
      maximumAge: 0,
      timeout: Infinity,
      enableHighAccuracy: true,
    }
    const success = (pos:any) => {
      console.log(pos.coords);
      setGeolocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    }
    const error = async(err:any) => {
      // 사용자가 권한을 동의하지 않는 경우
      if (err.code == 1) {
        // permissions => granted, prompt, denied
        const permissions = await navigator.permissions.query({name:'geolocation'});
        console.log({permissions});
      }
      else {
        console.error(err);
      }
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <section style={{padding:'20px'}}>
      <h1>GeoLocation</h1>
      <p>Web API 는 사용자의 위치 정보를 사용하기 위해 <a href="https://w3c.github.io/geolocation-api/#geolocation_interface" target="_blank">Geolocation API</a>제공</p>
      <p>navigator.geolocation 을 통해 접근, 접근 시 사용자의 브라우저는 위치 정보 접근 권한을 요청음</p>
      <p>사용자의 동의를 얻은 경우 사용중인 장치에 접근할 수 있는 GPS, WiFi 등을 통해 위치를 식별</p>
      <br />
      <h2>Secure origin</h2>
      <p>HTML5 Geolocation API 는 Chrome50, 16년도 업데이트부터 secure origin인 https 프로토콜에 한해 지원하도록 변경됨</p>
      <p>Https 주소를 http 페이지 안의 iframe 으로 감싼 경우에도 api 사용이 제한됨</p>
      <p>Firefox: v55 <br/>Opera: v39<br/>safari: v10<br/>safari Mobile: v10.1<br/>android webview: v50</p><br/>
      <h2>Using Geolocation</h2>
      <p>Geolocation.getCurrentPosition() 을 통해 장치의 현재 위치를 가져옴</p>
      <p>Geolocation.watchPosition() 을 통해 장치의 위치가 변경될 때마다 위치를 계산하기 위한 처리기 함수</p>
      <button onClick={logCurrentPosition}>getCurrentPosition()</button>
      <p>{geolocation && JSON.stringify(geolocation)}</p>
      <br />
    </section>
  );
};

export default Geolocation;