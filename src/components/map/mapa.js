import React from "react";
import L from "leaflet";
import  'leaflet.gridlayer.googlemutant';
import 'leaflet.locatecontrol';
import 'leaflet.fullscreen';
import 'tachyons'
import '../../plugins/leaflet-sidebar';
import '../../plugins/leaflet-sidebar/src/L.Control.Sidebar.css';
import {Side,SideMenu} from './side';
// import {SideMenu} from './side';
//Para revisar
//import { PruneCluster, PruneClusterForLeaflet,leafletMap } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'
import './map.css'

class Map extends React.Component {
  constructor(){
    super();
    this.state={

    }
  }
  
  generate_sidebar=(tagName, position)=>{
    var sidebar = L.control.sidebar(tagName, {
      closeButton: true,
      position: position,
      autoPan: false,
    });

    this.map.addControl(sidebar);
    return sidebar;
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

    var lc = L.control.locate({
      position: 'topleft',
      strings: {
        title: "Estoy Aqui!"
      }
    }).addTo(this.map);
    console.log(lc)

    // detect fullscreen toggling
    this.map.on('enterFullscreen', function(){
      if(window.console) window.console.log('enterFullscreen');
        });
    this.map.on('exitFullscreen', function(){
      if(window.console) window.console.log('exitFullscreen');
    });

    const sidebar=this.generate_sidebar('sidebar','right');
    const sidebar_menu=this.generate_sidebar('sidebar_menu','left');

    setTimeout(function () {
      sidebar.show();
    }, 500);
    setTimeout(function () {
      sidebar_menu.show();
    }, 5000);
    var marker = L.marker([-2.19, -79.4]).addTo(this.map).on('click', function () {
      sidebar.toggle();
    });
    console.log(marker)
   //    this.map.on('click', function () {
    //   sidebar.hide();
    // })
    sidebar.on('show', function () {
      console.log('Sidebar will be visible.');
    });
    sidebar.on('shown', function () {
      console.log('Sidebar is visible.');
    });
    sidebar.on('hide', function () {
      console.log('Sidebar will be hidden.');
    });
    sidebar.on('hidden', function () {
      console.log('Sidebar is hidden.');
    });
    L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
      console.log('Close button clicked.');
    });

  }
// componentDidUpdate({ markerPosition }) {
//   // check if position has changed
//   if (this.props.markerPosition !== markerPosition) {
//     this.marker.setLatLng(this.props.markerPosition);
//   }
// }



  render() {
    return (
    <div>
      <div id="map" />
      <Side />
      <SideMenu />
    </div>
  )
  }
}

export default Map;
