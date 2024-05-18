import BookingSection from "@/_components/booking section/BookingSection";
import BusinessDescription from "@/_components/business desc/BusinessDescription";
import BusinessInfo from "@/_components/business info/BusinessInfo";
import SuggestedBusiness from "@/_components/suggested business/SuggestedBusiness";
import { Button } from "@/components/ui/button";
import { projects } from "@/data";
import newRequest from "@/utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { Clock, Mail, MapPin, MessageCircle, NotebookPen, Share, User } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

function Service() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["service"],
    queryFn: () =>
      newRequest.get(`/services/single/${id}`).then((res) => res.data),
  });
  const { isLoading:isLoadingUser, error:errorUser, data:dataUser } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      newRequest.get(`/users/${data.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="py-8 md:py-20 px-10 md:px-36">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        "Something went wrong"
      ) : (
        <div>
          {isLoadingUser?"loading":errorUser ? 'something went wrong!':
          <div className="md:flex gap-4 items-center">
            <img
              src={dataUser.img || '/img/noavatar.jpg'}
              alt=""
              width={150}
              height={200}
              className="rounded-full h-[150px] object-cover"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col mt-2 md:mt-0 items-baseline gap-3">
                <h2 className="text-primary rounded-full bg-purple-100 p-1 px-3 text-lg">
                  {data.category}
                </h2>
                <h2 className="text-[40px] font-bold">{data.title}</h2>
                <h2 className="flex gap-2 text-lg text-gray-500">
                  <MapPin />
                  {dataUser.country}
                </h2>
                <h2 className="flex gap-2 text-lg text-gray-500">
                  <Mail />
                  {dataUser.email}
                </h2>
              </div>
              <div className="flex flex-col gap-5 items-end">
                <Button>
                  <MessageCircle />
                </Button>
                <h2 className="flex gap-2 text-xl text-primary">
                  <User /> {dataUser.username}
                </h2>
                <h2 className="flex gap-2 text- text-gray-500">
                  <Clock /> Available 8:00 AM to 10:00 PM
                </h2>
              </div>
            </div>
          </div>
            }
          <div className="grid grid-cols-4 mt-16">
            <div className="col-span-3">
              <div>
                <h2 className="font-bold text-[25px]">Description</h2>
                <p className="mt-4 text-lg text-gray-600">{data.desc}</p>
                <h2 className="font-bold text-[25px] mt-8">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {data.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="rounded-lg h-[100%]  object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="pl-10">
                <BookingSection>
                  <Button className="flex gap-2 w-full ">
                    <NotebookPen />
                    Book Appointment
                  </Button>
                </BookingSection>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
