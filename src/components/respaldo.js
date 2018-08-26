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
  constructor(){
    super();
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
      position,
      strings: {
        title: "Search Menu"
      }
    });
    return menu_button;
  }

  componentDidMount() {
  this.map = L.map("map", {
    // center: [-2.19, -78.4],
    // zoom: 1,
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


  //   contextmenu: true,
  //     contextmenuWidth: 140,
  //   contextmenuItems: [{
  //       text: 'Show coordinates',
  //       callback: this.showCoordinates
  //   }, {
  //       text: 'Center map here',
  //       callback: this.centerMap
  //   }, '-', {
  //       text: 'Zoom in',
  //       icon: 'images/zoom-in.png',
  //       callback: this.zoomIn
  //   }, {
  //       text: 'Zoom out',
  //       icon: 'images/zoom-out.png',
  //       callback: this.zoomOut
  //   },{
  //     text: 'Menu',
  //     callback: this.showMenu
  // }]
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

  // const sidebar=this.generate_sidebar('sidebar','right',false);
  // const sidebar_menu=this.generate_sidebar('sidebar_menu','left',true,'<button>sadsfdgfhgj</button>');

  //this.sidebar_menu=sidebar_menu;

  // L.DomEvent.on(control_l, 'mousedown', function (ev) {
  //   alert('errsd')
  //   L.DomEvent.stopPropagation(ev);
  // });

  // L.DomEvent.on(control_l, 'click', function (ev) {
  //     alert('adsfdfghgj')
  //     L.DomEvent.stopPropagation(ev);
  // });

  // function _disableClickPropagation(element) {
  //   console.log('elemento',element)
  //   if (!L.Browser.touch || L.Browser.ie) {
  //       L.DomEvent.disableClickPropagation(element);
  //       L.DomEvent.on(element, 'mousewheel', L.DomEvent.stopPropagation);
  //   } else {
  //       L.DomEvent.on(element, 'click', L.DomEvent.stopPropagation);
  //   }
  //   alert('EJECUTADO')
  // }

  // setTimeout(function () {
  //   sidebar.show();
  // }, 500);

  // setTimeout(function () {
  //   sidebar_menu.show();
  //   // sidebar.show();
  // }, 500);

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
  //   // sidebar_menu.toggle();
  //   console.log('Boton Click')
  // });;


  L.DomEvent.on(menu_button
    .getChangeButton(), 'click', function () {
    // sidebar_menu.toggle();
    alert('click')
  });  

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
    fetch('http://192.168.1.102:3000/data',{
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
    L.geoJson(myData,{
      onEachFeature: function (feature, layer) {
        markers.addLayer(layer);
        layer.on('mouseover',()=>{
          layer.bindPopup(feature.properties.f2)
          .openPopup();
        })
        layer.on('mouseout',()=>{
          layer.closePopup();
        })
        layer.on('click', ()=> {
          // sidebar.toggle();
          var audio = new Audio('../../audio/select.mp3');
          audio.play();
          handleClick(feature)
        })
      }
    }).addTo(this.map);
  }).catch(err=>console.log(err))

  const handleClick=(data)=>{
    this.setState({dataSelect: data})
    // sidebar.toggle();
  }

  this.map.addLayer(markers)

  
//   setContent: function (content) {
//     var container = this.getContainer();

//     if (typeof content === 'string') {
//         container.innerHTML = content;
//     } else {
//         // clean current content
//         while (container.firstChild) {
//             container.removeChild(container.firstChild);
//         }

//         container.appendChild(content);
//     }

//     return this;
// },

  // sidebar_menu.setContent('<div><SideMenu value_return={this.enter} menuList={this.state.dataToSearch} locate={this.locate}/><h1>Holas </h1></div>')
 
  // function getData(data) {
  //   let dataObject=[];
  //   return new Promise(resolve => {
  //     var _data=data.features.map(object=>{
  //       dataObject=Object.assign(object.properties,object.geometry)
  //       return dataObject
  //     })
  //     resolve(_data);
  //   })
  // }

  // fetch('http://localhost:3000/filter?name=Starbucks',{
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

  //   async function _getData(Data) {
  //       var _data= await getData(Data);
  //       return _data
  //       };

  //   _getData(myData).then(datos=>{
  //     this.setState({dataToSearch:datos})
  //     // console.log('asds',d)
  //     return datos
  //   });

  //   //console.log('aqui llego',_data)
    
  //   L.geoJson(myData,{
  //     onEachFeature: function (feature, layer) {
  //       // layer.bindPopup(feature.properties.f2);
  //       // console.log('feacture',feature, layer)
  //       // console.log(feature.geometry.coordinates[0],feature.geometry.coordinates[1])
  //       markers.addLayer(layer);
  //       layer.on('mouseover',()=>{
  //         layer.bindPopup(feature.properties.f2)
  //         .openPopup();
  //       })
  //       layer.on('mouseout',()=>{
  //         layer.closePopup();
  //       })
  //       layer.on('click', () =>{
  //         // sidebar.toggle();
  //         handleClick(feature)
  //         // console.log(feature)
  //       })
  //     }
  //   }).addTo(this.map);
  // }).catch(err=>console.log(err))

  // const handleClick=(data)=>{
  //   this.setState({dataSelect: data})
  //   sidebar.toggle();
  // }

  // this.map.addLayer(markers)

  // ##########VERION K#########

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


  // sidebar_menu.setContent(call_menu)
   
  // var left  = '<h1>Slide Menu (Left)</h1>';
  //           var right = '<h1>Slide Menu (Right)</h1>';
  //           var contents = '<hr>';
  //           contents += '<h2>Read Me</h2>';
  //           contents += '<p>A simple slide menu for Leaflet.<br>';
  //           contents += 'When you click the menu button and the menu is displayed to slide.<br>';
  //           contents += 'Please set the innerHTML to slide menu.</p>';
  //           contents += '<h3>Usage</h3>';
  //           contents += '<p>L.control.slideMenu("&lt;p&gt;test&lt;/p&gt;").addTo(map);</p>';
  //           contents += '<h3>Arguments</h3>';
  //           contents += '<p>L.control.slideMenu(&lt;String&gt;innerHTML, &lt;SlideMenu options&gt;options?)</p>';
  //           contents += '<h3>Options</h3>';
  //           contents += '<p>position<br>';
  //           contents += 'menuposition<br>';
  //           contents += 'width<br>';
  //           contents += 'height<br>';
  //           contents += 'direction<br>';
  //           contents += 'changeperc<br>';
  //           contents += 'delay<br>';
  //           contents += 'icon<br>';
  //           contents += 'hidden</p>';
  //           contents += '<h3>Methods</h3>';
  //           contents += '<p>setContents(&lt;String&gt;innerHTML)</p>';
  //           contents += '<h3>License</h3>';
  //           contents += '<p>MIT</p>';
  //           contents += '<button>MIT</button>';
  //           // left
  //           L.control.slideMenu(left + contents).addTo(this.map);
  //           // right
  //           var slideMenu = L.control.slideMenu('', {position: 'topright', menuposition: 'topright', width: '30%', height: '400px', delay: '50', icon: 'fa-chevron-left'}).addTo(this.map);
  //           slideMenu.setContents(right + contents);

 }
// componentDidUpdate({ markerPosition }) {
//   // check if position has changed
//   // if (this.props.markerPosition !== markerPosition) {
//   //   this.marker.setLatLng(this.props.markerPosition);
//   // }
//   this.map.addLayer(markers)
// }
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
showMenu= (e)=> {
  let vari=L.DomUtil.create('div','menu')
  vari.innerHTML=<h1>heello</h1>
  console.log(vari)
  // alert('si se utilizo')
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
    console.log(err)
  }
}
  

  render() {
    // console.log('uneva data',this.state.dataToSearch)

    let menu_bar=<SideMenu value_return={this.enter} menuList={this.state.dataToSearch} locate={this.locate}/>;

    return ( 
    <div>
      <div id="map">
      {/* <Side value={this.state.value} dataSearch={this.state.dataSelect}/> */}
      {/* {menu_bar} */}
      </div>
      {/* <SideMenu value_return={this.enter} menuList={this.state.dataToSearch} locate={this.locate} menu={this.sidebar_menu}/> */}
      {/* {this.slideMenu.setContents(menu_bar)} */}
    </div>
  )
  }
}

