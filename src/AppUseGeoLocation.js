// import { useState } from "react";
import { useGeolocation } from "./UseGeolocation";

export default function App() {
  const { isLoading, error, countClicks, getPosition, lat, lng } =
    useGeolocation();

  function handleEvents() {
    getPosition();
  }

  return (
    <div>
      <button onClick={handleEvents} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
