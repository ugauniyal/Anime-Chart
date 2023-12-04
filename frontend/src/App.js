import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import ParentNodes from './pages/Parent';
import ChildNodes from './pages/Child';
import SenseiNodes from './pages/Sensei';
import SiblingNodes from './pages/Siblings';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ParentNodes/>
      <ChildNodes/>
      <SenseiNodes/>
      <SiblingNodes/>
    </div>
  );
}

export default App;
