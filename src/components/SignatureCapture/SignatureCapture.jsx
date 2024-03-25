import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignatureCapture = ({ onReady }) => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    signaturePadRef.current = new SignaturePad(canvasRef.current);
    onReady(signaturePadRef.current);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default SignatureCapture;
