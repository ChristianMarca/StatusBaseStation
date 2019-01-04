import React from "react";
import L from "leaflet";
import 'leaflet.locatecontrol';
import 'tachyons'
import '../../plugins/leaflet-sidebar';
import '../../plugins/leaflet-sidebar/src/L.Control.Sidebar.css';
import {Side} from './side';

import '../../plugins/menu';
import '../../plugins/menu/style.css'

import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import './map.css'
import './clusters.css'

import "leaflet-contextmenu/dist/leaflet.contextmenu.js"
import "leaflet-contextmenu/dist/leaflet.contextmenu.css"

import 'leaflet-slidemenu/src/L.Control.SlideMenu.js';
import 'leaflet-slidemenu/src/L.Control.SlideMenu.css'
import DataStorage from '../../configs/index';

var markerConecel = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds: true,
  iconCreateFunction: function(cluster) {
    return new L.DivIcon({
      html: '<div><span>' + cluster.getChildCount() + '</span></div>',
      className: 'clusterConecel',
      iconSize: L.point(40, 40)
    });
  }
});
var markerOtecel = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds: true,
  iconCreateFunction: function(cluster) {
    return new L.DivIcon({
      html: '<div><span>' + cluster.getChildCount() + '</span></div>',
      className: 'clusterOtecel',
      iconSize: L.point(40, 40)
    });
  }
});
var markerCNT = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds: true,
  iconCreateFunction: function(cluster) {
    return new L.DivIcon({
      html: '<div><span>' + cluster.getChildCount() + '</span></div>',
      className: 'clusterCNT',
      iconSize: L.point(40, 40)
    });
  }
});

