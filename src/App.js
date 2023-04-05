import './App.css';
import Info from './components/Info'
import Signature from './components/Signatures';
import GenerateInvoice from './components/GenerateInvoice';
function App() {
  return (
    <div className="App">
      <Info />
      <Signature />
      <GenerateInvoice />
    </div>
  );
}

export default App;
