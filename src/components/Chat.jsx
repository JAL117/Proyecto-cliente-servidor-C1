import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { IoMdChatboxes, IoMdSend } from "react-icons/io";
const apiUrl = "http://localhost:3000/";
import "../styles/chat.css"

const Messages = () => {
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const user = JSON.parse(localStorage.getItem("Usuario"));
  const socket = io(apiUrl);

  const enviarMensaje = (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("Usuario"));
    socket.emit("mensaje", {
      mensaje: mensaje,
      usuario: usuario.usuario,
      fecha: obtenerHoraActual(),
    });
    setMensaje("");
  };

  useEffect(() => {
    socket.on("mensaje", estado);

    return () => {
      socket.off("mensaje", estado);
    };
  }, []);

  const estado = (mensaje) => setMensajes((state) => [...state, mensaje]);

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
    <div className="chat-container">
      <div className="chat">
        <div className="header">
          <IoMdChatboxes size={45} />
          <h1>Chat</h1>
        </div>
        <ul className="messages">
          {mensajes.map((mensaje, index) => (
            <li
              key={index}
              className={user.usuario === mensaje.usuario ? "message" : "message2"}
            >
              {user.usuario === mensaje.usuario ? "Tú" : mensaje.usuario}:&nbsp;
              {mensaje.mensaje}
              <p className="hora">{mensaje.fecha}</p>
            </li>
          ))}
        </ul>
        <form className="form1" onSubmit={enviarMensaje}>
          <input
            placeholder="Escribe un mensaje..."
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button>
            <IoMdSend style={{ cursor: "pointer" }} size={32} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;