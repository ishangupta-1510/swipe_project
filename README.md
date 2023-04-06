# swipe_projectSWIPE INVOICE GENERATOR
Installation and Setup Instructions
1.	Clone the repository: git clone https://github.com/ishangupta-1510/swipe_project
2.	Navigate to the project directory: cd swipe_project
3.	Install the dependencies: npm install
4.	Start the application: npm start
List of Libraries and Tools Used
1.	React
2.	jsPDF
3.	useState
4.	useEfferct
5.	useRef
Additional Notes and Assumptions
•	This project is an invoice generator that allows users to input sender and recipient information, invoice details, line items and signature (optional).
•	The generated invoice is downloaded in PDF format.
•	The Signature component is used to capture the signature of the user where the user can upload as well as make signature on the drawing board in the app.
•	The invoice is generated using the Pdfgenerator function which creates a new instance of the jsPDF library.
•	Line items are displayed in a table format with columns for description, quantity, unit price, and amount.
•	If the content goes beyond the page, a new page is automatically added.
•	This project assumes that all input fields are required and that the user enters valid information.

