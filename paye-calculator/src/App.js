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
import SudanUI from "./UI/Sudan";
import IvoryCoastUI from "./UI/IvoryCoast";
import NigerUI from "./UI/Niger";
import BeninUI from "./UI/Benin";
import ComorosUI from "./UI/Comoros";
import ChadUI from "./UI/Chad";
import AlgeriaUI from "./UI/Algeria";
import EthiopiaUI from "./UI/Ethiopia";
import TunisiaUI from "./UI/Tunisia";
import LibyaUI from "./UI/Libya";
import SierraLeoneUI from "./UI/SierraLeone";
import BurkinaFasoUI from "./UI/BurkinaFaso";
import LiberiaUI from "./UI/Liberia";
import MauritiusUI from "./UI/Mauritius";
import MaliUI from "./UI/Mali";
import SomaliaUI from "./UI/Somalia";
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

      case "Sudan":
        return <SudanUI country={selectedCountry} />

      case "Ivory Coast":
        return <IvoryCoastUI country={selectedCountry} />

      case "Niger":
        return <NigerUI country={selectedCountry} />

      case "Benin":
        return <BeninUI country={selectedCountry} />

      case "Comoros":
        return <ComorosUI country={selectedCountry} />

      case "Chad":
        return <ChadUI country={selectedCountry} />

      case "Algeria":
        return <AlgeriaUI country={selectedCountry} />

      case "Ethiopia":
        return <EthiopiaUI country={selectedCountry} />

      case "Tunisia":
        return <TunisiaUI country={selectedCountry} />

      case "Libya":
        return <LibyaUI country={selectedCountry} />

      case "Sierra Leone":
        return <SierraLeoneUI country={selectedCountry} />

      case "Burkina Faso":
        return <BurkinaFasoUI country={selectedCountry} />;

      case "Liberia":
        return <LiberiaUI country={selectedCountry} />;

      case "Mauritius":
        return <MauritiusUI country={selectedCountry} />;

      case "Mali":
        return <MaliUI country={selectedCountry} />;

      case "Somalia":
        return <SomaliaUI country={selectedCountry} />;
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
