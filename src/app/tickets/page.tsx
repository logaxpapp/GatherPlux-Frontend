import React from "react";
import TicketPage from "./components/TicketPage";
import LocationComponent from "./components/LocationComponent";
import EventDescription from "./components/EventDescription";
import OtherEvents from "./components/OtherEvents";
 

const Page = () => {
  return (
    <div className="bg-[#020e1e] min-h-screen px-4 py-8 text-white">
      {/* Ticket Page Section */}
      <TicketPage />
      <LocationComponent/>
      <EventDescription/>
      <OtherEvents/>

   
    </div>
  );

};

export default Page;
