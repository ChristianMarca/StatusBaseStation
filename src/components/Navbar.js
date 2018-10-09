import React from 'react';
import './Navbar.css';

export class Navbar extends React.Component{
  changeNav=()=>{
    var x = document.getElementById("myTopnav");
    x.className === "listNav"?x.className += " responsive":x.className = "listNav";
  }
  render() {
    return (
      <ul className="listNav" id="myTopnav">
           <li className="headerItem active">SMA</li>
            <li className="headerItem" onClick={this.changeNav}><i className="fas fa-chart-line"></i> Activity</li>
            <li className="headerItem" onClick={this.changeNav}><i className="fas fa-file-medical-alt"></i> Report</li>
            <li className="headerItem" onClick={this.changeNav}><i className="fas fa-chart-bar"></i> Stadistics</li>
            <li className="headerItem" onClick={this.changeNav}><i className="fas fa-map-marked-alt"></i> Maps</li>

            <li className="headerItemRight">
              <a className="searchItem">
                <input placeholder="search" className="search" />
                <i className="fas fa-search searchIcon"></i>
              </a>
            </li>
            <li className="itemName"><a className=""> Name</a></li>
            <li className="itemCollapse"><a className=""><img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/></a></li>
            <li className="icon headerItemRight" onClick={this.changeNav}>
              <i className="fas fa-bars"></i>
            </li>
          </ul>
    )
  }
}