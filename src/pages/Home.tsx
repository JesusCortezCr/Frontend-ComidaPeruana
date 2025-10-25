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
        </>
    );
};

export default Home;
