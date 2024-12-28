import './index.css'

export const metadata = {
  title: "Inicio - Warrior Esports",
  description: "Pagina de Inicio de Warrior Esports",
};

export default function Home() {
  return (
    <>
      <div className="background">
        <main>
          <div className="presentacion-container">
            <div className="presentacion">
              <iframe id="video-presentacion" src="https://www.youtube.com/embed/NcQgg-MvgFw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        </main>
        <section className="Texto-main">
          <h1 className="titulo">LETS BE WARRIORS</h1>
          <p className="texto">Warriors Esports nace con la ambición de conquistar los más altos niveles en el competitivo mundo de los videojuegos. Nuestro equipo está formado por jugadores talentosos y dedicados que comparten una pasión por la excelencia y el deseo de dejar huella en cada torneo. Inspirados por la disciplina, el trabajo en equipo y la resiliencia de los guerreros legendarios, buscamos no solo ganar, sino también elevar el estándar del juego competitivo. Nuestro objetivo es construir una organización sólida, que fomente el crecimiento personal y profesional de nuestros miembros, y nos permita convertirnos en referentes dentro de la escena de los e-sports a nivel mundial. Con determinación, compromiso y visión de futuro, los Warriors Esports están listos para llegar a lo más alto.</p>
        </section>
      </div>
    </>
  );
}
