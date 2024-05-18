import React from "react";
import { Link, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import "./Message.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "@/utils/newRequest";

function Message() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message)
    },
    onSuccess:() => {
      queryClient.invalidateQueries(['messages'])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId : id, 
      desc: e.target[0].value
    });
    desc: e.target[0].value= ""
  }

  return (
    <div className="message flex justify-center">
      <div className="container mx-auto px-auto">
        <span className="font-300 text-slate-800 text-[20px]">
          <Link to="/messages">Messages</Link> {">"} JOHN DOE
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "something wont wong"
        ) : (
          <div className="messages  mx-[30px] p-[50px] flex flex-col gap-[20px] h-[500px] overflow-y-scroll">
            {data.map((m) => (
              <div className={`${m.userId === currentUser._id ? "owner item" : "item"}  flex items-start  w-[600px] gap-[20px]  text-[18px]`} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/1771383/pexels-photo-1771383.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="rounded-[50%] h-[40px] object-cover "
                />
                <p className={` ${m.userId === currentUser._id ? "rounded-tr-none" : "rounded-tl-none"} p-[20px] bg-primary text-gray-600  rounded-2xl `}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        <hr className="" />
        <form className="write mx-10 flex justify-between items-center center mb-8" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Write a message "
            className="w-[80%] h-[100px] p-3"
          />
          <Button type= 'submit'>Send</Button>
        </form>
      </div>
    </div>
  );
}

export default Message;


{/* <div className="item owner flex items-start self-end w-[600px] gap-[20px] justify-center text-[18px]">
<img
  src="https://images.pexels.com/photos/1771383/pexels-photo-1771383.jpeg?auto=compress&cs=tinysrgb&w=1600"
  alt=""
  className="rounded-[50%] w-[140px] h-[40px] object-cover"
/>
<p className=" p-[20px] bg-primary text-white rounded-tr-none rounded-2xl ">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Doloremque explicabo consectetur reiciendis omnis nostrum
  impedit mollitia maiores quod obcaecati amet deleniti, fugiat
  expedita tempore placeat aperiam necessitatibus, itaque tenetur
  alias.
</p>
</div> */}