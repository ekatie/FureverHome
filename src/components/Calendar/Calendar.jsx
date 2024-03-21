import React from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { createBooking } from "../../services/applicationsService";
import "./Calendar.scss";
import { useNavigate } from "react-router-dom";

const Calendar = ({ applicationId }) => {
  const calendlyUrl =
    "https://calendly.com/furever-home/booking?hide_gdpr_banner=1";

  const navigate = useNavigate();

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      const uri = e.data.payload.event.uri;

      createBooking(applicationId, uri)
        .then((details) => {
          console.log("Fetched event details successfully:", details);
          navigate("/application");
        })
        .catch((error) => {
          console.error("Failed to fetch event details:", error);
        });
    },
  });

  return (
    <div className="calendar-widget">
      <InlineWidget url={calendlyUrl} />
    </div>
  );
};

export default Calendar;
