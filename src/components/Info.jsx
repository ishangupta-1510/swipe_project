import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Signature from "./Signature_draw";
// import GenerateInvoice from "./GenerateInvoice";
const Info = () => {
  const [signature, setSignature] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(subtotal + tax);
  }, [subtotal, tax]);
  useEffect(() => {
    setTax(subtotal * 0.1);
  }, [subtotal]);
  const handleSignature = (dataURL) => {
    setSignature(dataURL);
  };
  const Pdfgenerator = () => {
    const doc = new jsPDF();

    // Add title to the document
    doc.setFontSize(20);
    doc.text("Invoice Form", 20, 20);
  
    // Add sender information
    doc.setFontSize(14);
    doc.text("Sender Information", 20, 40);
    doc.setFontSize(12);
    doc.text(`Name: ${sender.name}`, 20, 50);
    doc.text(`Address: ${sender.address}`, 20, 60);
    doc.text(`Phone Number: ${sender.phoneNumber}`, 20, 70);
    doc.text(`Email: ${sender.email}`, 20, 80);
  
    // Add recipient information
    doc.setFontSize(14);
    doc.text("Recipient Information", 20, 100);
    doc.setFontSize(12);
    doc.text(`Name: ${recipient.name}`, 20, 110);
    doc.text(`Address: ${recipient.address}`, 20, 120);
    doc.text(`Phone Number: ${recipient.phoneNumber}`, 20, 130);
    doc.text(`Email: ${recipient.email}`, 20, 140);
  
    // Add invoice number and date
    doc.setFontSize(14);
    doc.text("Invoice Number and Date", 20, 160);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.number}`, 20, 170);
    doc.text(`Invoice Date: ${invoice.date}`, 20, 180);
  
    // Add line items
    doc.setFontSize(14);
    doc.text("Line Items", 20, 200);
    doc.setFontSize(12);
    let startY = 210;
    lineItems.forEach(item => {
      doc.text(`Description: ${item.description}`, 20, startY);
      doc.text(`Quantity: ${item.quantity}`, 20, startY += 10);
      doc.text(`Unit Price: ${item.unitPrice}`, 20, startY += 20);
      doc.text(`Amount: ${item.amount}`, 20, startY += 30);
      startY += 20;
      console.log("starty="+startY)
      if (startY > 270) {
        // if the content goes beyond the page, add a new page
        doc.addPage();
        startY = 20;
      }
    });
  
    // Add signature if available
    if (signature) {
      const img = new Image();
      img.src = signature;
      img.onload = () => {
        doc.addImage(img, "png", 20, startY + 20, 60, 40);
        if (startY > 270) {
          // if the content goes beyond the page, add a new page
          doc.addPage();
          startY = 20;
        }
        doc.save("invoice.pdf");

      };
      img.onerror = () => {
        console.error("Failed to load the signature image");
        doc.save("invoice.pdf");
      };
    } else {
      doc.save("invoice.pdf");
    }
  }
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
  const [sender, setSender] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [recipient, setRecipient] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [invoice, setInvoice] = useState({
    number: "",
    date: "",
  });

  const [lineItems, setLineItems] = useState([
    {
      description: "",
      quantity: "",
      unitPrice: "",
      amount: "",
    },
  ]);

  const handleSenderInputChange = (event) => {
    const { name, value } = event.target;
    setSender((prevSender) => ({
      ...prevSender,
      [name]: value,
    }));
  };

  const handleRecipientInputChange = (event) => {
    const { name, value } = event.target;
    setRecipient((prevRecipient) => ({
      ...prevRecipient,
      [name]: value,
    }));
  };

  const handleInvoiceInputChange = (event) => {
    const { name, value } = event.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleLineItemInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][name] = value;
    console.log("here" + updatedLineItems[index][name] +" "+index+" "+name)
    if (name === "quantity" || name === "unitPrice") {
      updatedLineItems[index].amount = updatedLineItems[index].quantity * updatedLineItems[index].unitPrice;
    }
    const newSubtotal = updatedLineItems.reduce(
      (accumulator, item) => accumulator + parseFloat(item.amount || 0),
      0
    );
    setSubtotal(newSubtotal);
    setLineItems(updatedLineItems);
    console.log(subtotal+tax)
    setTotal(subtotal+tax);
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: "", unitPrice: "", amount: "" }]);
  };

  const handleRemoveLineItem = (index) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems.splice(index, 1);
    setLineItems(updatedLineItems);
  };

  return (
    <div className="invoice-form">
      <h2>Invoice Form</h2>

      {/* Sender Information */}
      <div className="sender-info">
        <h3>Sender Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={sender.name}
          onChange={handleSenderInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={sender.address}
          onChange={handleSenderInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={sender.phoneNumber}
          onChange={handleSenderInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={sender.email}
          onChange={handleSenderInputChange}
        />
      </div>

      {/* Recipient Information */}
      <div className="recipient-info">
        <h3>Recipient Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={recipient.name}
          onChange={handleRecipientInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={recipient.address}
          onChange={handleRecipientInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={recipient.phoneNumber}
          onChange={handleRecipientInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={recipient.email}
          onChange={handleRecipientInputChange}
        />
        </div>
        {/* Invoice Number and Date */}
        <div className="invoice-number-date">
            <input
            type="text"
            name="number"
            placeholder="Invoice Number"
            value={invoice.number}
            onChange={handleInvoiceInputChange}
            />
            <div className="date">
              <input
              type="date"
              name="date"
              placeholder="Invoice Date"
              value={invoice.date}
              onChange={handleInvoiceInputChange}
              />
            </div>
        </div>

        {/* Line Items */}
        <div className="line-items">
            <h3>Line Items</h3>
            {lineItems.map((lineItem, index) => (
            <div className="line-item" key={index}>
                <input
                type="text"
                name="description"
                placeholder="Description"
                value={lineItem.description}
                onChange={(event) => handleLineItemInputChange(index, event)}
                />
                <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={lineItem.quantity}
                onChange={(event) => handleLineItemInputChange(index, event)}
                />
                <input
                type="number"
                name="unitPrice"
                placeholder="Unit Price"
                value={lineItem.unitPrice}
                onChange={(event) => {
                  console.log(lineItem.unitPrice +" " +lineItem.quantity+" "+subtotal)
                  handleLineItemInputChange(index, event);
                  console.log(lineItem) 
                  console.log(lineItem.amount)   
                             
                  // setSubtotal(subtotal+lineItem.amount);
                  const subtota = lineItems.reduce((acc, item) => {
                    return acc + (item.quantity * item.unitPrice);
                  }, 0);
                  setSubtotal(subtota);
                  setTax(0.1*(subtotal+lineItem.quantity*lineItem.unitPrice));
                  setTotal(tax+subtotal);
                }}
                />
                <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={lineItem.quantity*lineItem.unitPrice}
                
                onChange={(event) => {
                  handleLineItemInputChange(index, event);
                }}
                />
                {index === lineItems.length - 1 && (
                <button className="add-line-item" onClick={handleAddLineItem}>
                    Add Line Item
                </button>
                )}
                {index !== lineItems.length - 1 && (
                <button className="remove-line-item" onClick={() => handleRemoveLineItem(index)}>
                    Remove Line Item
                </button>
                )}

                {
                  console.log("sender : "+ sender.name)
                }
            </div>
            ))}
        </div>

        {/* Subtotal, Tax, Total */}
        <div className="totals">
            <div className="subtotal">
            <label htmlFor="subtotal">Subtotal:</label>
            <input type="number" name="subtotal" value={subtotal} readOnly />
            </div>
            <div className="tax">
            <label htmlFor="tax">Tax:</label>
            <input type="number" name="tax" value={tax} readOnly />
            </div>
            <div className="total">
            <label htmlFor="total">Total:</label>
            <input type="number" name="total" value={total} readOnly />
            </div>
        </div>

        {/* Additional Notes */}
        <div className="notes">
            <h3>Additional Notes</h3>
            <textarea name="notes" rows="4" cols="50" />
        </div>

        {/* Submit Button */}
        <div>
          <h3>Signature(Choose image or draw in the box given below)</h3>
          <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleSignatureUpload} />
          {signature && (
            <img src={signature} alt="signature" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          )}
        </div>
        <div className="signature">
          <Signature onSignature={handleSignature} />
        </div>
        <div className="submit-button">
          {/* {console.log("fewef")} */}
            <button onClick={Pdfgenerator}>Download Invoice</button>
        </div>
        <div className="invoice-form">

      {/* ... */}
    </div>
        </div>
    );
};
export default Info;


