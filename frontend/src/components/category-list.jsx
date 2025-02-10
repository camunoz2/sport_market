import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Category from "./category";
import useCategories from "../hooks/useCategories";

const CategoryList = () => {
  const { categories } = useCategories();

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
            <a href={`/productos?category=${category.name}`}>
              <Category imageSrc={category.image} title={category.name} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
