'use client';

import {
  Map,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';

export default function KakaoMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_APPKEY!, // 발급 받은 APPKEY
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <Map
      level={3}
      center={{ lat: 35.075186, lng: 129.086619 }}
      style={{ width: '100%', height: '500px' }}
    >
      <MapMarker position={{ lat: 35.075186, lng: 129.086619 }}>
        <div className="ml-3 text-black">한국해양대 공학1관</div>
      </MapMarker>
    </Map>
  );
}
