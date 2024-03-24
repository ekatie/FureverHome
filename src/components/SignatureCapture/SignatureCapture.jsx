import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignatureCapture = ({ onReady }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const signaturePad = new SignaturePad(canvasRef.current);
    onReady(signaturePad);
    return () => signaturePad.clear();
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={125}
        style={{ border: "1px solid #000" }}
      ></canvas>
    </div>
  );
};

export default SignatureCapture;
