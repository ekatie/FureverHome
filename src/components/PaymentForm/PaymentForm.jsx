import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { updateApplicationAsync } from "../../features/applicationSlice";
import { useDispatch } from "react-redux";
import "./PaymentForm.scss";

const PaymentForm = ({ applicationId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          dispatch(
            updateApplicationAsync({
              id: applicationId,
              status: "Payment Received",
              is_fee_paid: true,
            })
          );
          toast.success("Your payment was successful!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "processing":
          toast.warn("Your payment is being processed.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "requires_payment_method":
          toast.error("Failed process your payment. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        default:
          toast.error("Something went wrong. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
      }
    });
  }, [dispatch, stripe, applicationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/application",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("An unexpected error occurred.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <button type="submit" disabled={isLoading || !stripe || !elements}>
        Pay Adoption Fee
      </button>
    </form>
  );
};

export default PaymentForm;
