import React from 'react';
// import { API_URL } from "../../config";
import './advisement.css'

class Advisement extends React.Component{
  
  constructor(props){
    super(props);

    this.state={
      acceptAdvisement: false
    }

  }

  // onProfileUpadate=(data)=>{
  //   // fetch(`${API_URL}/authentication/profile/${this.props.user.id}`,{
  //   //   method: 'post',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'authorization': window.sessionStorage.getItem('token')
  //   //   },
  //   //   body: JSON.stringify({formInput: data})
  //   // }).then(resp=>{
  //   //   if(resp.status===200 || resp.status===304){
  //   //     this.props.toogleModal();
  //   //     this.props.loadUser({...this.props.user,...data});
  //   //   }
  //   // }).catch(console.log)

  //   this.props.toogleModal();
  // }
  saveAdvisementAccept=()=>{
    window.localStorage.setItem('acceptAdvisement',true);
    this.props.toogleModal();
  }
  cancelAdvisementAccept=()=>{
    this.props.toogleModal();
  }

  render(){
    // const {toogleModal }=this.props;
    return (
      <div className="profile-modal">
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 W-80">
              <label className="mt2 fw6" htmlFor="user-advisement">
              "La presente WEB APP hace uso de informacion de tamano aproximado de 25Mb lo cual inhibe en cosumos extras en su red, por otro lado para garantizar el correcto funcionamiento de la aplicacion en modo offline ud, debe aceptar las condiciones de almacenamiento en su dispositivo."
              </label>
              <hr/>
              <label className="mt2 fw6" htmlFor="user-advisement">
              "Si esta de acuerdo con aceptar el almacenamiento acepete las condiciones de almacenamiento, caso contrario rechaze los terminos y los datos seran adquiridos para cada ejecucion de el servidor"
              </label>
              <div className="mt4" style={{display:'flex',justifyContent: 'space-evenly'} }>
                <button onClick={this.saveAdvisementAccept} className='b br3 pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
                  Save
                </button>
                <button onClick={this.cancelAdvisementAccept} className='b br3 pa2 grow pointer hover-white w-40 bg-light-red b--black-20'>
                  Cancel
                </button>
              </div>
          </main>
          {/* <div className='modal-close' onClick={toogleModal}>&times;</div> */}
        </article>
      </div>
    )
  }
}
export default Advisement;