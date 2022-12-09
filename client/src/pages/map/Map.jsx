
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
                <div id="map"
                style={{
                    position: 'absolute',
                    top: 70,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                }}>
                    <p className="locationText">Your Current Location</p>
                    <Map  

                        height="600px"
                        mapboxAccessToken="pk.eyJ1Ijoib3pndXJpcGVrY2kiLCJhIjoiY2xiZ2l0ZWtyMDdmaTNwbWt5anFucmE2eiJ9.0Kslfcpy6iPPXsCq7Gj-Uw"
                        initialViewState={viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v12" 
                        
                    >
                        <Marker
                        longitude={viewport.longitude}
                        latitude={viewport.latitude}

                        />
                        <iframe  ></iframe>
                    </Map>
                    </div>
            )}
        </div>

    </div>
  );
}
export default MyMap;