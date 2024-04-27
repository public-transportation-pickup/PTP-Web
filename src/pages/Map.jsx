import {MapContainer, TileLayer,Popup, Polyline} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Marker } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
//import MarkerClusterGroup from "react-leaflet-cluster";
import busStationIcon from '../assets/bus_station_icon.png';
import PropTypes from 'prop-types'


export default function Map({markers}) {
  
  // const markers =  [
  //   {
  //     id:1,
  //     geocode: ["10.836530227310535", "106.80836723756903"],
  //     popUp: "FPT Software FTown 3"
  //   },
  //   {
  //     id:2,
  //     geocode: [10.851130840419415, 106.79884167932613],
  //     popUp: "FPT Software FTown 1"
  //   },
  //   {
  //     id:3,
  //     geocode: [10.842470210132719, 106.80913639097463],
  //     popUp: "HPT Vietnam Corporation"
  //   }, 
  //   {
  //     id:4,
  //     geocode:[10.957718022113736, 106.84300482222983],
  //     popUp:"Vincom Plaza Bien Hoa"
  //   }
  // ]
  console.log("Marker on map component",markers)
  //console.log("Geocode[0]",markers.find((item)=>item.id==1).geocode)

const customIcon=new Icon({
  iconUrl:busStationIcon,
  iconSize:[33,33]
})
// const customIconV2=()=>{
//   return (
//     <div>

//     </div>
//   )
// }
// const createCustomClusterIcon =(cluster)=>{
//   return new divIcon({
//     html:`<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
//     className:"custom-marker-cluster",
//     iconSize:point(33,33,true)
//   });
// }
//const navigate= useNavigate();
// const handleClick=()=>{
  
//   navigate("/");
// }



return (
  <MapContainer center={[markers[0].latitude,markers[0].longitude]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {/* <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createCustomClusterIcon} onClick={handleClick}> */}
      {
        markers&& markers.map((marker,index)=>{
          return (
            //console.log("Geocode", marker.geocode+" Icon", customIcon),
            <Marker key={index} position={[marker.latitude,marker.longitude]} icon={customIcon} >
              <Popup>
                {marker.stationName}
              </Popup>
            </Marker>
          );
        })
      }
      {/* <Polyline positions={markers.map(marker => marker.geocode)} color="green" /> */}
    {/* </MarkerClusterGroup> */}
    
  </MapContainer>
);
}

Map.propTypes={
  markers:PropTypes.array
}
