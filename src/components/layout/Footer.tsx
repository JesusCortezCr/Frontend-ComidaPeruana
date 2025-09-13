
const Footer=()=>{

    return(
        <>
        
        <footer className="bg-[#413636] text-gray-200">
           <div className="max-w-6xl mx-auto px-6 py-12">
            {/*Definimos grid col*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <p className="text-3xl text-[#E56767] font-bold">Reseña</p>
                    <p className="max-w-xs text-sm leading-relaxed">
                        Somos una empresa reconocida la cual ofrecemos las mejores comidas peruanas de nuestras diferentes regiones.
                    </p>

                    
                    <p className="text-3xl text-[#E56767] font-bold"> Redes sociales</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="">
                            <img className="w-8 h-8  " src="/public/facebook.png" alt="facebook" />
                        </a>

                        <a href="">
                            <img className="w-8 h-8" src="/public/youtube.png" alt="youtube"/>
                        </a>

                        <a href="">
                            <img className="w-8 h-8" src="/public/instagram.png" alt="instagram" />
                        </a>
                    </div>
                </div>


                <div className="md:flex md:justify-center">
                    <div>
                        <h3 className="font-bold text-3xl text-[#E56767]">Informacion</h3>
                       <br />
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">Inicio</a></li>
                            <li><a href="#" className="hover:text-white transition">Nosotros</a></li>
                            <li><a href="#" className="hover:text-white transition">Menu</a></li>
                            <li><a href="#" className="hover:text-white transition">Precios</a></li>
                            <li><a href="#" className="hover:text-white transition">Contacto</a></li>
                        </ul>
                    </div>
                </div>


                <div className="md:flex md:justify-end">
                    <div>
                        
                        <h3 className="text-3xl font-bold text-[#E56767]">Servicios de ayuda</h3>
                        <br />
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">Mi cuenta</a></li>
                            <li><a href="#" className="hover:text-white transition">Mis compras</a></li>
                        </ul>
                    </div>
                </div>
             </div>
            </div>

            <div className="text-center text-sm">
                  2025 Gastronomia Peruana. Todos los derechos reservados
            </div>
        </footer>
        
        </>
    )
}
export default Footer;