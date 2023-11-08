import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carrucel from './components/carrucel';
import Navbar from "./components/Navbar";
import ProductsSection from './components/ProductsSection';
import ProductoTableRow from './components/ProductoTableRow';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';



function App() {
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [gestionVisible, setGestionVisible] = useState(false);
  const [marca, setMarca] = useState("");
  const [estilo, setEstilo] = useState("");
  const [ram, setRAM] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [procesador, setProcesador] = useState("");
  const [estiloteclado, setEstiloTeclado] = useState("");
  const [definicionpantalla, setDefinicionPantalla] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen_Url, setImagenUrl] = useState("");
  const [id, setId] = useState("");
  const [productosList, setProductos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [detallesVisibles, setDetallesVisibles] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);

  //crear producto//
  const add = () => {
    if (!marca || !estilo || !ram || !almacenamiento || !procesador || !estiloteclado || !definicionpantalla || !precio || !descripcion || !imagen_Url) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son requeridos',
      });
      return;
    }
    if (editar) {
      Axios.put(`http://localhost:3001/update/${id}`, {
        marca, estilo, ram, almacenamiento, procesador, estiloteclado, definicionpantalla, precio, descripcion, imagen_Url
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            html: `Producto <b>${marca}</b> actualizado con éxito`,
          });
          resetForm();
          getproductos();
        })
        .catch(error => {
          console.error("Error al actualizar producto:", error);
        });
    } else {
      Axios.post("http://localhost:3001/create", {
        marca, estilo, ram, almacenamiento, procesador, estiloteclado, definicionpantalla, precio, descripcion, imagen_Url
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            html: `Producto <b>${marca}</b> registrado con éxito`,
          });
          resetForm();
          getproductos();
        })
        .catch(error => {
          console.error("Error al agregar producto:", error);
        });
    }
  };


//agregar al carrito //
const agregarAlCarritoDesdeLista = (producto) => {
  const productoEnCarrito = carrito.find(item => item.id === producto.id);

  if (!productoEnCarrito) {
    setCarrito([...carrito, { ...producto, cantidad: 1 }]);
  }
};

const removeFromCart = (producto) => {
  const nuevoCarrito = carrito.filter(item => item.id !== producto.id);
  setCarrito(nuevoCarrito);
};
  
  
//buscar producto//
const getproductos = useCallback(() => {
  console.log("Búsqueda:", busqueda);
  Axios.get("http://localhost:3001/products")
    .then((response) => {
      const productosFiltrados = response.data.filter((producto) =>
        producto.marca.toLowerCase().includes(busqueda.toLowerCase())
      );
      setProductos(productosFiltrados);
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
    });
}, [busqueda]);

//editar producto//
const editarProducto = (val) => {
  setEditar(true);

  setMarca(val.marca);
  setEstilo(val.estilo);
  setRAM(val.ram);
  setAlmacenamiento(val.almacenamiento);
  setProcesador(val.procesador);
  setEstiloTeclado(val.estiloteclado);
  setDefinicionPantalla(val.definicionpantalla);
  setPrecio(val.precio);
  setDescripcion(val.descripcion);
  setImagenUrl(val.imagen_Url);
  setId(val.id);
};

