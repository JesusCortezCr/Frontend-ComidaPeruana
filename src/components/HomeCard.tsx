import { Link } from "react-router";

type Props={
    icon:React.ElementType;
    titulo:string;
    descripcion:string;
    link:string;
}

const HomeCard=({icon:Icon,titulo,descripcion,link}:Props)=>{

    return(
        <div className="border-3 border-[#BCBCBC] text-sm w-[270px] p-5 rounded-2xl flex flex-col justify-between gap-3 text-center items-center">
            <Icon className="w-16 h-16" ></Icon>
            <h3 className="text-2xl font-bold text-[#636262] ">{titulo}</h3>
            <p>{descripcion}</p>
            <Link to={link} className="bg-[#E56767] text-white p-2 w-[100px] text-center rounded-2xl">Ver más</Link>
        </div>
    )
}
export default HomeCard;