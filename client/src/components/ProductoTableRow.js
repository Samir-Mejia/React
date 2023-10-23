import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Table.css';

const ProductoTableRow = ({ val, editarProducto, Delete }) => {
  return (
    <tr key={val.id} style={{ height: '70px' }}>
      <td>{val.id}</td>
      <td>{val.marca}</td>
      <td>{val.ram}</td>
      <td>{val.almacenamiento}</td>
      <td>{val.procesador}</td>
      <td>{val.estiloteclado}</td>
      <td>{val.definicionpantalla}</td>
      <td>{val.precio}</td>
      <td>{val.descripcion}</td>
      <td>
        <img
          src={val.imagen_Url}
          alt="Producto"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      </td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={() => editarProducto(val)}
            className="btn btn-info "
          >
            <FontAwesomeIcon icon={faEdit} /> Editar
          </button>
          <button
            type="button"
            onClick={() => Delete(val.id, val.marca)}
            className="btn btn-danger "
          >
            <FontAwesomeIcon icon={faTrash} /> Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductoTableRow;
