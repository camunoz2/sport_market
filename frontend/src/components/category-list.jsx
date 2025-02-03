import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Category from "./category";

const categories = [
  { imageSrc: "/articulos.jpg", title: "Ropa" },
  { imageSrc: "/zapatillas.jpg", title: "Zapatos" },
  { imageSrc: "/ropa.jpg", title: "Accesorios" },
];

const CategoryList = () => {
  return (
    <div className="container mx-auto px-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            {/* Envolver cada imagen en un enlace para redirigir */}
            <a href="/productos">
              <Category imageSrc={category.imageSrc} title={category.title} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
