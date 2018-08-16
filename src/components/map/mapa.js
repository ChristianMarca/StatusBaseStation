import React from "react";
import L from "leaflet";
import  'leaflet.gridlayer.googlemutant';
import 'leaflet.locatecontrol';
// import 'leaflet.fullscreen';
import 'tachyons'
import '../../plugins/leaflet-sidebar';
import '../../plugins/leaflet-sidebar/src/L.Control.Sidebar.css';
import {Side,SideMenu} from './side';
import '../../plugins/menu';
import '../../plugins/menu/style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Para revisar
//import { PruneCluster, PruneClusterForLeaflet,leafletMap } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'
import './map.css'

// library.add(search)

var yourObject = {
  address: "92101 S Martin Ave.",
  address2: "",
  agent_name: "mr smith",
  animal: "sheep",
  car: "honda",
  city: "Chicago",
  county: "Cook County",
  ID: "1",
  latitude: "41.718986",
  longitude: "-87.550646",
  postalcode: "60617",
  stateProvince: "IL",
  status: "GS"
};

function getInfoFrom(object) {
  var popupFood = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var stringLine = "The " + key + " is " + object[key];
      popupFood.push(stringLine);
    }
  }
  return popupFood;
}

var yourData = getInfoFrom(yourObject).join(" <br>");

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
  generate_button=(position)=>{
    var menu_button = L.menu_button({
      position,
      strings: {
        title: "Search Menu"
      }
    });
    return menu_button;
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

    // // detect fullscreen toggling
    // this.map.on('enterFullscreen', function(){
    //   if(window.console) window.console.log('enterFullscreen');
    //     });
    // this.map.on('exitFullscreen', function(){
    //   if(window.console) window.console.log('exitFullscreen');
    // });

    const sidebar=this.generate_sidebar('sidebar','right');
    const sidebar_menu=this.generate_sidebar('sidebar_menu','left');

    // setTimeout(function () {
    //   sidebar.show();
    // }, 500);
    setTimeout(function () {
      sidebar_menu.show();
    }, 50);

    setTimeout(function () {
      sidebar_menu.hide();
    }, 1000);
    var marker = L.marker([-2.19, -79.4]).addTo(this.map).on('click', function () {
      sidebar.toggle();
    })
    marker.on('mouseover',()=>{
      marker.bindPopup(yourData)
      .openPopup();
    })
    marker.on('mouseout ',()=>{
      marker.closePopup();
      
    })

    // var popup = L.popup()
    // .setLatLng([51.5, -0.09])
    // .setContent("I am a standalone popup.")
    // .openOn(this.map);

    // L.marker([-2.191, -79.42]).addTo(this.map)
    //   .bindPopup(yourData)
    //   .openPopup();

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

    const menu_button=this.generate_button('topleft');
    console.log("here!",menu_button)
    this.map.addControl(menu_button)
    // .on('click', function () {
    //   sidebar_menu.toggle();
    //   console.log('Boton Click')
    // });;

    L.DomEvent.on(menu_button.getChangeButton(), 'click', function () {
      sidebar_menu.toggle();
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
