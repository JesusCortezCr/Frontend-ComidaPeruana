type Props={
    nombre:string;
    descripcion:string;
    carrera:string;
    imagen:string;
}

const MiembrosCard=({imagen,nombre,descripcion,carrera}:Props)=>{

    return(
        <div>
            <img src={imagen}/>
            <span>{nombre}</span>
            <span>{descripcion}</span>
            <span>{carrera}</span>
        </div>
    )
}
export default MiembrosCard;