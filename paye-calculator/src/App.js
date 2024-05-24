import "./App.css";
import CountrySelector from "./UI/CountrySelector";
import SouthAfricaUI from "./UI/SouthAfrica";
import TogoUI from "./UI/Togo";
import GhanaUI from "./UI/Ghana";
import DjiboutiUI from "./UI/Djibouti";
import SeychellesUI from "./UI/Seychelles";
import SaoTomeUI from "./UI/SaoTome";
import CapeVerdeUI from "./UI/CapeVerde";
import CentralAfricaUI from "./UI/CentralAfrica";
import LesothoUI from "./UI/Lesotho";
import EritreaUI from "./UI/Eritrea";
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
      case "Ghana":
        return <GhanaUI country={selectedCountry} />;
      
      case "Togo":
        return <TogoUI country={selectedCountry} />;

      case "Djibouti":
        return <DjiboutiUI country={selectedCountry} />;

      case "Seychelles":
        return <SeychellesUI country={selectedCountry} />;

      case "Sao Tome and Principe":
        return <SaoTomeUI country={selectedCountry} />;

      case "Cape Verde":
        return <CapeVerdeUI country={selectedCountry} />;

      case "Central African Republic":
        return <CentralAfricaUI country={selectedCountry} />;

      case "Lesotho":
        return <LesothoUI country={selectedCountry} />;

      case "Eritrea":
        return <EritreaUI country={selectedCountry} />
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