export default Map;

















import React from "react";
import L from "leaflet";
import 'leaflet.locatecontrol';
import 'tachyons'
import '../../plugins/leaflet-sidebar';
import '../../plugins/leaflet-sidebar/src/L.Control.Sidebar.css';
// import {Side,SideMenu} from './side';
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
  constructor(){
    super();
    this.state={
      value: '',
      dataToSearch:[],
      data:{},
      dataSelect:{},
    };
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
  function addMarker(marker){
    return new Promise(resolve => {
      let _data=markers.addLayer(marker);
      resolve(_data);
    })
  }

  // fetch('http://localhost:3000/data',{
    fetch('http://192.168.1.102:3000/data',{
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
      return datos
    });
    console.log('atas',myData)
    var myStyle = {
      "opacity": 0
  };
  var icons= L.geoJson(myData,{style: myStyle,
      onEachFeature: async function (feature, layer) {
        console.log(layer)
        async function _addMarker(layer) {
          await addMarker(layer);
          
          await layer.on('mouseover',()=>{
            layer.bindPopup(feature.properties.f2)
            .openPopup();
          })
          await layer.on('mouseout',()=>{
            layer.closePopup();
          })
          await layer.on('click', ()=> {
            // sidebar.toggle();
            var audio = new Audio('../../audio/select.mp3');
            audio.play();
            handleClick(feature)
          })
          return layer
        };
        _addMarker(layer)
      }
      
    })
  return icons  
  }).then(icons=>icons.addTo(this.map)).catch(err=>console.log(err))

  const handleClick=(data)=>{
    this.setState({dataSelect: data})
    // sidebar.toggle();
  }

  this.map.addLayer(markers)
  

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
    console.log(err)
  }
}
  

  render() {

    return ( 
      <div id="map">
      </div>
  )
  }
}

