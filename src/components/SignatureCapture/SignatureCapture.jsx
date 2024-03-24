import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignatureCapture = ({ onReady }) => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    signaturePadRef.current = new SignaturePad(canvasRef.current);
    onReady(signaturePadRef.current);
    console.log("SignaturePad initialized");
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default SignatureCapture;
