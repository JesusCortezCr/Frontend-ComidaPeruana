const Nosotros = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
   
        <h1 className="text-3xl font-bold text-center text-[#413636] mb-6">
          Sobre nosotros
        </h1>

    
        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
          En <span className="font-semibold">Gastronomía Peruana</span> nos sentimos
          orgullosos de ofrecer lo mejor de nuestra cultura gastronómica en cada mesa.
          Nuestro impacto en la industria se debe a la pasión y dedicacion con la que preparamos
          cada plato especial,asimismo combinando recetas tradicionales con un servicio moderno accesible y de calidad para que nuestros clientes esten satisfechos.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center text-[#413636] mb-4">
            Nuestro equipo de trabajo
          </h2>

          <div className="flex justify-center rounded-2xl overflow-hidden mb-6">
            <img
              src="/equipoGastronomico.jpg"
              alt="Equipo Gastronomía Peruana"
              className="rounded-2xl shadow-lg w-full md:w-3/4 object-cover"
            />
          </div>
          <p className="text-center text-gray-600 mt-4">
            Un equipo comprometido en rescatar la esencia de nuestra cocina peruana.
          </p>
        </div>


        <div className="mt-10">
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Ofrecemos una amplia variedad de comidas típicas de nuestro Perú, como el clásico
            <span className="font-semibold"> Ceviche</span>, el delicioso
            <span className="font-semibold"> Lomo Saltado</span> y la representativa
            <span className="font-semibold"> Causa Rellena</span>, entre muchos otros.
            Cada plato refleja la riqueza cultural y la diversidad de sabores de
            nuestras regiones.
          </p>
        </div>

        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#E56767] text-white p-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
            <h2 className="text-xl font-bold mb-3">Misión</h2>
            <p>
              Nuestra mision es poder brindar experiencias gastronómicas únicas que difundan las recetas
              más representativas de nuestra cocina peruana, compartiendo tradición y
              sabor en cada plato.
            </p>
          </div>

          <div className="bg-[#473B3B] text-white p-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
            <h2 className="text-xl font-bold mb-3">Visión</h2>
            <p>
              Nuestra vision es poder ser reconocidos como líderes en la difusión de la gastronomía
              peruana, innovando siempre en la preaparacion de nuestros platos sin perder nuestras raíces y llevando los sabores
              del Perú al mundo entero.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center text-[#413636] mb-4">
            Un poco de nuestra variedad de platos
            <br />
            <br />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <img src="/ceviche.png" alt="" className="rounded-xl shadow-md object-cover h-48 w-full transition-transform duration-200 hover:scale-105"/>
            <img src="/lomoSaltado.png" alt="" className="rounded-xl shadow-md object-cover h-48 w-full transition-transform duration-200 hover:scale-105"/>
            <img src="/causaRellena.png" alt="" className="rounded-xl shadow-md object-cover h-48 w-full transition-transform duration-200 hover:scale-105"/>
            <img src="/ajiGallina.png" alt="" className="rounded-xl shadow-md object-cover h-48 w-full transition-transform duration-200 hover:scale-105"/>
            <img src="/anticuchos.png" alt="" className="rounded-xl shadow-md object-cover h-48 w-full transition-transform duration-200 hover:scale-105"/>
            <img src="/papaHuancaina.png" alt="" className="rounded-xl shadow-md object-cover h-48 w-full transition-transform duration-200 hover:scale-105"/>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Nosotros;
