import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Category from "./category";
import { generateCategories } from "../utils/generateCategories";

const categoryBackgrounds = {
  Zapatos: "/zapatillas.jpg",
  Accesorios: "/articulos.jpg",
  Ropa: "/ropa.jpg",
};

const CategoryList = () => {
  const categories = generateCategories();

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
            <a href={`/productos?category=${category}`}>
              <Category
                imageSrc={categoryBackgrounds[category]}
                title={category}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
