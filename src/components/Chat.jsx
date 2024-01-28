import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { IoMdChatboxes, IoMdSend } from "react-icons/io";
import "../styles/chat.css";

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);

const Messages = () => {
  const [boton, setBoton] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const user = JSON.parse(localStorage.getItem("Usuario"));

  const displayBtn = () => {
    setBoton(!boton);
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("Usuario"));
    socket.emit("mensaje", {
      mensaje: mensaje,
      usuario: usuario[0].nombreDeUsuario,
      fecha: obtenerHoraActual(),
      room: usuario[0].grupo // Incluir la sala (grupo) en los datos enviados
    });
    setMensaje("");
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("Usuario"));
    socket.emit("usuarioConectado", usuario[0].grupo); // Emitir evento usuarioConectado al cargar el componente
    socket.on("mensaje", estado); // Escuchar eventos de mensajes

    return () => {
      socket.off("mensaje", estado);
    };
  }, []);

  const estado = (mensaje) => {
    setMensajes((state) => [...state, mensaje]);
  };

  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaFormateada = String(horas).padStart(2, "0");
    const minutosFormateados = String(minutos).padStart(2, "0");
    const horaActual = `${horaFormateada}:${minutosFormateados}`;
    return horaActual;
  };

  return (
    <div className="box">
      <button onClick={displayBtn}>
        <IoMdChatboxes size={45} />
      </button>
      {boton && (
        <div className="chat">
          <form onSubmit={enviarMensaje}>
            <input
              placeholder="mensaje"
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <button type="submit">
              <IoMdSend style={{ cursor: "pointer" }} size={32} />
            </button>
          </form>
          <ul>
            {mensajes.map((mensaje, i) => (
              <li
                key={i}
                className={
                  user[0].nombreDeUsuario === mensaje.usuario
                    ? "message"
                    : "message2"
                }
              >
                {user[0].nombreDeUsuario === mensaje.usuario ? "Tú" : mensaje.usuario}:&nbsp;
                {mensaje.mensaje}
                <p className="hora">{mensaje.fecha}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Messages;
