import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import SignatureCapture from "../SignatureCapture/SignatureCapture";
import {
  fetchApplicationAsync,
  fetchContractAsync,
  uploadSignedContractAsync,
  updateApplicationAsync,
} from "../../features/applicationSlice";
import { toast } from "react-toastify";

const AdoptionContract = () => {
  const dispatch = useDispatch();
  const contractUrl = useSelector((state) => state.application.contractUrl);
  const { applicationId } = useParams();
  const [signaturePad, setSignaturePad] = useState(null);
  const [signedPdfUrl, setSignedPdfUrl] = useState("");

  useEffect(() => {
    if (applicationId) {
      dispatch(fetchContractAsync(applicationId));
    }
  }, [dispatch, applicationId]);

  const signAndEmbedSignature = async () => {
    if (!contractUrl || !signaturePad) {
      alert("Please wait for the contract to load.");
      return;
    }

    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    const signature = signaturePad.toDataURL("image/png");
    const existingPdfBytes = await fetch(contractUrl).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pngImage = await pdfDoc.embedPng(signature);

    const page = pdfDoc.getPage(1);
    page.drawImage(pngImage, {
      x: 90,
      y: page.getHeight() - 335,
      width: 200,
      height: 100,
    });

    const pdfBytes = await pdfDoc.save();
    const signedPdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    dispatch(
      uploadSignedContractAsync({
        applicationId: applicationId,
        signedPdfBlob: signedPdfBlob,
      })
    )
      .then(() => {
        return dispatch(
          updateApplicationAsync({
            id: applicationId,
            status: "Adoption Complete",
          })
        );
      })
      .then(() => {
        dispatch(fetchApplicationAsync(applicationId));
      })
      .then(() => {
        toast.success("Your adoption contract has successfully been signed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        toast.error(
          "An error occurred while signing the adoption contract. Please try again.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });

    // Update the component state to reflect the uploaded signed PDF
    setSignedPdfUrl(URL.createObjectURL(signedPdfBlob));
  };

  return (
    <div>
      <h1 className="page-title">Adoption Contract</h1>
      <p>
        Congratulations on your decision to adopt a furry friend! We're excited
        to welcome you to the Furever Home family. Before you take your new
        companion home, we ask that you review and sign this adoption contract.
        This contract is designed to ensure the safety and well-being of the
        animals in our care and to provide you with the necessary information to
        be a responsible pet owner. If you have any questions or concerns about
        the contract, please don't hesitate to reach out to us. We're here to
        help you every step of the way. Thank you for choosing adoption and
        giving a loving home to a pet in need.
      </p>
      <h2>Adoption Contract</h2>
      {signedPdfUrl ? (
        <object
          data={signedPdfUrl}
          type="application/pdf"
          width="100%"
          height="600px"
          aria-label="Signed Adoption Contract"
        ></object>
      ) : contractUrl ? (
        <>
          <object
            data={contractUrl}
            type="application/pdf"
            width="100%"
            height="600px"
            aria-label="Adoption Contract"
          />
          <SignatureCapture onReady={(pad) => setSignaturePad(pad)} />
          <button onClick={signAndEmbedSignature}>Sign Document</button>
        </>
      ) : (
        // Display loading state
        <p>Loading contract...</p>
      )}
    </div>
  );
};

export default AdoptionContract;
