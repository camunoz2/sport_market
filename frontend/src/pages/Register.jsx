import React from "react";

// const Register = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
//         {/* Lado Izquierdo - Ilustración */}
//         <div className="w-1/2 bg-black flex items-center justify-center p-8">
//           <div className="text-white text-center">
//             <h2 className="text-2xl font-semibold mb-4">Registro de usuarios</h2>
//             <img
//               src="/illustration.svg"
//               alt="Registro"
//               className="max-w-xs mx-auto"
//             />
//           </div>
//         </div>
//         {/* Lado Derecho - Formulario */}
//         <div className="w-1/2 p-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-6">
//             Ingresa tus datos
//           </h2>
//           <form>
//             <input type="text" placeholder="Nombre" className="input-field" />
//             <input type="text" placeholder="Apellido" className="input-field" />
//             <input type="email" placeholder="Email" className="input-field" />
//             <input type="text" placeholder="Dirección" className="input-field" />
//             <input type="tel" placeholder="Teléfono" className="input-field" />
//             <input type="password" placeholder="Contraseña" className="input-field" />
//             <input type="password" placeholder="Confirmar contraseña" className="input-field" />
//             <div className="flex gap-4 mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
//                 Registrarse
//               </button>
//               <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full">
//                 Cancelar
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import Footer from "../components/footer";
import Header from "../components/header";
import UserInput from "../components/user-input";

function Register() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Lado Izquierdo - Ilustración */}
        <div className="w-1/2 bg-gray-800 flex items-center justify-center p-8">
        
          <div className="text-white text-center">
          <img src="/logo.svg" alt="logo" className="w-20" />
            <h2 className="text-3xl font-bold">Registro de usuarios</h2>
            <img
              src="/register.svg"
              alt="Registro"
              className="max-w-xs mx-auto"
            />
          </div>
        </div>
        {/* Lado Derecho - Formulario */}
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Ingresa tus datos
          </h2>
          <form>
            <input type="text" placeholder="Nombre" className="input-field" />
            <input type="text" placeholder="Apellido" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="text" placeholder="Dirección" className="input-field" />
            <input type="tel" placeholder="Teléfono" className="input-field" />
            <input type="password" placeholder="Contraseña" className="input-field" />
            <input type="password" placeholder="Confirmar contraseña" className="input-field" />
            <div className="flex gap-4 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                Registrarse
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>










      <Footer />
    </>
  );
}

export default Register;