var sidebar=null;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataToSearch: [],
      data: {},
      lastButtons:[],
      dataSelect: {}
    };
  }

  generate_sidebar = (tagName, position, menuDiv, componente) => {
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

  generate_button = (position) => {
    var menu_button = L.menu_button({position});
    return menu_button;
  }

  getData= async(data)=> {
    let dataObject = [];
    return new Promise((resolve, reject) => {
      try {
        var _data = data.features.map(object => {
          dataObject = Object.assign(object.properties, object.geometry)
          return dataObject
        })
        return resolve(_data);
      } catch (e) {
        return reject({})
      }

    })
  }

  clusterFunction= (data)=>{
    const handleClick = (data) => {
      this.setState({dataSelect: data});
      // sidebar.toggle();
    }
    return (L.geoJson(data, {
      onEachFeature: async function(feature, layer) {
        await layer.on('mouseover', () => {
          layer.bindPopup('Cell ID: ' + feature.properties.cell_id).openPopup();
        })
        await layer.on('mouseout', () => {
          layer.closePopup();
        })
        await layer.on('click', () => {
          if (sidebar.isVisible() === false) {
            sidebar.toggle();
          }
          handleClick(feature)
        })
      }
    }))
  }

  updateOnlineStatus=()=>{
    console.log('User is online')
    alert('hey')
  }
  
  updateOfflineStatus=()=>{
    console.log('usaer in ofsline')
    alert('fasil')
  }

  componentDidMount() {
    // window.addEventListener('online', this.updateOnlineStatus, false);
    // window.addEventListener('offline', this.updateOfflineStatus, false);
    console.log('Verifiacar Estado Online', navigator.onLine)
    if(!navigator.onLine){
      alert('ok')
    }
    this.map = L.map("map", {
      // layers: [L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})],
      // layers: [L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})],
      layer:[L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })],
      fullscreenControl: true,
      fullscreenControlOptions: {
        title: "Show me the fullscreen !",
        titleCancel: "Exit fullscreen mode"
      },
      attributionControl: false,
      zoomControl: true,

      contextmenu: true,
      contextmenuWidth: 140,
      separator: true,
      contextmenuItems: [{
        text: 'Mi ubicacion',
        icon: 'https://cdn1.iconfinder.com/data/icons/maps-locations-6/24/map_location_pin_geolocation_position_3-512.png',
        index: 0,
        callback: this.showCoordinates
      }, {
        text: 'Centrar mapa aqui',
        icon: 'https://cdn2.iconfinder.com/data/icons/map-location-set/512/632504-compass-512.png',
        callback: this.centerMap
      },
      '-', {
        text: 'Acercar',
        index: 1,
        icon: 'https://cdn3.iconfinder.com/data/icons/ui-9/512/zoom_in-512.png',
        callback: this.zoomIn
      }, {
        text: 'Alejar',
        icon: 'https://cdn3.iconfinder.com/data/icons/ui-9/512/zoom_out-512.png',
        index: 2,
        callback: this.zoomOut
      }, this.props.isDashboardComponent!==true?{
        text: 'Menu',
        index: 3,
        icon: 'https://cdn2.iconfinder.com/data/icons/ios-tab-bar/25/Hamburger_Round-512.png',
        callback: this.clickMenuRight
      }:{text: 'BSs',
          index: 3,
          icon: 'https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_19-512.png',
          callback: this.clickGoTo}]

    }).setView([
      -1.574255, -81
    ], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 18,
      detectRetina: true,
      maxNativeZoom: 17,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    sidebar = this.generate_sidebar('sidebar', 'right', false);
    this._asyncRequest=this.dataRequest().then(()=>this._asyncRequest=null);
  }
  //didmount end

  componentWillUnmount=()=>{
    if(this._asyncRequest){
      this._asyncRequest.cancel();
    }
  }

  dataRequest=async()=>{
    const DataStorageClass= new DataStorage();
    this.props.isDashboardComponent!==true?(()=>{window.localStorage.getItem('acceptAdvisement')
      const selectTypeRequest=DataStorageClass.fetchRadioBases(!window.localStorage.getItem('acceptAdvisement'));
      console.log(selectTypeRequest,"es una promesa")
      selectTypeRequest.then((myData) => {
        markerConecel.addLayer(this.clusterFunction(myData.conecel));
        this.map.addLayer(markerConecel);

        markerOtecel.addLayer(this.clusterFunction(myData.otecel));
        this.map.addLayer(markerOtecel);

        markerCNT.addLayer(this.clusterFunction(myData.cnt));
        this.map.addLayer(markerCNT);
        document.getElementById("spinner").style.visibility = "hidden";
      }).catch(err => console.log(err))
      // const handleData = (datos) => {
      //   this.props.obtainList(datos)
      // }
      this.props.isDashboardComponent!==true &&
      L.easyButton('https://cdn2.iconfinder.com/data/icons/filled-icons/493/Search-512.png', function(btn, map) {
        clickMenu()

      }).addTo(this.map);

      const clickMenu = () => {
        this.props.search('click')
      }
      })()
      :alert('sorry')
    // setTimeout(function() {
    //   sidebar.show();
    // }, 500);
    // setTimeout(function() {
    //   sidebar.hide();
    // }, 1500);
  }

  

  enter = (value) => {
    this.setState({value})
  }
  locate = (data) => {
    this.setState({data: data})
    console.log('El Fly',data)
    try {
      this.map.flyTo(L.latLng(data.coordinates[1], data.coordinates[0]), 18);
    } catch (err) {
      console.log(err)
    }
  }

  showCoordinates = (e) => {
    alert(e.latlng);
  }

  centerMap = (e) => {
    this.map.panTo(e.latlng);
  }

  zoomIn = (e) => {
    this.map.zoomIn();
  }

  zoomOut = (e) => {
    this.map.zoomOut();
  }
  clickMenuRight = () => {
    this.props.search('click')
  }

  clickGoTo = () => {
    var win = window.open('https://github.com/ChristianMarca', '_blank');
    win.focus();
  }

  dataRequestUpdate=async()=>{
    document.getElementById("spinner").style.visibility = "visible";
      try {
        markerConecel.clearLayers();
        markerOtecel.clearLayers();
        markerCNT.clearLayers();
        const DataStorageFilter= new DataStorage();
        window.localStorage.getItem('acceptAdvisement')?
        DataStorageFilter.fetchRadioBasesFilter(this.props.optionsButtons,window.localStorage.getItem('acceptAdvisement'))
        .then((myData) => {
          markerConecel.addLayer(this.clusterFunction(myData.conecel));
          this.map.addLayer(markerConecel);
  
          markerOtecel.addLayer(this.clusterFunction(myData.otecel));
          this.map.addLayer(markerOtecel);
  
          markerCNT.addLayer(this.clusterFunction(myData.cnt));
          this.map.addLayer(markerCNT);
          document.getElementById("spinner").style.visibility = "hidden";
        }).catch(err => console.log(err))
        :
        DataStorageFilter.fetchRadioBasesFilter(this.props.optionsButtons,window.localStorage.getItem('acceptAdvisement'))
        .then(response => {return response.json()})//.then(jsonData => {
          .then(datosnuev => datosnuev.jsonData).then(myData => {
          var keys = Object.keys(myData);
          var acumm = [];
          var layersComplete = keys.map((actual, indice)=> {
            if (myData[keys[indice]]['features']!==null){
              acumm = acumm.concat(myData[keys[indice]]['features'])
            }
            return this.clusterFunction(myData[keys[indice]]['features'])
          })
          var rbTodo = {
            features: acumm,
            type: "FeatureCollection"
          }
          this.getData(rbTodo).then(datos => {
            this.setState({dataToSearch: datos})
            handleData(datos)
            return datos
          });
          var completo = {layers:layersComplete, llaves:keys}
          return completo
        }).then(completo => {
          completo.llaves.map((actual,indice)=>{
            if(actual==="CONECEL"){
              markerConecel.addLayer(completo.layers[indice]);
              return this.map.addLayer(markerConecel);
            }
            if(actual==="OTECEL"){
              markerOtecel.addLayer(completo.layers[indice]);
              return this.map.addLayer(markerOtecel);
            }
            if(actual==="CNT"){
              markerCNT.addLayer(completo.layers[indice]);
              return this.map.addLayer(markerCNT);
            }
            return "No Found"
          })
          document.getElementById("spinner").style.visibility = "hidden";
        }).catch(err => console.log(err))

        const handleData = (datos) => {
          this.props.obtainList(datos)
        }

      } catch (err) {
        // console.log(err)
      }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.locate !== prevState.data) {
      if(Object.entries(nextProps.locate).length !== 0){
        return {
          data: nextProps.locate,
          changedata: null
        };
      }
    }
    if (nextProps.optionsButtons !== prevState.lastButtons) {
      if(nextProps.optionsButtons.length!==0){
        return{
          lastButtons: nextProps.optionsButtons,
          changeButtons: null
        }
      }
      // return{
      //   changeButtons: undefined
      // }
    }
    return null;
  }

  componentDidUpdate(prevProps,prevState){
    console.log('heta',prevState.data,this.props.locate)
    if((this.state.changedata===null) && (prevState.data!==this.props.locate)){
      // console.log('El fly 1 ', this.state.data)
      //console.log('datsa', this.props,this.props.optionsButtons)
      try {
        // this.map.flyTo(L.latLng(this.state.data.coordinates[1], this.state.data.coordinates[0]), 18);
        console.log('data Fly',this.state.data)
        this.map.flyTo(L.latLng(this.state.data.lat_dec, this.state.data.long_dec), 18);
      } catch (err) {
        // console.log(err)
      }
    }
    if((this.state.changeButtons===null) && (prevState.lastButtons!==this.props.optionsButtons) ){
      //console.log(prevState.lastButtons, this.props.optionsButtons,'vclick')
      //if(this.props.optionsButtons!==0){
        this._asyncRequestUpdate=this.dataRequestUpdate().then(()=>this._asyncRequestUpdate=null);
        this.setState({changeButtons:undefined})
      //}else{
        //this._asyncRequest=this.dataRequest().then(()=>this._asyncRequest=null);
      //}
      
    }
  }

  render() {
    return (<div id="map">
      {/* <div className="loader" id='spinner'></div> */}
      <div className="sk-cube-grid" id='spinner'>
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
      <Side value={this.state.value} dataSearch={this.state.dataSelect}/>
    </div>)
  }

}

export default Map;
