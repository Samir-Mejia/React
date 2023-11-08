import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar({ setBusqueda }) {
  const [busquedaLocal, setBusquedaLocal] = useState('');
  const [isOnProductosPage, setIsOnProductosPage] = useState(false);

  useEffect(() => {
    const currentLocation = window.location.hash;
    setIsOnProductosPage(currentLocation === '#productos');

    if (currentLocation !== '#inicio') {
      window.location.hash = 'inicio';
    }

    // Agregar un listener para cambios en la ubicación
    window.addEventListener("hashchange", handleHashChange);

    // Retirar el listener al desmontar el componente
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleSearch = () => {
    setBusqueda(busquedaLocal);
    setBusquedaLocal('');
    window.location.hash = 'productos';
  };

  const handleInicio = () => {
    setBusqueda('');
    window.location.hash = 'inicio';
  };

  const handleProductos = () => {
    setBusqueda('');
    window.location.hash = 'productos';
  };

  // Función para manejar cambios en la ubicación
  const handleHashChange = () => {
    const currentLocation = window.location.hash;
    setIsOnProductosPage(currentLocation === '#productos');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#inicio" onClick={handleInicio}>
            <FontAwesomeIcon icon={faHome} /> Inicio
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <a className="navbar-brand" href="#productos" onClick={handleProductos}>
              <FontAwesomeIcon icon={faList} /> Productos
            </a>
          </div>

          {isOnProductosPage && (
            <form className="form-inline ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por marca..."
                  value={busquedaLocal}
                  onChange={(e) => setBusquedaLocal(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-light" type="button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </nav>

      <div style={{ marginTop: '56px' }}></div>
    </div>
  );
}

export default Navbar;
