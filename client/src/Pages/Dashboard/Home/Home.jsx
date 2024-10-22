import React, { useContext, useState } from "react";
import "./home.scss";
import { AppContext } from "../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { categories, products } = useContext(AppContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  const handleCategorySelect = (categoryName) => {
    navigate("/shop/allProducts", { state: { categoryName } });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Obtener las categorías actuales para mostrar
  const currentCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Función para ir a la página seleccionada
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const colaboraciones = [
    {
      title: "Newborn",
      imgSrc: "bebe.jpg",
    },
    {
      title: "Embarazo",
      imgSrc: "embarazo.avif",
    },
    {
      title: "Retratos Fine Art",
      imgSrc: "fine.jpg",
    },
    {
      title: "Retrato Familiar",
      imgSrc: "familia.jpg",
    },
  ];

  const testimonios = [
    {
      quote: "“Quote”",
      title: "Elegante y Delicado",
      description:
        "El macramé es perfecto para añadir un toque bohemio y elegante a cualquier espacio. Su delicado diseño hecho a mano resalta la artesanía.",
      image: "prueba1.jpg",
    },
    {
      quote: "“Quote”",
      title: "Ideal para Decoración",
      description:
        "Un producto versátil que se adapta a cualquier estilo de decoración. Es ideal para dar calidez y textura a las paredes.",
      image: "prueba2.jpg",
    },
    {
      quote: "“Quote”",
      title: "Resistente y Duradero",
      description:
        "Me sorprendió lo resistente que es este macramé, se nota que está hecho con materiales de calidad y durará mucho tiempo.",
      image: "prueba3.jpg",
    },
    {
      quote: "“Quote”",
      title: "Perfecto para Regalos",
      description:
        "Compré un macramé como regalo y fue un éxito. Es un detalle hermoso y artesanal, perfecto para ocasiones especiales.",
      image: "prueba4.jpg",
    },
    {
      quote: "“Quote”",
      title: "Versatilidad de Uso",
      description:
        "Desde colgantes de pared hasta portamacetas, el macramé es increíblemente versátil. Encaja en cualquier ambiente.",
      image: "prueba5.jpeg",
    },
    {
      quote: "“Quote”",
      title: "Añade un Toque Natural",
      description:
        "El macramé, hecho con fibras naturales, aporta una sensación de naturaleza y frescura a la decoración de cualquier hogar.",
      image: "prueba6.jpg",
    },
  ];

  const obtenerImagenDeCategoria = (categoryId) => {
    const imageUrl = `${apiUrl}images/categories/${categoryId}`;
    const placeholderImage = `${apiUrl}/images/categories/default.jpg`;
    return imageUrl ? imageUrl : placeholderImage;
  };

  return (
    <>
      <div className="cont-img-home">
        <img
          className="img-home"
          src="IMG-home-prueba.jpg"
          alt="bebe portada"
        />
      </div>

      <div className="container-xxl">
        <section className="section1-home">
          <img className="img-sobre-mi" src="TANGER-SOBRE-MI.png" alt="sobre mi" />
          <div className="sec1-sobre-mi">
            <div className="sm cont-img">
              <img className="sm-img" src="/CORINNE.jpg" alt="corinne" />
            </div>
            <div className="sm sm-text">
              <p>Corinne: Tejedora de sueños para fotógrafos creativos.</p>
              <p>
                Hola, soy Corinne, y te doy la bienvenida a mi rinconcito de
                inspiración.
              </p>
              <p>
                Soy una mujer inquieta, curiosa, creativa, apasionada… y siento
                que lo más importante de la vida está en la ilusión, la
                fantasía, los detalles, el cariño… Desde niña, he sentido una
                profunda conexión con la naturaleza y la artesanía. La pasión
                por la fotografía me ayudó durante años a expresar mi
                creatividad, inspirándome en el mundo infantil y su fantasía,
                buscando conectar con mis pequeños protagonistas y emocionar a
                sus familias en cada sesión de fotos. Ma petite Corinne nació de
                la ilusión de fusionar mis dos pasiones, la fotografía y la
                artesanía. El arte del macramé me atrapó desde el primer nudo, y
                encendió la chispa de la creatividad con la que doy vida a mis
                diseños. Cada nudo, cada puntada, cada fibra… cuenta una
                historia. Cada pieza que diseño es una expresión de mi deseo de
                crear ambientes llenos de magia y ternura para las sesiones de
                maternidad y bebés más inspiradoras y emotivas. ¡Gracias por
                visitarme! Deseo que nuestro encuentro sea el inicio de una
                bonita historia de complicidad, ilusión e inspiración que nos
                ayude a crear juntos obras únicas que ilusionen, emocionen y
                perduren para siempre.
              </p>
            </div>
          </div>
        </section>

        <div className="por-que-elegir text-center pt-5 pb-5">
          <img
            src="TANGER-MA-PETITE-CORINNE.png"
            alt="mapetitecorinne"
            className="img-ma-petite pb-3"
          />
          <div className="container">
            <h2 className="title pb-2 pt-5">
              ¿Por qué elegir Ma petite Corinne?
            </h2>

            <div className="feature">
              <h3 className="feature-title ">Diseño exclusivo hecho a mano</h3>
              <p className="feature-text ">
                Atrezo y macramé artesanal diseñado para tus sesiones
                fotográficas más personales. Elaborado a mano, nudo a nudo,
                puntada a puntada, cuidando cada detalle para conseguir un
                acabado profesional. Confía en mis creaciones exclusivas para
                convertir tus fotografías más especiales en obras únicas.
              </p>
            </div>

            <div className="feature">
              <h3 className="feature-title">Creaciones personalizadas</h3>
              <p className="feature-text">
                Soy Artesana con corazón de Fotógrafa. Imagina tu escenario, tus
                fotografías soñadas, y hagámoslas realidad. Marca la diferencia
                con atrezo artesanal adaptado a tu estilo, idea, sueño… Teje
                conmigo tu proyecto ideal.
              </p>
            </div>

            <div className="feature">
              <h3 className="feature-title">Marca sostenible y ética</h3>
              <p className="feature-text">
                Utilizo materiales sostenibles como el algodón reciclado y la
                madera natural, buscando fabricantes y proveedores de
                proximidad. Apostar por la producción local y el uso de
                materiales sostenibles garantiza el cuidado de nuestro planeta.
              </p>
              <p className="feature-text">
                Realizo colaboraciones con artesanos nacionales para garantizar
                productos originales, auténticos, respetuosos con el medio
                ambiente y con las personas.
              </p>
            </div>

            <div className="feature">
              <h3 className="feature-title">
                Innovación constante y versatilidad
              </h3>
              <p className="feature-text">
                Reinventando los clásicos del atrezo fotográfico, ofreciendo
                diseños originales y exclusivos que marcarán la diferencia en
                tus sesiones.
              </p>
              <p className="feature-text">
                Colaborando contigo, crearemos vestuario, decoraciones y
                accesorios únicos para que la artesanía de Ma petite Corinne
                haga realidad tu idea soñada.
              </p>
              <p className="feature-text">
                Una pieza, varias aplicaciones… En mis diseños tengo siempre en
                cuenta su facilidad de uso, su comodidad, su practicidad… y
                también su versatilidad. Encontrarás piezas que se adaptarán a
                varios usos, solas o combinadas en conjuntos, que facilitarán
                versatilidad en tus sesiones. Con el atrezo de Ma petite Corinne
                tu proceso fotográfico será más fácil, y el resultado tendrá una
                armonía única que emocionará a tus clientes.
              </p>
            </div>

            <div className="feature">
              <h3 className="feature-title">Naturalmente… Calidad</h3>
              <p className="feature-text">
                Cada fibra cuenta, cada nudo cuenta. Atrezo y macramé diseñado
                para emocionar y elaborado para perdurar. Utilizo materiales
                sostenibles de primera calidad y procesos artesanales para
                garantizar la durabilidad y belleza de cada una de mis
                creaciones artesanales.
              </p>
            </div>

            <div className="feature">
              <h3 className="feature-title">Talento artesano inclusivo</h3>
              <p className="feature-text">
                Apuesta por el comercio cercano, ético y solidario. Desde una
                visión muy personal, he creado proyectos de colaboración con
                personas dis capacitadas con gran talento y mejor corazón, para
                que la inclusión sea una realidad y cada nudo tenga sentido más
                allá del diseño y del producto final.
              </p>
            </div>

            <div className="call-to-action">
              <p>
                Si eres fotógrafo y buscas atrezo artesanal, exclusivo y de
                calidad para tus sesiones, te invito a explorar mi catálogo.
              </p>
              <p>¡Contacta conmigo y juntos crearemos imágenes inolvidables!</p>
            </div>
          </div>
        </div>
        <section className="section2-tienda">
          <img className="img-tienda" src="TANGER-TIENDA.png" alt="tienda" />
          <div className="sec2-categories">
            {currentCategories.map((cat) => {
              const categoryImage = obtenerImagenDeCategoria(cat.img);
              return (
                <div
                  key={cat.img}
                  className="categories-item"
                  onClick={() => handleCategorySelect(cat.category_name)}
                >
                  <img
                    src={categoryImage}
                    onError={(e) => {
                      e.target.src = `${apiUrl}/images/categories/default.jpg`;
                    }}
                    alt={cat.category_name}
                  />
                  <div className="overlay">
                    <div className="text">{cat.category_name}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`dot ${index === currentPage ? "active" : ""}`}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>
        </section>
        <section className="section3-colaboradores">
          <img
            className="img-colaboraciones"
            src="TANGER-COLABORADORES.png"
            alt="colaboraciones"
          />
          <div className="sec3-colaboraciones">
            {colaboraciones.map((cat, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={cat.imgSrc}
                  alt={cat.title}
                  className="gallery-image"
                />
                <div className="overlay">
                  <div className="text">{cat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="section4-testimonios pb-5">
          <img
            className="img-testimonios"
            src="TANGER-TESTIMONIOS.png"
            alt="testimonios"
          />
          <div className="testimonial-gallery">
            {testimonios.map((testimonio, index) => (
              <div className="testimonial-card" key={index}>
                <p className="quote">{testimonio.quote}</p>
                <h3 className="title">{testimonio.title}</h3>
                <p className="description">{testimonio.description}</p>
                <img
                  src={testimonio.image}
                  alt="Testimonial"
                  className="testimonial-image"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
