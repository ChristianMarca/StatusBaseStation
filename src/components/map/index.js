import React, {Component } from 'react'
import Map from './mapa';
import './map.css'
import 'tachyons'
import {CajaTxt} from '../search/loc';
import styled from "styled-components"
import { bubble as Menu } from 'react-burger-menu';
import {Navbar, NavItem, MenuItem, NavDropdown, Nav, Well, Button, Collapse,Clearfix, Panel} from 'react-bootstrap';
import "leaflet-contextmenu/dist/leaflet.contextmenu.js"
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";



class Mapaj extends Component {

  constructor(props, context){
    super(props, context);
    this.state={ markerPosition: { lat: 49.8419, lng: 24.0315 },
    nicknameValue: '',
    nicknameSuggestions: [],
    emailValue: '',
    emailSuggestions: [],

    menuList:[],
    locate:{},

    menuOpen: false,
    openOperator: false,
    openTecnology: false,

    optionsButtons:{
      CNT: false,
      CONECEL: false,
      OTECEL: false,
      GSM: false,
      LTE: false,
      UMTS:false
    },
    optionSelected:[],
    optionAcept:[],

   }
   
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
   // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

   // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  moveMarker = () => {
    const { lat, lng } = this.state.markerPosition;
    this.setState({
      markerPosition: {
        lat: lat + 0.0001,
        lng: lng + 0.0001, 
      }
    });
  };

  //##### Style with styled-comonents##############
  getWidthString=(span)=> {
    if(!span) return;
  
    let width=span/12*100;
    return `width: ${width}%`;
  }
  
  Row= styled.div`
    &::after{
      content:"";
      clear: both;
      display: flex;
    }
  `
  MapaScroll=styled.div`
    ${'' /* padding-right: 3px;
    background : red; */}
    ${'' /* border-radius: 9px 9px 9px 9px;
    -moz-border-radius: 9px 9px 9px 9px;
    -webkit-border-radius: 9px 9px 9px 9px;
    border: 0px solid #000000; */}
    ${'' /* padding-right: 3px; */}
  `;

  Header=styled.div`
    height:6vh;
    width: 100%;
    color: white;
    
    @media only screen and (max-width: 768px){
      height: 8vh;
    }
  `;

  // Menu=styled.div`
  //   ${'' /* height: 5.5vh; */}
  //   background-color: #212121;
  // `;

  Column = styled.div`
    float: left;
    ${({xs})=>(xs?this.getWidthString(xs): "width: 100%")};
  
    ${'' /* @media only screen and (min-width: 768px){ */}
    @media only screen and (min-width: 800px){
      ${({sm})=>(sm && this.getWidthString(sm))};
    }
  
    @media only screen and (min-width: 992px){
      ${({md})=>(md && this.getWidthString(md))};
    }
  
    @media only screen and (min-width: 1200px){
      ${({lg})=>(lg && this.getWidthString(lg))};
    }
  `;
    obtainList=(list)=>{
      this.setState({menuList: list})
    }
    locate=(data)=>{
      this.setState({locate:data})
      console.log('locate',data)
    }
    changeName=(value)=>{
      // const h=new Side();
      // this.setState({nameSideMenu: value})
      // this.props.value_return(value);
      // h.setState({name: value})
    }

    showSettings (event) {
      event.preventDefault();
     console.log(event)
    }
    searchMenu=(data)=>{
      this.toggleMenu ();
    }
    buttonSubmint=()=>{
      this.setState({optionAcept:this.state.optionSelected})
    }
  
    buttonsEvents=(data)=>{
      let election = Object.assign({}, this.state.optionsButtons);    //creating copy of object
      let electionArray=[];
      switch(data){
        case 'CNT':
          document.getElementById(data).style.background=!this.state.optionsButtons.CNT?'#373a47':'whitesmoke';
          document.getElementById(data).style.color=this.state.optionsButtons.CNT?'#373a47':'whitesmoke';
          election.CNT =!this.state.optionsButtons.CNT;
          this.setState({optionsButtons: election})
          break;
        case 'CONECEL':
          document.getElementById(data).style.background=!this.state.optionsButtons.CONECEL?'#373a47':'whitesmoke';
          document.getElementById(data).style.color=this.state.optionsButtons.CONECEL?'#373a47':'whitesmoke';
          election.CONECEL =!this.state.optionsButtons.CONECEL;
          this.setState({optionsButtons: election})
          break;
        case 'OTECEL':
          document.getElementById(data).style.background=!this.state.optionsButtons.OTECEL?'#373a47':'whitesmoke';
          document.getElementById(data).style.color=this.state.optionsButtons.OTECEL?'#373a47':'whitesmoke';
          election.OTECEL =!this.state.optionsButtons.OTECEL;
          this.setState({optionsButtons: election})
          break;
        case 'GSM':
          document.getElementById(data).style.background=!this.state.optionsButtons.GSM?'#373a47':'whitesmoke';
          document.getElementById(data).style.color=this.state.optionsButtons.GSM?'#373a47':'whitesmoke';
          election.GSM =!this.state.optionsButtons.GSM;
          this.setState({optionsButtons: election})
          break;
        case 'LTE':
          document.getElementById(data).style.background=!this.state.optionsButtons.LTE?'#373a47':'whitesmoke';
          document.getElementById(data).style.color=this.state.optionsButtons.LTE?'#373a47':'whitesmoke';
          election.LTE =!this.state.optionsButtons.LTE;
          this.setState({optionsButtons: election})
          break;
        case 'UMTS':
          document.getElementById(data).style.background=!this.state.optionsButtons.UMTS?'#373a47':'whitesmoke';
          document.getElementById(data).style.color=this.state.optionsButtons.UMTS?'#373a47':'whitesmoke';
          election.UMTS =!this.state.optionsButtons.UMTS;
          this.setState({optionsButtons: election})
          break;
      }
      for (var i in election) {
        if (election.hasOwnProperty(i)) {
            if(election[i]){
              electionArray.push(i)
            }
        }
      }
      // console.log('clickeados',electionArray)
      this.setState({optionSelected:electionArray})

    }

