
import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

function MyMap() {
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 12,
        height:400,
        style: 'mapbox://styles/mapbox/streets-v11',

      });
    });
  }, [viewport]);
  return (
    <div>
        <Topbar/>
 {/*        <Sidebar/> */}
        <div>

            {viewport.latitude && viewport.longitude && (
                <div>
                <h3>Your Location:</h3>
                <Map className="map"
                    mapboxAccessToken="pk.eyJ1Ijoib3pndXJpcGVrY2kiLCJhIjoiY2xiZ2l0ZWtyMDdmaTNwbWt5anFucmE2eiJ9.0Kslfcpy6iPPXsCq7Gj-Uw"
                    
                    initialViewState={viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v12" 
                    
                >
                    <Marker
                    longitude={viewport.longitude}
                    latitude={viewport.latitude}
                    height='400px'
                    />
                    <iframe ></iframe>
                </Map>
                </div>
            )}
        </div>

    </div>
  );
}
export default MyMap;