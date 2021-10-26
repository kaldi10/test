import {useState} from "react";
import './App.css';


function App() {
  const [respond, setRespond] = useState("");

  const handleClick = async () => {
    const res = await (await (fetch("http://localhost:8080/all"))).text();
    console.log(res)
    setRespond(res);
  };


  return (
    <div className="App">
        <button onClick={handleClick}>test local host</button>
        <h1>{respond}</h1>
    </div>

  );
}

export default App;
