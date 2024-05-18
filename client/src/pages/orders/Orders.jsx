import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import newRequest from "@/utils/newRequest";

function Orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["bookings"],
    queryFn: () =>
      newRequest.get(`/bookings`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="Orders flex justify-center">
    {isLoading ? (
  "loading"
) : error ? (
  "something went wrong!"
) : (
  <div className="container mx-auto px-auto">
    <div className="title flex items-center justify-between my-4 px-4">
      <h1 className="font-bold text-[20px]">Orders</h1>
    </div>
    <Table>
      <TableCaption className="py-8">
        A list of recent Orders.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Image</TableHead>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="">Price</TableHead>
          <TableHead className="text-center">Contact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium ">
              <img
                className="h-[100%] object-cover"
                src={order.img}
                alt=""
              />
            </TableCell>
            <TableCell className="text-center">{order.title}</TableCell>
            <TableCell className="">${order.price}</TableCell>
            <TableCell className="text-center w-[20px] ">
              <img
                src="/img/message.png"
                className="w-[20px] cursor-pointer"
                alt=""
                onClick={() => handleContact(order)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)}

    </div>
  );
}

export default Orders;
