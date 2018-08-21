import React from 'react';
import {Location, CajaTxt} from '../search/loc';
import './map.css'
import 'tachyons'

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
        console.log(e)
      }
    }
  }

 imageData(props) {

    // if(props.existe){
      alert('entro')
      return(
      <li className="tc pa4">
        <img src="http://tachyons.io/img/logo.jpg" class="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
      </li>)
    // }
    
  }

  render(){
    const {value}=this.props;
    // let elemento=<imageData existe={true}/>
    let elemento=<img src="http://tachyons.io/img/logo.jpg" class="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />;
    return(
      <div id="sidebar">
      <h1 className="title">Información</h1>

      {/* <h1>{value}</h1> */}
      <ul class="list pl0 ml0 center mw7 ba b--light-silver br3">
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
    }
  }
  changeName=(value)=>{
    const h=new Side();
    this.setState({nameSideMenu: value})
    this.props.value_return(value);
    // console.log('clase',h.state.name)
    h.setState({name: value})
  }
  locate=(data)=>{
    this.props.locate(data)
  }
  render(){
    // const {value_return}=this.props;
    // console.log('hubo un cambio',value_return)
    const {menuList}=this.props;
    return(
      <div id="sidebar_menu">
      <h1 className="title">Buscar BS</h1>
      {/* <Location value={this.state.nameSideMenu}/>
      <h2>{this.state.nameSideMenu}</h2> */}
       <CajaTxt value={this.changeName} menuList={menuList} locate={this.locate}/>
  </div>

    )
  }
}

export {
  Side,
  SideMenu
};
