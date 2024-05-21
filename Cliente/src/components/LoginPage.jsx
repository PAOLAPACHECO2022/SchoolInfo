import { useState } from "react";
import React from 'react';
import '../index.css'; 
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import Modal from './Modal'; // Importa el componente modal
import '../index.css';

const LoginPage = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isLoginStudent = pageType === "loginStudent";

  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("Admin");
  const [error, setError] = useState(""); // Nuevo estado para el mensaje de error
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setDni("");
  };

  const login = async () => {
    try {
      const loggedInResponse = await fetch("http://localhost:3003/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typeUser, email, password }),
      });
      const loggedIn = await loggedInResponse.json();
      if (loggedInResponse.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      } else {
        setError(loggedIn.message || "Login failed. Please check your credentials."); // Establecer mensaje de error
        setShowModal(true); // Mostrar el modal de error
      }
    } catch (err) {
      setError("An error occurred. Please try again later."); // Establecer mensaje de error
      setShowModal(true); // Mostrar el modal de error
    }
    resetForm();
  };

  const loginStudent = async () => {
    try {
      const loggedInResponse = await fetch("http://localhost:3003/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typeUser: "Student", dni, password }),
      });
      const loggedIn = await loggedInResponse.json();
      if (loggedInResponse.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      } else {
        setError(loggedIn.message || "Login failed. Please check your credentials."); // Establecer mensaje de error
        setShowModal(true); // Mostrar el modal de error
      }
    } catch (err) {
      setError("An error occurred. Please try again later."); // Establecer mensaje de error
      setShowModal(true); // Mostrar el modal de error
    }
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Restablecer mensaje de error antes de intentar iniciar sesión
    if (isLogin) await login();
    if (isLoginStudent) await loginStudent();
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  return (
    <div className="inicios">
      <div className="text-center mt-5 mx-5 my-5">
        <h1 className="text-5xl font-extrabold dark:text-white">
          <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400 ">
            Welcome to the School
          </small>
        </h1>
      </div>
    
      <div id="card_cuadro">
        <div className="card d-flex text-center rounded-md" id="card_sesion">        
          <form className="p-10" onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type of User
                  </label>
                  <select
                    value={typeUser}
                    onChange={(e) => setTypeUser(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </>
            ) : (
              <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  DNI
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="78909889"
                  onChange={(e) => setDni(e.target.value)}
                  value={dni}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-7"
              >
                {isLogin ? "LOGIN" : "LOGIN STUDENT"}
              </button>
            </div>
           
            <div className="change-login p-5" role="button">
              <strong className="text-center">
                <p 
                  onClick={() => {
                    setPageType(isLogin ? "loginStudent" : "login");
                  }}
                  className="pl-10 underline absolute"
                >
                  {isLogin ? "I'm not an admin or teacher." : "I'm not a student."}
                </p>
              </strong>
            </div>
            <a href="http://localhost:3001/contactologin">
              <div
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-500"
                onClick={() => navigate("/contactologin")}
                role="button"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.51l8 5 8-5V6H4zm16 12v-7.51l-7.39 4.62c-.33.21-.73.32-1.11.32s-.78-.11-1.11-.32L4 10.49V18h16z">
                  </path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap underline">
                  Can't log in? request to update credentials
                </span>
              </div>
            </a>
          </form>
        </div>
      </div>

      {/* Modal de error */}
      <Modal show={showModal} onClose={closeModal}>
        <p>{error}</p>
      </Modal>
    </div>
  );
};

export default LoginPage;

