
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
                    bottom: 150,
                    width: '100%',
                    height: '80%',
                }}>
                    <p className="locationText">Your Current Location</p>
                    <Map  

                        height="600px"
                        mapboxAccessToken="pk.eyJ1Ijoib3pndXJpcGVrY2kiLCJhIjoiY2xiZ2oxZ2N6MGdqaDNwcndrODg5N3dleSJ9.r1dfnXd50WFEz39_h-gybA"
                        initialViewState={viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v12" 
                        
                    >
                        <Marker
                        longitude={viewport.longitude}
                        latitude={viewport.latitude}
                        />
                        
                    </Map>
                    </div>
            )}
        </div>

    </div>
  );
}
export default MyMap;