import HomeCard from "../components/HomeCard";
import { HomeCards } from "../data/HomeCards";
import backgroundImage from '../assets/images/fondo.png';

const Home = () => {
    return (
        <>
            <div
                className="h-[500px] py-15 px-8 bg-cover bg-center opacity-0 translate-y-5 animate-fade-in"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <h2 className="text-[#404040] text-[70px] text-center opacity-0 translate-y-5 animate-fade-in delay-100">
                    La mejor comida
                </h2>
                <p className="text-center text-[20px] mt-10 opacity-0 translate-y-5 animate-fade-in delay-200">
                    ¿Quieres aprender y probar todo sobre la gastronomía peruana? Estas en el lugar correcto
                </p>

                <div className="flex flex-row justify-center gap-4 flex-wrap my-5 opacity-0 translate-y-5 animate-fade-in delay-300">
                    <a className="bg-[#E56767] text-white p-2 w-[150px] text-center rounded-2xl mt-20 transition-transform duration-300 hover:scale-105" href="">
                        Comprar
                    </a>
                    <a className="bg-[#FCF8F8] text-[#434343] p-2 w-[150px] text-center rounded-2xl mt-20 transition-transform duration-300 hover:scale-105" href="">
                        Explorar
                    </a>
                </div>
            </div>

            <div className="opacity-0 translate-y-5 animate-fade-in delay-400">
                <br />
                <h2 className="text-center text-4xl pt-5 text-[#2C2F24]">Explora el menú</h2>
                <div className="flex flex-row py-10 gap-3 justify-around px-3 flex-wrap opacity-0 translate-y-5 animate-fade-in delay-500">
                    {HomeCards.map((card, i) => (
                        <div
                            key={card.id}
                            className="opacity-0 translate-y-5 animate-fade-in"
                            style={{ animationDelay: `${i * 150 + 500}ms` }}
                        >
                            <HomeCard
                                icon={card.icono}
                                titulo={card.titulo}
                                descripcion={card.descripcion}
                                link={card.link}
                            />
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <br />
            </div>

            <div className="mt-10 opacity-0 translate-y-5 animate-fade-in delay-600 mb-20">
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
                  className="h-70 w-90 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-[#413636]">{plato.nombre}</h3>
                <p className="text-sm text-gray-600 text-center mt-1">{plato.desc}</p>
              </div>
            ))}
            <br />
            <br />
            <br />
          </div>
        </div>
        </>
    );
};

export default Home;
