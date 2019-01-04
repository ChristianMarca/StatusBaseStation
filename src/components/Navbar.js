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
           <li className="headerItem active">BSs</li>
            <li className="headerItemRight">
              BSs
            </li>
            {/* <li className="itemName"><a className=""> Name</a></li> */}
            <li className="itemCollapse">
            <img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/>
            {/* 😸 */}
            </li>
            <li className="icon headerItemRight" onClick={this.changeNav}>
              <i className="fas fa-bars"></i>
            </li>
          </ul>
    )
  }
}