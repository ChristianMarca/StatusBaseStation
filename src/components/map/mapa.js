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
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './map.css'


// var yourObject = {
//   address: "92101 S Martin Ave.",
//   address2: "",
//   agent_name: "mr smith",
//   animal: "sheep",
//   car: "honda",
//   city: "Chicago",
//   county: "Cook County",
//   ID: "1",
//   latitude: "41.718986",
//   longitude: "-87.550646",
//   postalcode: "60617",
//   stateProvince: "IL",
//   status: "GS"
// };

var markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds:true,
});



// function getInfoFrom(object) {
//   var popupFood = [];
//   for (var key in object) {
//     if (object.hasOwnProperty(key)) {
//       var stringLine = "The " + key + " is " + object[key];
//       popupFood.push(stringLine);
//     }
//   }
//   return popupFood;
// }

// var yourData = getInfoFrom(yourObject).join(" <br>");

class Map extends React.Component {
  constructor(){
    super();
    this.state={
      value: '',
      dataToSearch:[],
      data:{},
      dataSelect:{}
    };
  }
  // componentDidUpdate(){
    
  //   console.log('Si se ejecuto')
  // }
  
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
  this.map = L.map("map", {
    center: [-2.19, -78.4],
    zoom: 1,
    layers: [
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    fullscreenControl: true,
    fullscreenControlOptions: {
      title:"Show me the fullscreen !",
      titleCancel:"Exit fullscreen mode"
    },
    attributionControl: false,
    zoomControl: true
  }).setView([-2.19, -79.4], 7);

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
    sidebar.show();
  }, 1500);

  // setTimeout(function () {
   
  // }, 1500);

  // var marker = L.marker([-2.19, -79.4])
  //   .addTo(this.map)
  //   .on('click', function () {
  //     sidebar.toggle();
  //   })

  // marker.on('mouseover',()=>{
  //   marker.bindPopup(yourData)
  //   .openPopup();
  // })
  // marker.on('mouseout ',()=>{
  //   marker.closePopup();
  // })

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
  // sidebar.on('show', function () {
  //   console.log('Sidebar will be visible.');
  // });
  // sidebar.on('shown', function () {
  //   console.log('Sidebar is visible.');
  // });
  // sidebar.on('hide', function () {
  //   console.log('Sidebar will be hidden.');
  // });
  // sidebar.on('hidden', function () {
  //   console.log('Sidebar is hidden.');
  // });
  // L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
  //   console.log('Close button clicked.');
  // });

  const menu_button=this.generate_button('topleft');
  this.map.addControl(menu_button)
  // .on('click', function () {
  //   sidebar_menu.toggle();
  //   console.log('Boton Click')
  // });;

  L.DomEvent.on(menu_button
    .getChangeButton(), 'click', function () {
    sidebar_menu.toggle();
  });  

  // fetch('http://localhost:3000/data',{
  //   method: 'GET',
  //   headers: {'Content-Type': 'application/json'},
  //   // body: JSON.stringify({
  //   //     // id: this.state.user.id,
  //   // })
  // }).then(response=>{
  //   return  response.json()
  // }).then(jsonData=>{
  //   return jsonData.jsonData;
  // }).then(myData=>{
  //   console.log('json Data',myData);
  //   L.geoJson(myData,{
  //     onEachFeature: function (feature, layer) {
  //       markers.addLayer(layer);
  //       layer.on('mouseover',()=>{
  //         layer.bindPopup(feature.properties.f2)
  //         .openPopup();
  //       })
  //       layer.on('mouseout',()=>{
  //         layer.closePopup();
  //       })
  //       layer.on('click', function () {
  //         sidebar.toggle();
  //         var audio = new Audio('../../audio/select.mp3');
  //         audio.play();
  //       })
  //     }
  //   }).addTo(this.map);
  // }).catch(err=>console.log(err))

  // this.map.addLayer(markers)
 
  function getData(data) {
    let dataObject=[];
    return new Promise(resolve => {
      var _data=data.features.map(object=>{
        dataObject=Object.assign(object.properties,object.geometry)
        return dataObject
      })
      resolve(_data);
    })
  }

  fetch('http://localhost:3000/filter?name=Starbucks',{
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    // body: JSON.stringify({
    //     // id: this.state.user.id,
    // })
  }).then(response=>{
    return  response.json()
  }).then(jsonData=>{
    return jsonData.jsonData;
  }).then(myData=>{

    async function _getData(Data) {
        var _data= await getData(Data);
        return _data
        };

    _getData(myData).then(datos=>{
      this.setState({dataToSearch:datos})
      // console.log('asds',d)
      return datos
    });

    //console.log('aqui llego',_data)
    
    L.geoJson(myData,{
      onEachFeature: function (feature, layer) {
        // layer.bindPopup(feature.properties.f2);
        // console.log('feacture',feature, layer)
        // console.log(feature.geometry.coordinates[0],feature.geometry.coordinates[1])
        markers.addLayer(layer);
        layer.on('mouseover',()=>{
          layer.bindPopup(feature.properties.f2)
          .openPopup();
        })
        layer.on('mouseout',()=>{
          layer.closePopup();
        })
        layer.on('click', () =>{
          // sidebar.toggle();
          handleClick(feature)
          // console.log(feature)
        })
      }
    }).addTo(this.map);
  }).catch(err=>console.log(err))

  const handleClick=(data)=>{
    this.setState({dataSelect: data})
    sidebar.toggle();
  }

  this.map.addLayer(markers)

  // markers.on('click',(e)=>{
  //   // this.setState({dataSelect:e})
  //   console.log(markers)
  //   let data=markers._featureGroup._layers;
  //   let key=String(Object.keys(data)[0]);
  //   console.log('degas2',data)
  //   console.log(key)
  //   let _data=data
  //   console.log('degas',_data)
  //   this.setState({dataSelect:_data})
  // //  console.log(feature)
  // })




 }
// componentDidUpdate({ markerPosition }) {
//   // check if position has changed
//   // if (this.props.markerPosition !== markerPosition) {
//   //   this.marker.setLatLng(this.props.markerPosition);
//   // }
//   this.map.addLayer(markers)
// }

  enter=(value)=>{
    this.setState({value})
  }
  locate=(data)=>{
    console.log('La data retornada',data.coordinates)
    this.setState({data:data})
    var southWest = L.latLng(40.712, -74.227),
    northEast = L.latLng(40.774, -74.125),
    bounds = L.latLngBounds(southWest, northEast);
    try{
    this.map.flyTo(L.latLng(data.coordinates[1],data.coordinates[0]),18);


    var popupt = L.popup().setLatLng([data.coordinates[1],data.coordinates[0]])
    .setContent("Click In me").openPopup().closePopup().openOn(this.map);

  //  setTimeout(function () {
  //   popupt.closePopup()
  // }, 10000).bind(this);

  // popupt.closePopup()
  

  //   setTimeout(function () {
  //   popup.closePopup()
  // }, 1000);
    }
    catch(err){
      console.log(err)
    }
  }

  render() {
    // console.log('uneva data',this.state.dataToSearch)
    return (
    <div>
      <div id="map" />
      <Side value={this.state.value} dataSearch={this.state.dataSelect}/>
      <SideMenu value_return={this.enter} menuList={this.state.dataToSearch} locate={this.locate}/>
    </div>
  )
  }
}

export default Map;
