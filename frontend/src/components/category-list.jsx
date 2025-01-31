import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Category from "./category";

// Importar imágenes desde assets
import img1 from "../assets/ropa.jpg";
import img2 from "../assets/zapatillas.jpg";
import img3 from "../assets/articulos.jpg";

const categories = [
  { imageSrc: img1, title: "Ropa" },
  { imageSrc: img2, title: "Zapatos" },
  { imageSrc: img3, title: "Accesorios" }
];

const CategoryList = () => {
  return (
    <div className="container mx-auto px-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Category imageSrc={category.imageSrc} title={category.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
