import React from "react";
import L from "leaflet";
import 'leaflet.locatecontrol';
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

import "leaflet-contextmenu/dist/leaflet.contextmenu.js"
import "leaflet-contextmenu/dist/leaflet.contextmenu.css"

import 'leaflet-dialog/Leaflet.Dialog.js'
import 'leaflet-dialog/Leaflet.Dialog.css'

import 'leaflet-slidemenu/src/L.Control.SlideMenu.js';
import 'leaflet-slidemenu/src/L.Control.SlideMenu.css'

var markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds:true,
});

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value: '',
      dataToSearch:[],
      data:{},
      dataSelect:{},
    };
  }

  generate_sidebar=(tagName, position, menuDiv,componente)=>{
    var sidebar = L.control.sidebar(tagName, {
      closeButton: true,
      menuDiv,
      position: position,
      autoPan: false,
      componente
    });

    this.map.addControl(sidebar);
    return sidebar;
  }

  generate_button=(position)=>{
    var menu_button = L.menu_button({
      position
    });
    return menu_button;
  }
  
  componentDidMount() {
  this.map = L.map("map", {
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
    zoomControl: true,
    
    
    contextmenu: true,
    contextmenuWidth: 140,
    separator:true,
    contextmenuItems: [{
        text: 'Search Me',
        icon:'https://cdn1.iconfinder.com/data/icons/maps-locations-6/24/map_location_pin_geolocation_position_3-512.png',
        index:0,
        callback: this.showCoordinates
    }, {
        text: 'Center map here',
        icon:'https://cdn2.iconfinder.com/data/icons/map-location-set/512/632504-compass-512.png',
        callback: this.centerMap
    }, '-', {
        text: 'Zoom in',
        index:1,
        icon: 'https://cdn3.iconfinder.com/data/icons/ui-9/512/zoom_in-512.png',
        callback: this.zoomIn
    }, {
        text: 'Zoom out',
        icon: 'https://cdn3.iconfinder.com/data/icons/ui-9/512/zoom_out-512.png',
        index:2,
        callback: this.zoomOut
    },{
      text: 'Menu',
      index:3,
      icon: 'https://cdn2.iconfinder.com/data/icons/ios-tab-bar/25/Hamburger_Round-512.png',
      callback: this.clickMenuRight
  }]

  }).setView([-1.574255, -78.441264], 6);

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

  // fetch('http://localhost:3000/data',{
  fetch('http://192.168.1.102:3000/data_radiobase',{
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
      handleData(datos)
      return datos
    });
  let barLayer=L.geoJson(myData,{
      // onEachFeature: async function (feature, layer) {
      //   console.log(layer)
      //   async function _addMarker(layer) {
      //     await addMarker(layer);
          
      //     await layer.on('mouseover',()=>{
      //       layer.bindPopup(feature.properties.f2)
      //       .openPopup();
      //     })
      //     await layer.on('mouseout',()=>{
      //       layer.closePopup();
      //     })
      //     await layer.on('click', ()=> {
      //       // sidebar.toggle();
      //       var audio = new Audio('../../audio/select.mp3');
      //       audio.play();
      //       handleClick(feature)
      //     })
      //     return layer
      //   };
      //   _addMarker(layer)
      // }

    //   pointToLayer: function(feature, latlng) {
    //     var icon = L.icon({
    //                     iconSize: [27, 27],
    //                     iconAnchor: [13, 27],
    //                     popupAnchor:  [1, -24],
    //                     // iconUrl: 'icon/' + feature.properties.amenity + '.png'
    //                     });
    //     return L.marker(latlng, {icon: icon})
    // },
    onEachFeature: async function(feature, layer) {

        await layer.on('mouseover',()=>{
          layer.bindPopup(feature.properties.f15)
          .openPopup();
        })
        await layer.on('mouseout',()=>{
          layer.closePopup();
        })
        await layer.on('click', ()=> {
          sidebar.toggle();
          var audio = new Audio('../../audio/select.mp3');
          audio.play();
          handleClick(feature)
        })
    }
    
    })

    return barLayer 

  }).then((barLayer)=>{
    markers.addLayer(barLayer);
      this.map.addLayer(markers);
      document.getElementById("spinner").style.visibility="hidden";
  }
  ).catch(err=>console.log(err))


  const handleClick=(data)=>{
    this.setState({dataSelect: data});
    // sidebar.toggle();
  }
  const handleData=(datos)=>{
    this.props.obtainList(datos)
  }
  
  const sidebar=this.generate_sidebar('sidebar','right',false);
  // const menu_button=this.generate_button('topleft');

  L.easyButton('https://cdn2.iconfinder.com/data/icons/filled-icons/493/Search-512.png', function(btn, map){
    // var antarctica = [-77,70];
    // map.setView(antarctica);
    clickMenu()

}).addTo( this.map );  

const clickMenu=()=>{
  this.props.search('click')
}

  // this.map.addControl(menu_button)

 

  // console.log('buttni',menu_button)
  
  // // .on('click', function () {
  // //   // sidebar_menu.toggle();
  // //   alert('Boton Click')
  // // });;


  // L.DomEvent.on('button_search_style','click', function () {
  //   // sidebar_menu.toggle();
  //   'clock'
  // }); 

  setTimeout(function () {
    sidebar.show();
  }, 500);
  setTimeout(function () {
    sidebar.hide();
  }, 1500);

}



