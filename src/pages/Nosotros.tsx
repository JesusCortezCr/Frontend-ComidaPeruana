
import { Integrantes } from "../data/Integrantes";

const Nosotros = () => {
  return (
    <div className="w-full min-h-screen bg-[#dad69b2c] p-6 md:p-15 ">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-9 md:p-20">

        <h1 className="text-3xl font-bold text-center text-[#413636] mb-6 opacity-0 translate-y-5 animate-fade-in">
          Sobre nosotros
        </h1>

        <p className="text-gray-700 text-1xl leading-relaxed mb-6 text-justify opacity-0 translate-y-5 animate-fade-in delay-100">
          En <span className="font-semibold">SoftEat</span> nos sentimos
          orgullosos de ofrecer lo mejor de nuestra cultura gastronómica en cada mesa.
          Nuestro impacto en la industria se debe a la pasión y dedicacion con la que preparamos
          cada plato especial, asimismo combinando recetas tradicionales con un servicio moderno accesible y de calidad para que nuestros clientes estén satisfechos.
        </p>

        <div className="mt-10 opacity-0 translate-y-5 animate-fade-in delay-200">
          <h2 className="text-3xl font-bold text-center text-[#413636] mb-6 opacity-0 translate-y-5 animate-fade-in">
            Nuestro equipo de trabajo
          </h2>
          <br />

          <div className="flex flex-col items-center space-y-12">
            {Integrantes.map((miembro, i) => (
              <div
                key={miembro.id}
                className="flex flex-col items-center bg-gradient-to-b from-amber-50 to-white rounded-2xl shadow-lg p-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <img
                  src={miembro.imagen}
                  alt={miembro.nombre}
                  className="w-90 h-120 object-cover rounded-xl mb-5 border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-bold text-[#413636]">{miembro.nombre}</h3>
                <p className="text-gray-600 text-sm mb-1">{miembro.carrera}</p>
                <p className="text-gray-700 text-center mt-2 px-4">
                  {miembro.descripcion}
                </p>
              </div>
            ))} 
          </div>

          <p className="text-center text-gray-600 mt-10">
            Un equipo comprometido en rescatar la esencia de nuestra cocina peruana.
          </p>
        </div>
        <br />

        <div className="mt-10 opacity-0 translate-y-5 animate-fade-in delay-300">
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Ofrecemos una amplia variedad de comidas típicas de nuestro Perú, como el clásico
            <span className="font-semibold"> Ceviche</span>, el delicioso
            <span className="font-semibold"> Lomo Saltado</span> y la representativa
            <span className="font-semibold"> Causa Rellena</span>, entre muchos otros.
            Cada plato refleja la riqueza cultural y la diversidad de sabores de
            nuestras regiones.
          </p>
        </div>
        <br />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 translate-y-5 animate-fade-in delay-400">
          <div className="bg-[#E56767] text-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-3">Misión</h2>
            <p>
              Nuestra misión es poder brindar experiencias gastronómicas únicas que difundan las recetas
              más representativas de nuestra cocina peruana, compartiendo tradición y
              sabor en cada plato.
            </p>
          </div>


          <div className="bg-[#473B3B] text-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-3">Visión</h2>
            <p>
              Nuestra visión es poder ser reconocidos como líderes en la difusión de la gastronomía
              peruana, innovando siempre en la preparación de nuestros platos sin perder nuestras raíces y llevando los sabores
              del Perú al mundo entero.
            </p>
          </div>
        </div>
        <br />

        <div className="mt-10 opacity-0 translate-y-5 animate-fade-in delay-600">
          <h2 className="text-3xl font-bold text-center text-[#413636] mb-6 opacity-0 translate-y-5 animate-fade-in">
            Un poco de nuestra variedad de platos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { src: "/ceviche.png", nombre: "Ceviche", desc: "El famoso plato peruano con pescado fresco" },
              { src: "/lomoSaltado.png", nombre: "Lomo Saltado", desc: "Fusión perfecta entre lo criollo y lo oriental" },
              { src: "/causaRellena.png", nombre: "Causa Rellena", desc: "Papa amarilla, ají y creatividad peruana" },
              { src: "/ajiGallina.png", nombre: "Ají de Gallina", desc: "Salsa cremosa con el sabor de casa" },
              { src: "/anticuchos.png", nombre: "Anticuchos", desc: "Tradición y sabor" },
              { src: "/papaHuancaina.png", nombre: "Papa a la Huancaína", desc: "Entrada típica con salsa amarilla" }
            ].map((plato, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-transform duration-300 hover:scale-105 opacity-0 translate-y-5 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={plato.src}
                  alt={plato.nombre}
                  className="h-32 w-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-[#413636]">{plato.nombre}</h3>
                <p className="text-sm text-gray-600 text-center mt-1">{plato.desc}</p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Nosotros;
