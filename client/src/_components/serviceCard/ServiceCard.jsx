import { Button } from "@/components/ui/button";
import newRequest from "@/utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['serviceUser'],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      {/* <h2 className="font-bold text-[22px] mb-9">{item.category}</h2> */}
      <div className=" shadow-md rounded-lg hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all ease-in-out cursor-pointer">
        <Link to={`/service/${item._id}`}>
          <img
            src={item.cover}
            width={500}
            height={200}
            className="h-[150px] md:h-[200px] object-cover rounded-lg"
          />
          <div className="flex flex-col items-baseline p-3 gap-1">
            <h2 className="p-1 bg-purple-200 text-primary rounded-full px-2 text-[12px]">
              {item.category}
            </h2>
            <h2 className="font-bold text-lg">{item.title}</h2>
            {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div>
            <h2 className="text-primary">{data.username}</h2>
            <h2 className="text-gray-500 text-sm">{data.country}</h2>
            </div>
          )}
          <h2 className="text-gray-500 text-sm">${item.price} </h2>
            <Button className="rounded-lg mt-3">Book New</Button>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ServiceCard;
