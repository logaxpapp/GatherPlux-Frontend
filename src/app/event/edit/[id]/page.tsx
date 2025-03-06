"use strict";
"use client";

import ProgressBar from "../../components/ProgressBar.component";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import EventBanner from "../../components/EventBanner.component";
import EventDetails from "../../components/EventDetails.component";
import EventTickets from "../../components/EventTickets.component";
import EventPreview from "../../components/EventPreview.component";
import { usePathname } from "next/navigation";
import { useLazyGetOneEventQuery } from "@/services/slices/events.slice";
import { useDispatch } from "react-redux";
import { updateEventToEdit } from "@/store/slices/event.slice";
import { toast } from "react-toastify";

const EditEvent: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const path = pathname.split("/")[2];
  const dispatch = useDispatch();

  const [formStep, setFormStep] = useState(1);

  const [getOneEventQuery] = useLazyGetOneEventQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await getOneEventQuery(id).unwrap();
        if (response.code === 200 && response.body) {
          dispatch(updateEventToEdit(response.body));
        }

        if (response.error) {
          toast.error(response.error.message, {
            position: "top-right",
          });
        }
      }
    };
    fetchData();
  }, [id, getOneEventQuery, dispatch]);

  const handleNextStep = () => {
    setFormStep(formStep + 1);
  };

  const handlePreviousStep = () => {
    setFormStep(formStep - 1);
  };

  return (
    <div className="py-32 px-10 bg-[#020e1e]">
      <div className="flex items-center space-x-10">
        <FaArrowLeftLong className="text-[38px] cursor-pointer" />
        <h2 className=" text-[18px] sm:text-[38px] font-bold">Edit Event</h2>
      </div>
      <ProgressBar currentStep={formStep} />

      {formStep === 1 && (
        <EventDetails handleNextStep={handleNextStep} path={path} />
      )}
      {formStep === 2 && (
        <EventBanner
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          path={path}
        />
      )}
      {formStep === 3 && (
        <EventTickets
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          path={path}
        />
      )}
      {formStep === 4 && (
        <EventPreview handlePreviousStep={handlePreviousStep} path={path} />
      )}
    </div>
  );
};

export default EditEvent;
