import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Productos.css';

const ProductsSection = ({
  busqueda,
  setBusqueda,
  carritoVisible,
  setCarritoVisible,
  carrito,
  removeFromCart,
  productosList,
  detallesVisibles,
  toggleDetalles,
  agregarAlCarritoDesdeLista,
}) => {
  const hayProductosEnCarrito = carrito.length > 0;
  const hayProductosParaMostrar = productosList && productosList.length > 0;

  return (
    <>
      {hayProductosParaMostrar && (
        <div className={`container mt-4 ${hayProductosEnCarrito && carritoVisible ? 'has-cart' : ''}`}>
          <div className="row">
            <div className={`col-md-${hayProductosEnCarrito && carritoVisible ? '8' : '12'}`}><br/>
              <h2 className="productos-title text-center productos">Lista de Productos</h2>
              <div className="row mb-2">
                <label htmlFor="busqueda" className="col-sm-2 col-form-label text-start"></label>
                <div className="col-md-8 mb-4 productos-container">
                  <input
                    type="text"
                    placeholder="Buscar por marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="form-control mb-4"
                  />
                  <button className="btn btn-info" onClick={() => setCarritoVisible(!carritoVisible)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {carritoVisible ? 'Cerrar Carrito' : 'Abrir Carrito'}
                  </button>
                  {carritoVisible && !hayProductosEnCarrito && (
                    <p className="text-warning mt-2">El carrito está vacío.</p>
                  )}
                </div>
              </div>
              <div className="row">
                {productosList.map((val, key) => (
                  <div key={key} className={`col-md-${carritoVisible ? '4' : '4'} mb-4`}>
                    <div
                      className={`card ${
                        detallesVisibles[val.id]
                          ? 'animate__animated animate__fadeInUp'
                          : ''
                      }`}
                      style={{ margin: '10px' }}
                    >
                      <img
                        src={val.imagen_Url}
                        className="card-img-top"
                        alt={val.marca}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{val.marca}</h5>
                        <p
                          className={`card-text ${
                            detallesVisibles[val.id] ? '' : 'overflow-hidden'
                          }`}
                        >
                          {val.descripcion}
                        </p>
                      </div>
                      <ul
                        className={`list-group list-group-flush ${
                          detallesVisibles[val.id] ? '' : 'd-none'
                        }`}
                      >
                        <li className="list-group-item">
                          <span className="descripcion">Estilo:</span> {val.estilo}
                        </li>
                        <li className="list-group-item">
                          <span className="descripcion">RAM:</span> {val.ram}
                        </li>
                        <li className="list-group-item">
                          <span className="descripcion">Almacenamiento:</span> {val.almacenamiento}
                        </li>
                        <li className="list-group-item">
                          <span className="descripcion">Procesador:</span> {val.procesador}
                        </li>
                        <li className="list-group-item">
                          <span className="descripcion">Estilo de Teclado:</span> {val.estiloteclado}
                        </li>
                        <li className="list-group-item">
                          <span className="descripcion">Definición de Pantalla:</span> {val.definicionpantalla}
                        </li>
                        <li className="list-group-item">
                          <span className="descripcion">Precio:</span> {val.precio}
                        </li>
                      </ul>
                      <div className="card-body">
                        <button
                          type="button"
                          onClick={() => toggleDetalles(val.id)}
                          className="btn btn-info m-2"
                        >
                          {detallesVisibles[val.id] ? 'Ver menos' : 'Ver más'}{' '}
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </button>
                        <button
                          type="button"
                          onClick={() => agregarAlCarritoDesdeLista(val)}
                          className="btn btn-success m-2"
                        >
                          Agregar al Carrito{' '}
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {carritoVisible && hayProductosEnCarrito && ( 
              <div className="col-md-4"><br/><br/><br/><br/><br/><br/>
              <div className="carrito-container ">
              <div className="productos-title">Carrito de productos</div>
                <ul className="list-group">
                  {carrito.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.imagen_Url}
                          alt={item.marca}
                          style={{
                            maxWidth: '50px',
                            maxHeight: '50px',
                            marginRight: '10px',
                          }}
                        />
                        {item.marca} Cantidad: {item.cantidad}
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsSection;
