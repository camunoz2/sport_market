import Category from "./category";

const CategoryList = () => {
  return (
    <div className="container mx-auto grid grid-cols-3 gap-2">
      <Category />
      <Category />
      <Category />
    </div>
  );
};

export default CategoryList;
