import React, { useState } from "react";

const Info = () => {
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
    setLineItems(updatedLineItems);
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
            <input
            type="date"
            name="date"
            placeholder="Invoice Date"
            value={invoice.date}
            onChange={handleInvoiceInputChange}
            />
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
                onChange={(event) => handleLineItemInputChange(index, event)}
                />
                <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={lineItem.amount}
                onChange={(event) => handleLineItemInputChange(index, event)}
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
            </div>
            ))}
        </div>

        {/* Subtotal, Tax, Total */}
        <div className="totals">
            <div className="subtotal">
            <label htmlFor="subtotal">Subtotal:</label>
            <input type="number" name="subtotal" value={0} readOnly />
            </div>
            <div className="tax">
            <label htmlFor="tax">Tax:</label>
            <input type="number" name="tax" value={0} readOnly />
            </div>
            <div className="total">
            <label htmlFor="total">Total:</label>
            <input type="number" name="total" value={0} readOnly />
            </div>
        </div>

        {/* Additional Notes */}
        <div className="notes">
            <h3>Additional Notes</h3>
            <textarea name="notes" rows="4" cols="50" />
        </div>

        {/* Submit Button */}
        <div className="submit-button">
            <button>Submit</button>
        </div>
        </div>
    );
};
export default Info;


