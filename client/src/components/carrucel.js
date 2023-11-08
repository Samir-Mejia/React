import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/carrucel.css';

function Carrucel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (next) => setCurrentSlide(next),
  };

  const imagePaths = Array.from({ length: 5 }, (_, index) => `/images/imagen${index + 1}.jpg`);

  useEffect(() => {
    const resetCarousel = () => {
      if (currentSlide === imagePaths.length - 1) {
        setCurrentSlide(0);
      }
    };

    const intervalId = setInterval(resetCarousel, sliderSettings.autoplaySpeed);

    return () => clearInterval(intervalId);
  }, [currentSlide, imagePaths, sliderSettings.autoplaySpeed]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <div className="jumbotron">
            <h1 className="display-4">Bienvenido a Cuervo Compu-Gamer</h1>
          </div>
          <Slider {...sliderSettings} className="carousel">
            {imagePaths.map((path, index) => (
              <div key={index} className="d-flex align-items-center justify-content-center">
                <img
                  src={path}
                  alt={`Imagen ${index + 1}`}
                  className="img-fluid"
                  style={{ height: '400px', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Carrucel;
