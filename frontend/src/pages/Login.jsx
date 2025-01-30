import Footer from "../components/footer";
import Header from "../components/header";
import UserInput from "../components/user-input";

function Login() {
  return (
    <>
      <Header />
      <div className="container mx-auto flex items-center justify-center">
        <div className="grid grid-cols-2 border border-black rounded-sm w-2/3 my-10">
          <div className="flex flex-col bg-gray-900 items-center text-white px-12 gap-4 py-10">
            <img src="/logo.svg" alt="logo" className="w-20" />
            <h2 className="text-3xl font-bold">Bienvenido</h2>
            <p className="text-xl font-light">
              Que bueno tenerte por aca nuevamente
            </p>
            <img src="/usericon.svg" alt="user icon" className="w-16" />
            <UserInput placeholder="ingrese su usuario" />
            <UserInput placeholder="ingrese su pass" />
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <p>Recordar</p>
                <input type="checkbox" />
              </div>
              <div>
                <p>Olvide la contraseña</p>
              </div>
            </div>
            <button className="border-sm bg-blue-400 py-2 px-2 rounded-sm w-full">
              Iniciar
            </button>
          </div>
          <div className="relative">
            <img src="/login.png" alt="loginimg" className="object-cover" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
