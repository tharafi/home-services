import React from "react";
import { Link } from "react-router-dom";

function CategoryList({ categoryList, onSelect }) {
  return (
    <div className='container mx-auto px-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16'>
      {categoryList.length > 0 ? (
        categoryList.map((category, index) => (
          <div key={index} onClick={() => onSelect(category.title)}>
            <Link to={`/services?cat=${category}`}>
              <div className="flex flex-col items-center justify-center gap-2 bg-purple-50 p-5 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out">
                <img src={category.img} alt='icon' width={35} height={35} />
                <h2 className='text-primary'>{category.title}</h2>
              </div>
            </Link>
          </div>
        ))
      ) : (
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} className='h-[120px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
