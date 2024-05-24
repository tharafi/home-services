import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CategorySidebar from "@/_components/categorySidebar/CategorySideBar";
import ServiceCard from "@/_components/serviceCard/ServiceCard";
import { cards } from "@/data";
import newRequest from "@/utils/newRequest";

function Services() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category");

  const [category, setCategory] = useState(initialCategory  || "");

  const { isLoading, error, data } = useQuery({
    queryKey: ["services", category],
    queryFn: () =>
      newRequest.get(`/services?category=${category}`).then((res) => res.data),
    enabled: !!category,
  });


  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    navigate(`?category=${selectedCategory}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 mt-8">
        <div>
          <CategorySidebar categoryList={cards} onSelect={handleCategorySelect} />
        </div>
        <div className="col-span-3">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
              {data && data.map((service) => (
                <ServiceCard key={service._id} item={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
