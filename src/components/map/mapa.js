import React from "react";
import L from "leaflet";
import  'leaflet.gridlayer.googlemutant';
import 'leaflet.locatecontrol';
import 'leaflet.fullscreen';
//Para revisar
//import { PruneCluster, PruneClusterForLeaflet,leafletMap } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'
import './mapa.css'

const style = {
  width: "100%",
  height: "600px"
};



class Map extends React.Component {
  constructor(){
    super();
    this.state={

    }
  }
  

  

  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [-2.19, -78.4],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ],
      fullscreenControl: true,
			fullscreenControlOptions: { // optional
				title:"Show me the fullscreen !",
				titleCancel:"Exit fullscreen mode"
      },
      attributionControl: false,
      zoomControl: true
    }).setView([-2.19, -79.4], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        maxNativeZoom: 17
    }).addTo(this.map);

  //   var roads = L.gridLayer.googleMutant({
  //     type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
  // }).addTo(this.map);

  var lc = L.control.locate({
      position: 'topleft',
      strings: {
          title: "Estoy Aqui!"
      }
  }).addTo(this.map);

  // detect fullscreen toggling
  this.map.on('enterFullscreen', function(){
    if(window.console) window.console.log('enterFullscreen');
  });
  this.map.on('exitFullscreen', function(){
    if(window.console) window.console.log('exitFullscreen');
  });

    // add marker
    this.marker = L.marker(this.props.markerPosition).addTo(this.map);
    var circle = L.circle([-2.19, -79.4], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(this.map);
  var marker = L.marker([-2.18, -79.2]).addTo(this.map);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
   
//     var pruneCluster = new PruneClusterForLeaflet();
// var marker = new PruneCluster.Marker(59.8717, 11.1909);
// pruneCluster.RegisterMarker(marker);

// leafletMap.addLayer(pruneCluster);
function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

this.map.on('click', onMapClick);
   
  }
  componentDidUpdate({ markerPosition }) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
    }
  }
  render() {

    return <div id="map" style={style} />;
  }
}

export default Map;
