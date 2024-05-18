import React from "react";
import { cards } from "@/data";
import { Link } from "react-router-dom";

function CategorySidebar({ categoryList, onSelect }) {
  const handleCategoryClick = (category) => {
    onSelect(category);
  };

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div>
        {cards.map((category, index) => (
          <div 
            key={index}
            onClick={() => handleCategoryClick(category.title)} 
            className="flex gap-2 p-3 border rounded-lg mb-3 md:mr-10 cursor-pointer hover:bg-purple-50 hover:text-primary hover:border-primary hover:shadow-md items-center"
          >
            <img src={category.img} alt="icon" width={35} height={35} />
            <h2>{category.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySidebar;

