Installation and Setup Instructions
Clone the repository: git clone https://github.com/<username>/<repository-name>.git
Navigate to the project directory: cd <repository-name>
Install the dependencies: npm install
Start the application: npm start
List of Libraries and Tools Used
React
jsPDF
Additional Notes and Assumptions
This project is an invoice generator that allows users to input sender and recipient information, invoice details, line items and signature (optional).
The generated invoice is downloaded in PDF format.
The Signature component is used to capture the signature of the user.
The invoice is generated using the Pdfgenerator function which creates a new instance of the jsPDF library.
Line items are displayed in a table format with columns for description, quantity, unit price, and amount.
If the content goes beyond the page, a new page is automatically added.
This project assumes that all input fields are required and that the user enters valid information.
