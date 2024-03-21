import React from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { createBookingAsync } from "../../features/applicationSlice";
import "./Calendar.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Calendar = ({ applicationId, onBookingComplete }) => {
  const calendlyUrl =
    "https://calendly.com/furever-home/booking?hide_gdpr_banner=1";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      const uri = e.data.payload.event.uri;
      dispatch(createBookingAsync({ applicationId, uri }))
        .then((action) => {
          if (action.type === "application/createBooking/fulfilled") {
            toast.success("Your appointment has been booked!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            onBookingComplete();
            navigate("/application", {
              replace: true,
              state: { forceRefresh: true },
            });
          }
        })
        .catch((error) => {
          toast.error("There was an error booking your appointment.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
