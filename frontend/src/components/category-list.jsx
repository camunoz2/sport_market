import { motion } from "framer-motion";
import Category from "./category";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router";

const CategoryList = () => {
  const { data } = useCategories();

  return (
    <div className="overflow-hidden w-full py-6 bg-gray-100">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 12,
        }}
      >
        {data?.categories.concat(data?.categories).map((category, index) => (
          <div key={index} className="w-[300px] h-[180px] flex-shrink-0">
            <Link
              to={`/categories/${category.id}`}
              className="block w-full h-full"
            >
              <Category
                imageSrc={category.image}
                title={category.name}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryList;
