import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Category from "./category";

// Importar imágenes desde assets
import img1 from "../assets/categoria_zapatillas.jpg";
import img2 from "../assets/categoria_imagenes.jpg";
import img3 from "../assets/categoria_articulos.jpg";

const categories = [
  { imageSrc: img1, title: "Zapatos" },
  { imageSrc: img2, title: "Ropa" },
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


// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";
// import Category from "./category";

// const CategoryList = () => {
//   return (
//     <div className="container mx-auto px-4">
//       <Swiper
//         slidesPerView={1}  // 1 categoría en móvil
//         spaceBetween={10}
//         breakpoints={{
//           640: { slidesPerView: 2 },  // 2 categorías en tablet
//           1024: { slidesPerView: 3 }, // 3 categorías en escritorio
//         }}
//         pagination={{ clickable: true }} // Muestra los puntos de navegación
//         autoplay={{ delay: 3000 }} // Se desliza automáticamente cada 3s
//         modules={[Pagination, Autoplay]}
//         className="w-full"
//       >
//         <SwiperSlide>
//           <Category />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Category />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Category />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Category />
//         </SwiperSlide>
//         <SwiperSlide>
//           <Category />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default CategoryList;
