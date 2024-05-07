import "./App.css";
import CountrySelector from "./UI/CountrySelector";
import SouthAfricaUI from "./UI/SouthAfrica";
import { useState } from "react";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("South Africa");

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const renderCountryUI = () => {
    switch (selectedCountry) {
      case "South Africa":
        return <SouthAfricaUI country={selectedCountry} />;
      // case 'Nigeria':
      //   return <NigeriaUI country={selectedCountry} />;
      // case 'Kenya':
      //   return <KenyaUI country={selectedCountry} />;
      default:
        return null; // Return null for other countries if UI is not available
    }
  };

  return (
    <div>
      <header>
        <img
          src={require("./static/img/logo/nft_app_logo.jpeg")}
          class="image"
          alt="NFT App Logo"
        />
        <h4 class="title">Country Payroll Calculator</h4>
        <CountrySelector onSelectCountry={handleSelectCountry} />
      </header>
      {renderCountryUI()}
    </div>
  );
}

export default App;
