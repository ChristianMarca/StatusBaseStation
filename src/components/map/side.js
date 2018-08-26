import React from 'react';
import {Location, CajaTxt} from '../search/loc';
import './map.css';
import 'tachyons';
import L from "leaflet";

import ReactModal from 'react-modal';

class Side extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: "",
      address:"",
      coordinates:"",
      BaseStatons: {},
    }
  }

  componentWillReceiveProps(nextProps){
    const {dataSearch}=this.props;
    console.log('next',nextProps.dataSearch,'this', dataSearch)
    if (nextProps.dataSearch !== dataSearch || dataSearch){
      
      this.setState({BaseStatons: nextProps.dataSearch})
      // const {value, dataSearch}=this.props;
      // console.log('asdd',this.props.dataSearch)
      try{
        
        this.forceUpdate(this.setState({
          name: this.props.dataSearch.properties.f2,
          address: this.props.dataSearch.properties.f3,
          coordinates: this.props.dataSearch.properties.coordinates,
        }));
        this.forceUpdate(this.render)
      }
      catch(e){
        // console.log(e)
      }
    }
  }

 imageData(props) {

    // if(props.existe){
      alert('entro')
      return(
      <li className="tc pa4">
        <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
      </li>)
    // }
    
  }

  render(){
    const {value}=this.props;
    // let elemento=<imageData existe={true}/>
    let elemento=<img src="http://tachyons.io/img/logo.jpg" className="br1 h3 w3 dib" alt="avatar" />;
    return(
      <div id="sidebar">
      <h1 className="title">Información</h1>

      {/* <h1>{value}</h1> */}
      <ul className="list pl0 ml0 center mw7 ba b--light-silver br3">
      <li className="info ph3 pv2 bb b--light-silver">{elemento}</li>
      <li className="info ph3 pv2 bb b--light-silver">{this.state.name}</li>
      <li className="info ph3 pv2 bb b--light-silver">{this.state.address}</li>
      <li className="info ph3 pv2 bb b--light-silver">{String(this.state.coordinates)}</li> 
      </ul>
      </div>
    )
  }
}

class SideMenu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      nameSideMenu: "",
      showModal: false
    };
    this.handleOpenModal=this.handleOpenModal.bind(this);
    // ,
    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);

  }
  changeName=(value)=>{
    const h=new Side();
    this.setState({nameSideMenu: value})
    this.props.value_return(value);
    h.setState({name: value})
  }

  locate=(data)=>{
    this.props.locate(data)
  }

  componentWillMount=()=>{
    this._div = L.DomUtil.create('div', 'informacion');
    // L.DomEvent.on(this._div,'click', function (ev) {
    //   alert('Se dio click')
    //   ev.stopPropagation();
    //   L.DomEvent.stopPropagation(ev);
    // })
  }

  // _disableClickPropagation(element) {
  //   if (!L.Browser.touch || L.Browser.ie) {
  //       L.DomEvent.disableClickPropagation(element);
  //       L.DomEvent.on(element, 'mousewheel', L.DomEvent.stopPropagation);
  //   } else {
  //       L.DomEvent.on(element, 'click', L.DomEvent.stopPropagation);
  //   }
  // }

  
  handleOpenModal (e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    alert('ENTRO EL CLICK')
    // this.setState({ showModal: true });
  }
  
  // handleCloseModal () {
  //   this.setState({ showModal: false });
  // }

  stopPropagation(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
   _disableClickPropagation(element) {
    if (!L.Browser.touch || L.Browser.ie) {
        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.on(element, 'mousewheel', L.DomEvent.stopPropagation);
    } else {
        L.DomEvent.on(element, 'click', L.DomEvent.stopPropagation);
    }
  }

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

  render(){
    const {menu}=this.props;
    console.log('hubo un cambio',menu)
    const {menuList}=this.props;

    const element=this._div.innerHTML=<CajaTxt className='menu' value={this.changeName} menuList={menuList} locate={this.locate}/>
    const eleme=<button onClick={this.handleOpenModal} >Trigger Modal</button>
    // this. _disableClickPropagation(eleme)
    // L.DomEvent.stopPropagation(element);
    // this.stopPropagation(eleme)
    return(
<div>
  <div id="sidebar_menu">
  
    <h1 className="title">Buscar BS</h1>
    {/* <Location value={this.state.nameSideMenu}/>
    <h2>{this.state.nameSideMenu}</h2> */}
    {element}
    {/* { L.DomEvent.stopPropagation(this._event)} */}

    {console.log('Second Child',this._div)}
    {this.innerHTML=<h1>Be OYURSELF</h1>}
    <hr />
    <div>
    
      {eleme}

      <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
        <button onClick={this.handleCloseModal}>Close Modal</button>
      </ReactModal>

    </div>

    </div>
    <div>
      {element}
    </div>
  </div>
    )
  }
}

export {
  Side,
  SideMenu
};
