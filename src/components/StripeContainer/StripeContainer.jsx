import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";
import { createPaymentIntentAsync } from "../../features/applicationSlice";
// import "./StripeContainer.scss";
import { useDispatch } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51OijvWDj4bpANpyJz8aAoIVRuCbrawjtWPUN82vANizv2ZQyKGmtdUlfGCyjkB343rjmUF8cbDyPvqhdPfbOGI1c00KyeH3ivP"
);

const StripeContainer = ({ applicationId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createPaymentIntentAsync({ applicationId }))
      .then((result) => {
        setClientSecret(result.payload.clientSecret);
      })
      .catch((error) => {
        console.error("Payment intent creation failed:", error);
      });
  }, [dispatch, applicationId]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm applicationId={applicationId} />
      </Elements>
    </div>
  );
};

export default StripeContainer;
