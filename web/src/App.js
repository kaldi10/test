import { useState } from "react";
import "./App.css";
//  /api/all
function App() {
  const [respond, setRespond] = useState("");

//   const url =
//     "https://test.ekqf8oaandubs.eu-central-1.cs.amazonlightsail.com/api/test";
//  const localUrl = "http://localhost:8080/api/test"
  const handleClick = async () => {
    // const res = await (await fetch("http://localhost:8080/api/all")).text();
    try {
          const res = await (
            await fetch("/api/test"
            )
          ).json();
              console.log(res.msg);
              setRespond(res.msg);


    } catch (error) {
      console.log(error)
      setRespond("Failed to fetch Access denied")
    }

  };

  return (
    <div className="App">
      <button onClick={handleClick}>test local host</button>
      <h1>{respond}</h1>
    </div>
  );
}

export default App;
