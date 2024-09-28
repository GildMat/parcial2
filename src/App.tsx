import React, { useState } from 'react';
import './App.css';

// para poder enviar los datos hacia la api 
// se creo una constante para pedirle al usuario los datos del curso a crear
const App = () => {
  const [nombreCurso, setNombreCurso] = useState('');
  const [creditos, setCreditos] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardar = async () => {
    const cursoData = {
      nombre: nombreCurso,
      creditos: parseInt(creditos),
      descripcion,
    };
//atraves del metodo post se envian en formato json los datos del cuarso
    try {
      const response = await fetch('https://test-deploy-12.onrender.com/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursoData),
      });

      if (response.ok) {
        alert('Curso guardado exitosamente');
        limpiarCampos();
      } else {
        alert('Error al guardar el curso');
      }
    } catch (error) {
      console.error('Error al guardar el curso:', error);
      alert('Error al conectar con el servidor');
    }
  };

  /// se creo la contante para poder limpiar los datos escritos en el formulario
  const limpiarCampos = () => {
    setNombreCurso('');
    setCreditos('');
    setDescripcion('');
  };



  //formulario para capturar los datos atraves de los los set
  return (
    <div className="container">
      <h2 className="title">Registrar Curso</h2>
      <form className="form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre curso:</label>
          <input
            id="nombre"
            type="text"
            value={nombreCurso}
            onChange={(e) => setNombreCurso(e.target.value)}
            className="form-control"
            placeholder="Ingrese el nombre del curso"
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditos">Créditos:</label>
          <input
            id="creditos"
            type="number"
            value={creditos}
            onChange={(e) => setCreditos(e.target.value)}
            className="form-control"
            placeholder="Ingrese los créditos"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-control"
            placeholder="Ingrese la descripción del curso"
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleGuardar} className="btn btn-primary">
            Guardar
          </button>
          <button type="button" onClick={limpiarCampos} className="btn btn-secondary">
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
