import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuariosConectados = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuariosConectados();
  }, []);

  const obtenerUsuariosConectados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios/conectados');
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Usuarios Conectados</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosConectados;