import CategorySidebar from "@/_components/categorySidebar/CategorySideBar";
import BusinessList from "@/_components/popular project/BusinessList";
import ServiceCard from "@/_components/serviceCard/ServiceCard";
import { cards, gigs, projects } from "@/data";
import newRequest from "@/utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Services() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("cat");


  const { isLoading, error, data } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      newRequest.get(`/services${search}`).then((res) => res.data),
    });


  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 mt-8">
        <div>
          <CategorySidebar categoryList={cards} />
        </div>
        <div className="col-span-3">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
              {data.map((service) => (
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

