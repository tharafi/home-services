import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "@/utils/newRequest";

function MyServices() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myServices"],
    queryFn: () =>
      newRequest.get(`/services?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myServices"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
console.log(data)

  return (
    <div className="myservices flex justify-center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something wont wrong"
      ) : (
        <div className="container mx-auto px-auto">
          <div className="title flex items-center justify-between my-4 px-4">
            <h1 className="font-bold text-[20px]">Services</h1>
            {currentUser.isSeller &&
            <Link to="/add">
              <Button>Add New Service</Button>
            </Link>
            }
          </div>
          <Table>
            <TableCaption className="py-8">
              A list of your recent services.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
            {data.map((service) => (
                <TableRow key={service._id}>
                  <TableCell className="font-medium">
                    <img
                      src={service.cover}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell className="text-right">${service.price}</TableCell>
                  <TableCell>{service.sales}</TableCell>
                  <TableCell>
                    <img
                      src="/img/delete.png"
                      className="w-[20px] cursor-pointer"
                      alt=""
                      onClick={handleDelete(service._id)}
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

export default MyServices;
