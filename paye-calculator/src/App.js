import "./App.css";
import CountrySelector, { sortedCountries } from "./UI/CountrySelector";
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
import SwazilandUI from "./UI/Swaziland";
import NamibiaUI from "./UI/Namibia";
import BotswanaUI from "./UI/Botswana";
import ZambiaUI from "./UI/Zambia";
import ZimbabweUI from "./UI/Zimbabwe";
import MozambiqueUI from "./UI/Mozambique";
import MalawiUI from "./UI/Malawi";
import MadagascarUI from "./UI/Madagascar";
import AngolaUI from "./UI/Angola";
import DrcUI from "./UI/Drc";
import CongoUI from "./UI/Congo";
import GabonUI from "./UI/Gabon";
import KenyaUI from "./UI/Kenya";
import BurundiUI from "./UI/Burundi";
import RwandaUI from "./UI/Rwanda";
import TanzaniaUI from "./UI/Tanzania";
import NigeriaUI from "./UI/Nigeria";
import SenegalUI from "./UI/Senegal";
import EygptUI from "./UI/Egypt";
import MoroccoUI from "./UI/Morocco";
import SouthSudanUI from './UI/SouthSudan';
import EquatorialGuineaUI from './UI/EquatorialGuinea';
import GuineaUI from './UI/Guinea';
import CameroonUI from './UI/Cameroon';
import GambiaUI from "./UI/Gambia";
import GuineaBissauUI from './UI/GuineaBissau';
import MauritaniaUI from './UI/Mauritania';
import UgandaUI from './UI/Uganda';
import { useState } from "react";







function App() {
  // const [selectedCountry, setSelectedCountry] = useState("South Africa");
  const [selectedCountry, setSelectedCountry] = useState(sortedCountries[0]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const renderCountryUI = () => {
    switch (selectedCountry) {
      case "South Africa":
        return <SouthAfricaUI country={selectedCountry} />;
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
      case "Swaziland":
        return <SwazilandUI country={selectedCountry} />;
      case "Namibia":
        return <NamibiaUI country={selectedCountry} />;
      case "Botswana":
        return <BotswanaUI country={selectedCountry} />;
      case "Zambia":
        return <ZambiaUI country={selectedCountry} />;
      case "Lesotho":
        return <LesothoUI country={selectedCountry} />;
      case "Zimbabwe":
        return <ZimbabweUI country={selectedCountry} />;
      case "Mozambique":
        return <MozambiqueUI country={selectedCountry} />;
      case "Malawi":
        return <MalawiUI country={selectedCountry} />;
      case "Madagascar":
        return <MadagascarUI country={selectedCountry} />;
      case "Angola":
        return <AngolaUI country={selectedCountry} />;
      case "DRC":
        return <DrcUI country={selectedCountry} />;
      case "Congo":
        return <CongoUI country={selectedCountry} />;
      case "Gabon":
        return <GabonUI country={selectedCountry} />;
      case "Burundi":
        return <BurundiUI country={selectedCountry} />;
      case "Rwanda":
        return <RwandaUI country={selectedCountry} />;
      case "Tanzania":
        return <TanzaniaUI country={selectedCountry} />;
      case "Nigeria":
        return <NigeriaUI country={selectedCountry} />;
      case "Kenya":
        return <KenyaUI country={selectedCountry} />;
      case "Senegal":
        return <SenegalUI country={selectedCountry} />;
      case "Niger":
        return <NigerUI country={selectedCountry} />;
      case "Egypt":
        return <EygptUI country={selectedCountry} />;
      case "Morocco":
        return <MoroccoUI country={selectedCountry} />;
      case "South Sudan":
        return <SouthSudanUI country={selectedCountry} />;
      case "Equatorial Guinea":
      return <EquatorialGuineaUI country={selectedCountry} />;
      case "Guinea":
      return <GuineaUI country={selectedCountry} />;
      case "Cameroon":
      return <CameroonUI country={selectedCountry} />;
      case "Gambia":
        return <GambiaUI country={selectedCountry} />;
      case "Guinea Bissau":
        return <GuineaBissauUI country={selectedCountry} />;
      case "Liberia":
      return <LiberiaUI country={selectedCountry} />;
      case "Mauritania":
      return <MauritaniaUI country={selectedCountry} />;
      case "Uganda":
        return <UgandaUI country={selectedCountry} />;

      case "Sudan":
        return <SudanUI country={selectedCountry} />

      case "Ivory Coast":
        return <IvoryCoastUI country={selectedCountry} />
        
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
