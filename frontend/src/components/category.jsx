const Category = ({ imageSrc, title }) => {
  return (
    <div className="relative w-full h-64 rounded-md overflow-hidden border border-black">
      {/* Imagen de la categoría */}
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover"
      />
      
      {/* Texto encima de la imagen */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h2 className="text-white text-xl font-bold uppercase">{title}</h2>
      </div>
    </div>
  );
};

export default Category;

// const Category = () => {
//   return (
//     <div className="border-1 border-black rounded-sm flex items-center justify-center h-64">
//       <div className="rounded-sm border-1 border-black text-center uppercase">
//         <h2>Categoria</h2>
//       </div>
//     </div>
//   );
// };

// export default Category;
