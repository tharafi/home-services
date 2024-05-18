import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

function BusinessList({ businessList, title }) {
  return (
    <div className="container mx-auto px-auto mb-28">
      <h2 className="font-bold text-[22px] mb-9">{title}</h2>
      <div className="grid grid-cols-3  lg:grid-cols-3 gap-10 mt-5 mx-20 ">
        {businessList.length > 0
          ? businessList.map((business, index) => (
              <Link to={`/services/`} key={business.id}>
                <div
                  key={index}
                  className=" shadow-md rounded-lg hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all ease-in-out cursor-pointer"
                >
                  <img
                    src={business.img}
                    width={500}
                    height={200}
                    className="h-[150px] md:h-[200px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col items-baseline p-3 gap-1">
                    <h2 className="p-1 bg-purple-200 text-primary rounded-full px-2 text-[12px]">
                      {business.cat}
                    </h2>
                    <h2 className="font-bold text-lg">{business.name}</h2>
                    <h2 className="text-primary">{business.username}</h2>
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="h-[270px] w-full bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BusinessList;