enter=(value)=>{
  this.setState({value})
}
locate=(data)=>{
  console.log('La data retornada',data.coordinates)
  this.setState({data:data})
  try{
  this.map.flyTo(L.latLng(data.coordinates[1],data.coordinates[0]),18);

  // var popupt = L.popup().setLatLng([data.coordinates[1],data.coordinates[0]])
  // .setContent("Click In me").openPopup().closePopup().openOn(this.map);
  }
  catch(err){
    // console.log(err)
  }
}

showCoordinates= (e)=> {
  alert(e.latlng);
}

centerMap= (e)=> {
  this.map.panTo(e.latlng);
}

zoomIn= (e)=> {
  this.map.zoomIn();
}

zoomOut= (e)=> {
  this.map.zoomOut();
}
clickMenuRight=()=>{
  this.props.search('click')
}
// showMenu= (e)=> {
//   let vari=L.DomUtil.create('div','menu')
//   vari.innerHTML=<h1>heello</h1>
//   console.log(vari)
//   // alert('si se utilizo')
// }

componentWillReceiveProps(nextProps){
  const {locate,optionsButtons}=this.props;
  // console.log('next',nextProps.locate,'this', locate)
  if (nextProps.loacte !== locate || locate || nextProps.locate){

    console.log('respondio')
    console.log('La data retornada',locate.coordinates)
  this.setState({data:locate})
  try{
  this.map.flyTo(L.latLng(locate.coordinates[1],locate.coordinates[0]),18);

  // var popupt = L.popup().setLatLng([data.coordinates[1],data.coordinates[0]])
  // .setContent("Click In me").openPopup().closePopup().openOn(this.map);
  }
  catch(err){
    // console.log(err)
  }

  }
  console.log('adsdffgghjh',optionsButtons,'scnod',nextProps.optionsButtons)
  if (nextProps.optionsButtons !== optionsButtons){

  this.setState({data:locate})
  document.getElementById("spinner").style.visibility="visible";
  try{
    markers.clearLayers();

    function getData(data) {
      let dataObject=[];
      return new Promise((resolve,reject) => {
        try{
          var _data=data.features.map(object=>{
            dataObject=Object.assign(object.properties,object.geometry)
            return dataObject
          })
          return resolve(_data);
        }
      catch(e){
        alert('No se encontro Resultados')
        return reject({})
      }
        
      })
    }

    fetch('http://192.168.1.102:3000/filter_radiobase',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        provincia: nextProps.optionsButtons,
    })
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
        handleData(datos)
        return datos
      });
    let barLayer=L.geoJson(myData,{
        // onEachFeature: async function (feature, layer) {
        //   console.log(layer)
        //   async function _addMarker(layer) {
        //     await addMarker(layer);
            
        //     await layer.on('mouseover',()=>{
        //       layer.bindPopup(feature.properties.f2)
        //       .openPopup();
        //     })
        //     await layer.on('mouseout',()=>{
        //       layer.closePopup();
        //     })
        //     await layer.on('click', ()=> {
        //       // sidebar.toggle();
        //       var audio = new Audio('../../audio/select.mp3');
        //       audio.play();
        //       handleClick(feature)
        //     })
        //     return layer
        //   };
        //   _addMarker(layer)
        // }

      //   pointToLayer: function(feature, latlng) {
      //     var icon = L.icon({
      //                     iconSize: [27, 27],
      //                     iconAnchor: [13, 27],
      //                     popupAnchor:  [1, -24],
      //                     // iconUrl: 'icon/' + feature.properties.amenity + '.png'
      //                     });
      //     return L.marker(latlng, {icon: icon})
      // },
      onEachFeature: async function(feature, layer) {

          await layer.on('mouseover',()=>{
            layer.bindPopup(feature.properties.f15)
            .openPopup();
          })
          await layer.on('mouseout',()=>{
            layer.closePopup();
          })
          await layer.on('click', ()=> {
            sidebar.toggle();
            var audio = new Audio('../../audio/select.mp3');
            audio.play();
            handleClick(feature)
          })
      }
      
      })

      return barLayer 

    }).then((barLayer)=>{
      markers.addLayer(barLayer);
        this.map.addLayer(markers)
        document.getElementById("spinner").style.visibility="hidden";
    }
    ).catch(err=>console.log(err))

    const handleClick=(data)=>{
      this.setState({dataSelect: data});
      // sidebar.toggle();
    }
    const handleData=(datos)=>{
      this.props.obtainList(datos)
    }
    
    const sidebar=this.generate_sidebar('sidebar','right',false);
    console.log('helloMUHNO',nextProps.optionsButtons)
  }
  catch(err){
    // console.log(err)
  }

  }
  // let electionArray=[];
  // for (var i in optionsButtons) {
  //   if (optionsButtons.hasOwnProperty(i)) {
  //       if(optionsButtons[i]){
  //         electionArray.push(i)
  //       }
  //   }
  // }
  // console.log('clickeados',electionArray)
}


  render() {

    let menu_bar=<SideMenu value_return={this.enter} menuList={this.state.dataToSearch} locate={this.props.locate}/>;

    return (
      
        <div id="map">
        <div class="loader" id='spinner'></div>
        <Side value={this.state.value} dataSearch={this.state.dataSelect}/>
        </div>
  )
  }

}

export default Map;
