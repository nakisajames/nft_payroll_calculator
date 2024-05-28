import "./App.css";
import CountrySelector from "./UI/CountrySelector";
import SouthAfricaUI from "./UI/SouthAfrica";
import { useState } from "react";
import SwazilandUI from "./UI/Swaziland";
import NamibiaUI from "./UI/Namibia";
import BostwanaUI from "./UI/Bostwana";
import ZambiaUI from "./UI/Zambia";
import LesothoUI from "./UI/Lesotho";
import ZimbabweUI from "./UI/Zimbabwe";
import MozambiqueUI from "./UI/Mozambique";
import MalawiUI from "./UI/Malawi";
import MadagscarUI from "./UI/Madgascar";
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
import NigerUI from "./UI/Niger";
import EygptUI from "./UI/Eygpt";
import MoroccoUI from "./UI/Morocco";
import SouthSudanUI from './UI/SouthSudan';
import EquatorialGuineaUI from './UI/EquatorialGuinea';
import GuineaUI from './UI/Guinea';
import CameroonUI from './UI/Cameroon';
import GambiaUI from "./UI/Gambia";
import GuineaBissauUI from './UI/GuineaBissau';
import LiberiaUI from './UI/Liberia';
import MauritaniaUI from './UI/Mauritania';
import UgandaUI from './UI/Uganda';

function App() {
  const [selectedCountry, setSelectedCountry] = useState("South Africa");

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const renderCountryUI = () => {
    switch (selectedCountry) {
      case "South Africa":
        return <SouthAfricaUI country={selectedCountry} />;
      case "Swaziland":
        return <SwazilandUI country={selectedCountry} />;
      case "Namibia":
        return <NamibiaUI country={selectedCountry} />;
      case "Bostwana":
        return <BostwanaUI country={selectedCountry} />;
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
      case "Madagscar":
        return <MadagscarUI country={selectedCountry} />;
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
      case "Eygpt":
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
