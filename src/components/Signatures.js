import React, { useState } from 'react';

const Signature = () => {
  // other state variables
  const [signature, setSignature] = useState(null);

  // handle signature upload
  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // create a new FileReader
      const reader = new FileReader();
      // set the reader's onload function
      reader.onload = () => {
        // set the signature state to the base64-encoded image data
        setSignature(reader.result);
      };
      // read the uploaded file as a Data URL
      reader.readAsDataURL(file);
    } else {
      setSignature(null);
    }
  };

  return (
    <div>
      {/* Sender's Information */}
      {/* Recipient's Information */}
      {/* Invoice Number and Date */}
      {/* Line Items */}
      {/* Subtotal, Tax, Total */}
      {/* Additional Notes */}

      {/* Signature */}
      <div className="signature">
        <h3>Signature</h3>
        <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleSignatureUpload} />
        {signature && (
          <img src={signature} alt="signature" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        )}
      </div>

      {/* Submit Button */}
    </div>
  );
};

export default Signature;