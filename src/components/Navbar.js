import React from 'react';
import DataStorage from '../configs/index';
import ModalAdvisement from './ModaAdvisement/Modal';
import './Navbar.css';

export class Navbar extends React.Component {
	constructor() {
		super();
		this.state = {
			isAdvisementOpen: false,
			isAdvisementOpenStore: false,
			isDeleteDisabled: false
		};
		this.DataStorage = new DataStorage();
	}
	changeNav = () => {
		var x = document.getElementById('myTopnav');
		x.className === 'listNav' ? (x.className += ' responsive') : (x.className = 'listNav');
	};
	toogleModal = () => {
		window.localStorage.getItem('acceptAdvisement') === 'true'
			? this.setState((prevState) => ({
					...prevState,
					isAdvisementOpenStore: !prevState.isAdvisementOpenStore
				}))
			: this.setState({ isDeleteDisabled: true });
	};
	deleteLocalDB = (stateName, event) => {
		window.localStorage.getItem('acceptAdvisement') === 'true'
			? this.DataStorage
					.deleteLocalDB(window.localStorage.getItem('acceptAdvisement'))
					.then((resp) => {
						stateName === 'delete' && window.localStorage.setItem('acceptAdvisement', false);
						window.location.href =
							window.location.pathname + window.location.search + window.location.hash ||
							window.location.replace(
								window.location.pathname + window.location.search + window.location.hash
							) ||
							window.location.reload(false);
					})
					.catch((e) => {
						alert('Algo Fallo');
					})
			: this.setState({ isDeleteDisabled: true });
		// console.log('tets2', testa);
		// window.localStorage.setItem('acceptAdvisement', false);
	};
	// componentDidMount = () => {
	// 	window.localStorage.getItem('acceptAdvisement') === 'true'
	// 		? this.setState({ isDeleteDisabled: false })
	// 		: this.setState({ isDeleteDisabled: true });
	// };
	render() {
		return (
			<ul className="listNav" id="myTopnav">
				<li className="headerItem active">BSs</li>
				<li
					key="refreshDB"
					className={`headerItem headerItemRight ${this.state.isDeleteDisabled && 'disabled_click'} `}
				>
					<i className="fas fa-sync-alt" onClick={this.toogleModal}>
						{' '}
						Refresh DB
					</i>
					{this.state.isAdvisementOpenStore && (
						<ModalAdvisement isAdvisementOpenStore={this.state.isAdvisementOpenStore}>
							<div className="profile-modal">
								<article className="modalInfoContainer">
									<div className="containerInfoAdvisement">
										<div className="modal-close" onClick={this.toogleModal}>
											&times;
										</div>
										<div className="contentAdvisement">
											En la version actual, unicamente soporta la accion ELIMINARAR todos los
											datos almacenados localmente y volver a extraer los nuevos datos desde el
											servidor
										</div>
										<div className="betaversion">V0.5.3,"BETA"</div>
										<button
											className="aceptarActualizacion"
											onClick={this.deleteLocalDB.bind(this, 'update')}
										>
											Aceptar
										</button>
									</div>
								</article>
							</div>
						</ModalAdvisement>
					)}
				</li>
				<li key="deletedb" className={`headerItem ${this.state.isDeleteDisabled && 'disabled_click'}`}>
					<i className="fas fa-eraser" onClick={this.deleteLocalDB.bind(this, 'delete')}>
						{' '}
						Eliminar DB
					</i>
				</li>
				<li className="icon headerItemRight" onClick={this.changeNav}>
					<i className="fas fa-bars" />
				</li>
			</ul>
		);
	}
}