//eliminar producto//
const Delete = (id, marca) => {
  Swal.fire({
    title: '¿Estás seguro?',
    html: `¡No podrás revertir esto! Estás a punto de eliminar el producto: <b>${marca}</b>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              html: `Producto <b>${marca}</b> eliminado con éxito`,
            });
            getproductos();
          })
          .catch(error => {
            console.error("Error al eliminar producto:", error);
          });
      }
    });
};


//ver 
const toggleDetalles = (productId) => {
  setDetallesVisibles((prevDetallesVisibles) => ({
    ...prevDetallesVisibles,
    [productId]: !prevDetallesVisibles[productId],
  }));
};
  
const resetForm = () => {
  setEditar(false);
  setMarca("");
  setEstilo("");
  setRAM("");
  setAlmacenamiento("");
  setProcesador("");
  setEstiloTeclado("");
  setDefinicionPantalla("");
  setPrecio("");
  setDescripcion("");
  setImagenUrl("");
  setId("");
};

useEffect(() => {
  getproductos();
}, [getproductos]);

  return (
    <div>
     <Navbar setBusqueda={setBusqueda} />
    <div id="inicio" className="container mt-5 inicio">
      <br />
      <Carrucel />
      {gestionVisible && (
        <div className="datos bg-light p-4 rounded">
          <h2 className="productos-title">Gestión de productos</h2>
          <div className="row">
            <form className="col-md-8">
                <div className="row mb-3">
                  <label htmlFor="marca" className="col-sm-2 col-form-label">Marca:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="marca" value={marca} onChange={(e) => setMarca(e.target.value)} required/>
                  </div>
                </div>
              <div className="row mb-3">
                  <label htmlFor="estilo" className="col-sm-2 col-form-label">Estilo:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="estilo" value={estilo} onChange={(e) => setEstilo(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="ram" className="col-sm-2 col-form-label">RAM:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="ram" value={ram} onChange={(e) => setRAM(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="almacenamiento" className="col-sm-2 col-form-label">Almacenamiento:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="almacenamiento" value={almacenamiento} onChange={(e) => setAlmacenamiento(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="procesador" className="col-sm-2 col-form-label">Procesador:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="procesador" value={procesador} onChange={(e) => setProcesador(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="estiloTeclado" className="col-sm-2 col-form-label">Estilo de teclado:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="estiloTeclado" value={estiloteclado} onChange={(e) => setEstiloTeclado(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="definicionPantalla" className="col-sm-2 col-form-label">Definición de pantalla:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="definicionPantalla" value={definicionpantalla} onChange={(e) => setDefinicionPantalla(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="precio" className="col-sm-2 col-form-label">Precio:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
                  <div className="col-sm-6">
                    <textarea className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="imagenUrl" className="col-sm-2 col-form-label">URL de la Imagen:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="imagenUrl" value={imagen_Url} onChange={(e) => setImagenUrl(e.target.value)} />
                  </div>
                </div>
                </form>
                {editar ? (
              <div>
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  onClick={add}
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn btn-info m-2"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={add}>
                  <FontAwesomeIcon icon={faPlus} /> Registrar Producto
                </button>
              </div>
            )}
            <form />
            <div />
            <div><br/>

            <h2 className="productos-title">Lista de Productos</h2>
              <table className="table table-striped">
                <thead>
                <tr>
                <th scope="col">ID</th>
                  <th scope="col">Marca</th>
                  <th scope="col">RAM</th>
                  <th scope="col">Almacenamiento</th>
                  <th scope="col">Procesador</th>
                  <th scope="col">Estilo Teclado</th>
                  <th scope="col">Definición Pantalla</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Imagen</th>
                  <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                  {productosList.map((producto) => (
                    <ProductoTableRow
                      key={producto.id}
                      val={producto}
                      editarProducto={editarProducto}
                      Delete={Delete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}<br/>
      
      <div className="d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setGestionVisible(!gestionVisible)}
      >
        {gestionVisible ? (
          <>
            <FontAwesomeIcon icon={faTimes} /> Cerrar Gestión
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faEdit} /> Abrir Gestión
          </>
        )}
      </button>
      </div>
    </div>
  

      <div id="productos" className="container mt-5 productos">
      <ProductsSection 
          busqueda={busqueda} 
          setBusqueda={setBusqueda} 
          carritoVisible={carritoVisible}
          setCarritoVisible={setCarritoVisible}
          carrito={carrito}
          removeFromCart={removeFromCart}
          productosList={productosList}
          detallesVisibles={detallesVisibles}
          toggleDetalles={toggleDetalles}
          agregarAlCarritoDesdeLista={agregarAlCarritoDesdeLista}
        />
      </div>
  </div>
);
};

export default App;
