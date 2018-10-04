import React from "react";
import L from "leaflet";
import 'leaflet.locatecontrol';
import 'tachyons'
import '../../plugins/leaflet-sidebar';
import '../../plugins/leaflet-sidebar/src/L.Control.Sidebar.css';
import {Side, SideMenu} from './side';

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

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataToSearch: [],
      data: {},
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

  componentDidMount() {
    this.map = L.map("map", {
      layers: [L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})],
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
      contextmenuItems: [
        {
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
        }, {
          text: 'Menu',
          index: 3,
          icon: 'https://cdn2.iconfinder.com/data/icons/ios-tab-bar/25/Hamburger_Round-512.png',
          callback: this.clickMenuRight
        }
      ]

    }).setView([
      -1.574255, -78.441264
    ], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxNativeZoom: 17
    }).addTo(this.map);

    /* Funcion para colocar indicador en mapa
    var lc = L.control.locate({
      position: 'topleft',
      strings: {
        title: "Estoy Aqui!"
      }
    }).addTo(this.map);
    */

    function getData(data) {
      let dataObject = [];
      return new Promise(resolve => {
        var _data = data.features.map(object => {
          dataObject = Object.assign(object.properties, object.geometry)
          //console.log('esto ques',dataObject)
          return dataObject
        })
        //console.log('pruebna',_data);
        resolve(_data);
      })
    }

    //Funcion para pedido de datos
    /*
    const fetchTodoRB = async function(){
      fetch('http://localhost:3001/data_radiobase', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    }*/

    fetch('http://localhost:3001/data_radiobase', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(datosnuev => datosnuev.jsonData).then(myData => {

      async function _getData(Data) {
        var _data = await getData(Data);
        return _data
      };
      var rbTodo = Object.assign({}, myData.conecel, myData.otecel, myData.cnt);
      _getData(rbTodo).then(datos => {
        this.setState({dataToSearch: datos})
        handleData(datos)
        return datos
      });

      let barLayerCon = L.geoJson(myData.conecel, {
        onEachFeature: async function(feature, layer) {

          await layer.on('mouseover', () => {
            layer.bindPopup('Cell ID: ' + feature.properties.f11).openPopup();
          })
          await layer.on('mouseout', () => {
            layer.closePopup();
          })
          await layer.on('click', () => {
            if (sidebar.isVisible() == false) {
              sidebar.toggle();
            }
            handleClick(feature)
          })
        }

      })

      let barLayerOte = L.geoJson(myData.otecel, {
        onEachFeature: async function(feature, layer) {

          await layer.on('mouseover', () => {
            layer.bindPopup('Cell ID: ' + feature.properties.f11).openPopup();
          })
          await layer.on('mouseout', () => {
            layer.closePopup();
          })
          await layer.on('click', () => {
            if (sidebar.isVisible() == false) {
              sidebar.toggle();
            }
            handleClick(feature)
          })
        }

      })

      let barLayerCnt = L.geoJson(myData.cnt, {
        onEachFeature: async function(feature, layer) {

          await layer.on('mouseover', () => {
            layer.bindPopup('Cell ID: ' + feature.properties.f11).openPopup();
          })
          await layer.on('mouseout', () => {
            layer.closePopup();
          })
          await layer.on('click', () => {
            if (sidebar.isVisible() == false) {
              sidebar.toggle();
            }
            handleClick(feature)
          })
        }

      })
      //console.log('prueba',barLayer);
      return [barLayerCon, barLayerOte, barLayerCnt]

    }).then((barLayer) => {
      markerConecel.addLayer(barLayer[0]);
      this.map.addLayer(markerConecel);

      markerOtecel.addLayer(barLayer[1]);
      this.map.addLayer(markerOtecel);

      markerCNT.addLayer(barLayer[2]);
      this.map.addLayer(markerCNT);

      document.getElementById("spinner").style.visibility = "hidden";
    }).catch(err => console.log(err))
    //Fin de funcion de pedido de datos

    const handleClick = (data) => {
      this.setState({dataSelect: data});
      // sidebar.toggle();
    }
    const handleData = (datos) => {
      this.props.obtainList(datos)
    }

    const sidebar = this.generate_sidebar('sidebar', 'right', false);
    // const menu_button=this.generate_button('topleft');

    L.easyButton('https://cdn2.iconfinder.com/data/icons/filled-icons/493/Search-512.png', function(btn, map) {
      // var antarctica = [-77,70];
      // map.setView(antarctica);
      clickMenu()

    }).addTo(this.map);

    const clickMenu = () => {
      this.props.search('click')
    }

    setTimeout(function() {
      sidebar.show();
    }, 500);
    setTimeout(function() {
      sidebar.hide();
    }, 1500);

  }
  //didmount end

  enter = (value) => {
    this.setState({value})
  }
  locate = (data) => {
    //console.log('La data retornada', data.coordinates)
    this.setState({data: data})
    try {
      this.map.flyTo(L.latLng(data.coordinates[1], data.coordinates[0]), 18);

      // var popupt = L.popup().setLatLng([data.coordinates[1],data.coordinates[0]])
      // .setContent("Click In me").openPopup().closePopup().openOn(this.map);
    } catch (err) {
      // console.log(err)
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

  componentWillReceiveProps(nextProps) {
    const {locate, optionsButtons} = this.props;
    // console.log('next',nextProps.locate,'this', locate)
    if (nextProps.locate !== locate || locate || nextProps.locate) {

      //console.log('respondio')
      //console.log('La data retornada', locate.coordinates)
      this.setState({data: locate})
      try {
        this.map.flyTo(L.latLng(locate.coordinates[1], locate.coordinates[0]), 18);

        // var popupt = L.popup().setLatLng([data.coordinates[1],data.coordinates[0]])
        // .setContent("Click In me").openPopup().closePopup().openOn(this.map);
      } catch (err) {
        // console.log(err)
      }

    }
    if (nextProps.optionsButtons !== optionsButtons) {

      this.setState({data: locate})
      document.getElementById("spinner").style.visibility = "visible";
      try {
        //markers.clearLayers();
        markerConecel.clearLayers();
        markerOtecel.clearLayers();
        markerCNT.clearLayers();
        /*function getData(data) {
          let dataObject = [];
          return new Promise((resolve, reject) => {
            try {
              var _data = data.features.map(object => {
                dataObject = Object.assign(object.properties, object.geometry)
                return dataObject
              })
              return resolve(_data);
            } catch (e) {
              alert('No se encontro Resultados')
              return reject({})
            }

          })
        }*/
        function getData(data) {
          let dataObject = [];
          return new Promise((resolve, reject) => {
            try {
              var _data = data.features.map(object => {
                dataObject = Object.assign(object.properties, object.geometry)
                return dataObject
              })
              return resolve(_data);
            } catch (e) {
              //alert('No se encontro Resultados')
              return reject({})
            }

          })
        }

        fetch('http://localhost:3001/filter_radiobase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({campos: nextProps.optionsButtons})
        }).then(response => {
          return response.json()
        }).then(jsonData => {
          return jsonData.jsonData;
        }).then(myData => {
          //keys = [];
          var keys = Object.keys(myData);
          var acumm = {};
          console.log('llaves', keys)

          async function _getData(Data) {
            var _data = await getData(Data);
            return _data
          };

          var layersComplete = keys.map((actual, indice)=> {

            Object.assign(acumm, myData[keys[indice]])
            console.log('no me sale',actual,myData[keys[indice]])

            let barLayer = L.geoJson(myData[keys[indice]], {
              onEachFeature: async function(feature, layer) {

                await layer.on('mouseover', () => {
                  layer.bindPopup('Cell ID: ' + feature.properties.f11).openPopup();
                })
                await layer.on('mouseout', () => {
                  layer.closePopup();
                })
                await layer.on('click', () => {
                  if (sidebar.isVisible() == false) {
                    sidebar.toggle();
                  }
                  handleClick(feature)
                })
              }

            });

            return barLayer
          })

          _getData(acumm).then(datos => {
            this.setState({dataToSearch: datos})
            handleData(datos)
            return datos
          });
          var completo = {layers:layersComplete, llaves:keys}
          return completo
        }).then(completo => {
          //console.log(layersComplete)
          completo.llaves.map((actual,indice)=>{
            console.log('ya quiero terminar',completo.layers)
            if(actual=="CONECEL"){
              markerConecel.addLayer(completo.layers[indice]);
              this.map.addLayer(markerConecel);
            }
            if(actual=="OTECEL"){
              markerOtecel.addLayer(completo.layers[indice]);
              this.map.addLayer(markerOtecel);
            }
            if(actual=="CNT"){
              markerCNT.addLayer(completo.layers[indice]);
              this.map.addLayer(markerCNT);
            }

          })


          document.getElementById("spinner").style.visibility = "hidden";
        }).catch(err => console.log(err))

        const handleClick = (data) => {
          this.setState({dataSelect: data});
          // sidebar.toggle();
        }
        const handleData = (datos) => {
          this.props.obtainList(datos)
        }

        const sidebar = this.generate_sidebar('sidebar', 'right', false);
        //console.log('Campos de filtros', nextProps.optionsButtons)
      } catch (err) {
        // console.log(err)
      }

    }
  }

  render() {

    let menu_bar = <SideMenu value_return={this.enter} menuList={this.state.dataToSearch} locate={this.props.locate}/>;

    return (<div id="map">
      <div className="loader" id='spinner'></div>
      <Side value={this.state.value} dataSearch={this.state.dataSelect}/>
    </div>)
  }

}

export default Map;
