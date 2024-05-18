import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

function BookingSection({ children }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, settimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  useEffect(() => {
    getTime();
    setDate('');
    setSelectedTime('');
  },[]);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    settimeSlot(timeList);
  };

  const saveBooking = () => {

  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book An Service</SheetTitle>
            <SheetDescription>
              Select Date and Time Slot to Book an Service
              {/* date select */}
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="mt-5 font-bold">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              {/* time slot picker */}
              <h2 className="my-5 font-bold">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`border rounded-full px-3 p-2 hover:bg-primary hover:text-white ${selectedTime==item.time && 'bg-primary text-white'}`}
                    onClick={()=> setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className='mt-5'>
            <SheetClose asChild>
              <div className="flex gap-5">
              <Button variant='destructive'>Cancel</Button>
              <Button disabled={!(selectedTime&&date)}
                      onClick={() => saveBooking()}
              >Book</Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
