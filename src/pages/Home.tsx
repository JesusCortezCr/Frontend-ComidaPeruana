import HomeCard from "../components/HomeCard";
import { HomeCards } from "../data/HomeCards";
import backgroundImage from '../assets/images/fondo.png';

const Home=()=>{

    return(
        <>

        <div className="h-[500px] py-15 px-8 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2 className="text-[#404040] text-[70px] text-center">La mejor comida</h2>
            <p className="text-center text-[20px] mt-10">¿Quieres aprender y probar todo sobre la gastronomía peruana? Estas en el lugar correcto</p>

            <div className="flex flex-row justify-center gap-4 flex-wrap my-5">
            <a className="bg-[#E56767] text-white p-2 w-[150px] text-center rounded-2xl mt-20"  href="">Comprar</a>
            <a className="bg-[#FCF8F8] text-[#434343] p-2 w-[150px] text-center rounded-2xl mt-20" href="">Explorar</a>
            </div>
        </div>
        <div>
            <h2 className="text-center text-4xl pt-5 text-[#2C2F24]">Explora el menú</h2>
            <div className="flex flex-row py-10 gap-3 justify-around px-3 flex-wrap">
                {HomeCards.map((card)=>(
                    <HomeCard key={card.id} icon={card.icono} titulo={card.titulo} descripcion={card.descripcion} link={card.link} ></HomeCard>
                ))}
            </div>
        </div>
        </>
    )
}
export default Home;