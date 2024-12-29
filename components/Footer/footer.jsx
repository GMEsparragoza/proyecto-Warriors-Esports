import React from 'react'
import './footer.css'

export const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-ceo">
                        <h3>Acerca del CEO</h3>
                        <p>Tyskardito, fundador y CEO de <strong>Warriors Esports</strong>, tiene una visión clara: llevar al equipo a lo más alto del mundo competitivo. Con años de experiencia en la industria, su pasión por los videojuegos ha impulsado el crecimiento de la organización.</p>
                    </div>

                    <div className="footer-redes">
                        <h3>Síguenos en</h3>
                        <ul className="social-links">
                            <li><a href="https://x.com/warriorss_esp" target="_blank">Twitter</a></li>
                            <li><a href="https://www.instagram.com/warriorss_esp/" target="_blank">Instagram</a></li>
                            <li><a href="https://www.twitch.tv/tyskardito" target="_blank">Twitch Ceo</a></li>
                            <li><a href="https://discord.gg/ZKfKuyw2Hb" target="_blank">Discord</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>&copy; 2024 Warriors Esports. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    )
}
