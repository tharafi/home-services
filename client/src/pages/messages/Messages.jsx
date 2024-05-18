import React from "react";
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
import { Link } from "react-router-dom";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "@/utils/newRequest";
import moment from "moment";

function Messages() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient()


  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get('/conversations').then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`)
    },
    onSuccess:() => {
      queryClient.invalidateQueries(['conversations'])
    }
  })

  const handleRead = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="Orders flex justify-center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong!"
      ) : (
        <div className="container mx-auto px-auto">
          <div className="title flex items-center justify-between my-4 px-4">
            <h1 className="font-bold text-[20px]">Messages</h1>
          </div>
          <Table>
            <TableCaption className="py-8">
              A list of recent Messages.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">
                  {currentUser?.isSeller ? "Buyer" : "Seller"}
                </TableHead>
                <TableHead>Last Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { data.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{currentUser.isSeller ? c.buyerId :c.sellerId }</TableCell>
                  <TableCell>
                    <Link to={`/message/${c.id}`}>
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </TableCell>
                  <TableCell>{moment(c.updatedAt).fromNow()}</TableCell>
                  <TableCell>
                    {(currentUser.isSeller && !c.readBySeller)||( !currentUser.isSeller && !c.readByBuyer&&
                    (<Button onClick={()=> handleRead(c.id)}>Mark as Read</Button>)
                    )}
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

export default Messages;