export default Map;




<div className='selection'>
                  <a onClick={() => this.setState({ openOperator: !this.state.openOperator })}>
                    click
                  </a>
                  <Collapse in={this.state.openOperator}>
                    <div className='selection'>
                      <Well>
                        
                        {/* <div className="flex items-center justify-center flex-column vh-100"> */}
                          <div className='cf dib'>
                            {/* <p className="m0 f6 silver tc">Download</p> */}
                            <a className="f6 fl link bb bt bl ph3 pv2 dib near-white b bg-purple b--purple br2 br--left bl" href="#0">Raw</a>
                            <a className="f6 fl hover-bg-purple hover-white b--purple link ba ph3 pv2 dib purple" href="#0">Gzipped</a>
                            <a className="f6 fl hover-bg-purple hover-white b--purple link bb bt ph3 pv2 dib purple br2 br--right br" href="#0">Minified</a>
                          </div>
                        {/* </div> */}

                      </Well>
                    </div>
                  </Collapse>
                </div>

                <div className='selection'>
                  <a onClick={() => this.setState({ openTecnology: !this.state.openTecnology })}>
                    click
                  </a>
                  <Collapse in={this.state.openTecnology}>
                    <div className='selection'>
                      <Well>
                        
                        {/* <div className="flex items-center justify-center flex-column vh-100"> */}
                          <div className='cf dib'>
                            {/* <p className="m0 f6 silver tc">Download</p> */}
                            <a className="f6 fl link bb bt bl ph3 pv2 dib near-white b bg-purple b--purple br2 br--left bl" href="#0">Raw</a>
                            <a className="f6 fl hover-bg-purple hover-white b--purple link ba ph3 pv2 dib purple" href="#0">Gzipped</a>
                            <a className="f6 fl hover-bg-purple hover-white b--purple link bb bt ph3 pv2 dib purple br2 br--right br" href="#0">Minified</a>
                          </div>
                        {/* </div> */}

                      </Well>
                    </div>
                  </Collapse>
                </div>