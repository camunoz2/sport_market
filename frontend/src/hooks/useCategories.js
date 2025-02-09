import { useState, useEffect } from "react";
import axios from "axios";

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("http://localhost:5454/api/categories", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        setCategories(response.data.categories);
        console.log("Categories fetched:", response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return { categories };
}

export default useCategories;
