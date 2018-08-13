this.state = {
  hasLocation: false,
  latlng: {
    lat: 51.505,
    lng: -0.09,
  },
}

// this.state = {
//   lat: -2.9223,
//   lng: -78.7759,
//   zoom: 13,
// }




{
  const marker = this.state.hasLocation ? (
    <Marker position={this.state.latlng}>
      <Popup>
        <span>You are here</span>
      </Popup>
    </Marker>
  ) : null

  return (
    <Map
      center={this.state.latlng}
      length={4}
      onClick={this.handleClick}
      onLocationfound={this.handleLocationFound}
      ref={this.mapRef}
      zoom={13}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
      <div className='container mw5 mw7-ns center bg-light-gray pa3 ph5-ns'></div> 
    </Map>
  )
}

// render() {
//   const position = [this.state.lat, this.state.lng];
//   return (
    
//     <Map center={position} zoom={this.state.zoom}>
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//       />
//       <Marker position={position}>
//         <Popup>
//           Point Fix. <br/> <b>LOquillo</b>.
//         </Popup>
//       </Marker>
//       <div className='container mw5 mw7-ns center bg-light-gray pa3 ph5-ns'>
//       </div> 
//     </Map>
    
//   );
// }



//Animado
this.state = {
  animate: false,
  latlng: {
    lat: 51.505,
    lng: -0.09,
  },
}

handleClick = e => {
  this.setState({
    latlng: e.latlng,
  })
}

toggleAnimate = () => {
  this.setState({
    animate: !this.state.animate,
  })
}



{
  const marker = this.state.hasLocation ? (
    <Marker position={this.state.latlng}>
      <Popup>
        <span>You are here</span>
      </Popup>
    </Marker>
  ) : null

  return (
    <div style={{ textAlign: 'center' }}>
      <label>
        <input
          checked={this.state.animate}
          onChange={this.toggleAnimate}
          type="checkbox"
        />
        Animate panning
      </label>
      <Map
        animate={this.state.animate}
        center={this.state.latlng}
        length={4}
        onClick={this.handleClick}
        zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}
        <div className='container mw5 mw7-ns center bg-light-gray pa3 ph5-ns'></div>
      </Map>
    </div>
  )
}