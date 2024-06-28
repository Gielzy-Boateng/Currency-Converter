import { useEffect, useState } from "react";
import "./App.css";
// 'https://api.frankfurter.app/latest?from=USD&to=EUR'; exchange rates api
// key(a9d0889043-98ee36e666-sd9u4v)

function App() {
  const [input, setInput] = useState(1);
  const [convert1, setConvert1] = useState("USD");
  const [convert2, setConvert2] = useState("EUR");
  const [displayRate, setDisplayRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${convert1}&to=${convert2}`
        );
        const data = await res.json();
        setDisplayRate(data.rates[convert2]);
        setIsLoading(false);
      }
      if (convert1 === convert2) return setDisplayRate(input);
      if (input === 0) return setDisplayRate(input);
      fetchCurrency();
    },
    [input, convert1, convert2]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>CHECK YOUR CURRENCY RATES HERE</h1>
        <input
          type="text"
          className="input-bar"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          // disabled={isLoading}
        />

        <span>
          <select
            value={convert1}
            onChange={(e) => setConvert1(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">US DOLLAR</option>
            <option value="EUR">EURO</option>
            <option value="AUD">AUSTRALIAN DOLLAR</option>
            <option value="JPY">JAPANEESE YEN</option>
            <option value="GBP">BRITISH POUND</option>
          </select>
          <p>TO</p>
          <select
            value={convert2}
            onChange={(e) => setConvert2(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EURO</option>
            <option value="AUD">AUSTRALIAN DOLLAR</option>
            <option value="JPY">JAPANEESE YEN</option>
            <option value="GBP">BRITISH POUND</option>
          </select>
        </span>
        <p>
          OUTPUT: {displayRate} {convert2}
        </p>
      </header>
    </div>
  );
}

export default App;
