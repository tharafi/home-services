import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import React from "react";

function BusinessInfo({ business }) {
  return (
    <div className="md:flex gap-4 items-center">
      <img
        src="https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt={business.name}
        width={150}
        height={200}
        className="rounded-full h-[150px] object-cover"
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col mt-2 md:mt-0 items-baseline gap-3">
          <h2 className="text-primary rounded-full bg-purple-100 p-1 px-3 text-lg">
            cleaning
          </h2>
          <h2 className="text-[40px] font-bold"> Digital Marketing</h2>
          <h2 className="flex gap-2 text-lg text-gray-500">
            <MapPin />
            255 Grand Park Ave, New York
          </h2>
          <h2 className="flex gap-2 text-lg text-gray-500">
            <Mail />
            acounts@gmail.com
          </h2>
        </div>
        <div className="flex flex-col gap-5 items-end">
          <Button><Share /></Button>
          <h2 className="flex gap-2 text-xl text-primary"><User/> Ward Brewer</h2>
          <h2 className="flex gap-2 text-  text-gray-500"><Clock/> Available 8:00 AM to 10:00 PM</h2>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
