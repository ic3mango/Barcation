import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = (props) => {
  const displayInfoWindow = (infoBar) => {
    const { latitude: lat, longitude: lng } = infoBar.coordinates;
    return (
      <InfoWindow
        onCloseClick={() => props.onInfoClose()}
        position={{ lat, lng }}
        >
        <div>
          <strong className="card-title">{infoBar.name}</strong>
          <div>
           {infoBar.patrons.map(patron =>
             <a key={patron} href={`https://twitter.com/${patron}`}>@{patron}</a>
           )}
           </div>
        </div>
      </InfoWindow>
    );
  }

  return (
    <GoogleMap
       ref={props.onMapMounted}
       defaultZoom={13}
       defaultCenter={props.defaultCenter}
     >
     {props.barsToRender
       .map(({ id, coordinates: { latitude: lat, longitude: lng }, userGoing }, idx) =>
       <Marker
         key={id}
         position={{ lat, lng }}
         label={{ text: `${idx + 1}`, color: `${userGoing? 'yellow': 'white'}` }}
         onClick={() => props.onMarkerClick(id)}
       />)}
    {props.infoBar && displayInfoWindow(props.infoBar)}
     </GoogleMap>
   );
}

export default withGoogleMap(Map);
