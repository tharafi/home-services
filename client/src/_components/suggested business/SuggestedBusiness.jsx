import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import React from "react";
import BookingSection from "../booking section/BookingSection";

function SuggestedBusiness({ business }) {
  return (
    <div className="pl-10">
      <BookingSection>
        <Button className="flex gap-2 w-full ">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>
    </div>
  );
}

export default SuggestedBusiness;
