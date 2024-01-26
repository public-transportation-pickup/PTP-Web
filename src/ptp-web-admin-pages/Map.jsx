import {MapContainer, TileLayer,Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Marker } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import busStationIcon from '../assets/bus_station_icon.png';


export default function Map() {
  const markers =  [
    {
      geocode: [10.836530227310535, 106.80836723756903],
      popUp: "FPT Software FTown 3"
    },
    {
      geocode: [10.851130840419415, 106.79884167932613],
      popUp: "FPT Software FTown 1"
    },
    {
      geocode: [10.842470210132719, 106.80913639097463],
      popUp: "HPT Vietnam Corporation"
    }, 
    {
      geocode:[10.957718022113736, 106.84300482222983],
      popUp:"Vincom Plaza Bien Hoa"
    }
  ]

const customIcon=new Icon({
  iconUrl:busStationIcon,
  iconSize:[38,38]
})

const createCustomClusterIcon =(cluster)=>{
  return new divIcon({
    html:`<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
    className:"custom-marker-cluster",
    iconSize:point(33,33,true)
  });
}



return (
  <MapContainer center={[10.841348873649608, 106.80988299523939]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createCustomClusterIcon}>
      {
        markers.map((marker)=>{
          return (
            console.log("Geocode", marker.geocode+" Icon", customIcon),
            <Marker key={marker.geocode} position={marker.geocode} icon={customIcon}>
              <Popup>
                {marker.popUp}
              </Popup>
            </Marker>
          );
        })
      }
    </MarkerClusterGroup>
    
  </MapContainer>
);
}
