import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHome } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

function Navbar() {
  useEffect(() => {
    // Obtiene la ubicación actual de la ventana
    const currentLocation = window.location.hash;

    // Si la ubicación actual no es #inicio, redirige a #inicio
    if (currentLocation !== '#inicio') {
      window.location.hash = 'inicio';
    }
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="navbar-brand" href="#inicio">
                  <FontAwesomeIcon icon={faHome} /> Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#productos">
                  <FontAwesomeIcon icon={faList} /> Productos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ marginTop: '56px' }}> 
      </div>
    </>
  );
}

export default Navbar;