    render()  {
      const { markerPosition } = this.state;

      return (
   
        <div class="container" id="outer-container" id='page-wrap'>
          
          <this.Row> 
            <this.Header className="navContainer">

              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand> 
                    <a href="https://github.com/ChristianMarca"><span>BSs</span></a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse className='collapseMenu1'>
                  <Nav>
                    <NavItem eventKey={2} href="https://www.arcotel.gob.ec">
                      ARCOTEL
                    </NavItem>
                    <NavDropdown eventKey={3} title="Información" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>About</MenuItem>
                      <MenuItem eventKey={3.2}>Instructivo</MenuItem>
                      <MenuItem eventKey={3.3}>Documentación</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3.3}>Desarrollador</MenuItem>
                    </NavDropdown>
                  </Nav>
                  <Nav pullRight>
                    <NavItem eventKey={2} href="https://christianmarca.github.io/practice_page.github.io/">
                      DEV
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>  
            
            </this.Header>
            
          </this.Row>
          
            <this.Row>
            <this.Column xs='12' sm='3' md='3' className='Columna'>
              <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} 
              pageWrapId={'page-wrap'} outerContainerId={'outer-container'} width={350}>

              <Panel className="panel">
                <Panel.Heading style={{backgroundColor: "rgba(55, 58, 71, 0.96)"}}>
                  <h1 className="panelTitle">Search</h1>
                </Panel.Heading>
                <Panel.Body>

                  

                    <CajaTxt className='menu' value={this.changeName} menuList={this.state.menuList} locate={this.locate}/>
                    
                  
                </Panel.Body>
              </Panel>

               <Panel className="panel">
                <Panel.Heading  style={{backgroundColor: "rgba(55, 58, 71, 0.96)"}}>
                  <h1 className="panelTitle">Operadora</h1>
                </Panel.Heading>
                <Panel.Body>
                        
                        {/* <div className="flex items-center justify-center flex-column vh-100"> */}
                          <div className='cf dib GrupButtons'>
                            {/* <p className="m0 f6 silver tc">Download</p> */}
                            <button className="buttons  f4 fl link ba ph3 pv2 dib buttonLeft" id="CNT" onClick={()=>this.buttonsEvents('CNT')}>CNT EP</button>
                            <button className="buttons f4 fl link ba ph3 pv2 dib" id="CONECEL" onClick={()=>this.buttonsEvents('CONECEL')}>CONECEL</button>
                            <button className="buttons  f4 fl link ba ph3 pv2 dib buttonRight" id='OTECEL' onClick={()=>this.buttonsEvents('OTECEL')}>OTECEL</button>
                          </div>
                        {/* </div> */}
                  
                </Panel.Body>
              </Panel>
                
              <Panel className="panel">
                <Panel.Heading style={{backgroundColor: "rgba(55, 58, 71, 0.96)"}}>
                  <h1 className="panelTitle">Tecnologia</h1>
                </Panel.Heading>
                <Panel.Body >
                        
                        {/* <div className="flex items-center justify-center flex-column vh-100"> */}
                          <div className='cf dib GrupButtons'>
                            {/* <p className="m0 f6 silver tc">Download</p> */}
                            <button className="buttons  f4 fl link ba ph3 pv2 dib buttonLeft" id='GSM' onClick={()=>this.buttonsEvents('GSM')}>GSM</button>
                            <button className="buttons f4 fl link ba ph3 pv2 dib" id='LTE' onClick={()=>this.buttonsEvents('LTE')}>LTE</button>
                            <button className="buttons  f4 fl link ba ph3 pv2 dib buttonRight" id='UMTS' onClick={()=>this.buttonsEvents('UMTS')}>UMTS</button>
                          </div>
                        {/* </div> */}
                  
                </Panel.Body>
              </Panel>
                <div className="buttonPanel">
                  <button className="f4 fl link ba ph3 pv2 dib buttonSubmit center" onClick={()=>this.buttonSubmint()}>Aceptar</button>        
                </div>

              </Menu>
            </this.Column>
            <this.Column xs='12' sm='12' md='12'>
              <this.MapaScroll className='mapa' >

              <Map markerPosition={markerPosition} obtainList={this.obtainList.bind(this)} locate={this.state.locate} search={this.searchMenu.bind(this)} optionsButtons={this.state.optionAcept}/>
          
              </this.MapaScroll>
            </this.Column>
          </this.Row>
        
        </div>
   
      );
    }
}

export default Mapaj;
