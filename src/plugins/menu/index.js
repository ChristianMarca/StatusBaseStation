import L from "leaflet";
import './style.css'

L.ourCustomControl = L.Control.extend({
  includes: L.Mixin.Events,
  options: {
    position: 'topleft' 
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },      
  onAdd: function (map) {
      var container = this._changeButton=L.DomUtil.create('div', 'button_search_style');

      // container.style.backgroundColor = 'white';     
      // container.style.backgroundImage = "url(https://cdn2.iconfinder.com/data/icons/filled-icons/493/Search-512.png)";
      // container.style.backgroundSize = "30px 30px";
      // container.style.width = '30px';
      // container.style.height = '30px';

      // container.onclick=function(){
      //   console.log('Se dio Click')
      // }


      return container;
    },

    getChangeButton: function () {
      return this._changeButton;
    },

})

L.menu_button = function (options) {
  return new L.ourCustomControl(options);
};