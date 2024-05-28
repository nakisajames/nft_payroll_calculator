// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";

function KenyaUI({ country }) {
  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [nhif,setNhif] =useState(0)
  const [housingFund,setHousingFund] = useState(0)
  const [showNSSF, setShowNSSF] = useState(true); 
  const [showNHIF, setShowNHIF] = useState(true);

  //Calculate social security
  const calculateSocialSecurity = () => {
    return (7000 * 0.06) + (29000 * 0.06);
};

const calculateNHIF = (grossPay) => {
    if (grossPay <= 5999) {
        return 150;
    } else if (grossPay <= 7999) {
        return 300;
    } else if (grossPay <= 11999) {
        return 400;
    } else if (grossPay <= 14999) {
        return 500;
    } else if (grossPay <= 19999) {
        return 600;
    } else if (grossPay <= 24999) {
        return 750;
    } else if (grossPay <= 29999) {
        return 850;
    } else if (grossPay <= 34999) {
        return 900;
    } else if (grossPay <= 39999) {
        return 950;
    } else if (grossPay <= 44999) {
        return 1000;
    } else if (grossPay <= 49999) {
        return 1100;
    } else if (grossPay <= 59999) {
        return 1200;
    } else if (grossPay <= 69999) {
        return 1300;
    } else if (grossPay <= 79999) {
        return 1400;
    } else if (grossPay <= 89999) {
        return 1500;
    } else if (grossPay <= 99999) {
        return 1600;
    } else {
        return 1700;
    }
};


  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

  // Initialize deduction values
  let nssf = 0;
  let nhif = 0;

  // Calculate NSSF if checkbox is checked
  if (showNSSF) {
    nssf = calculateSocialSecurity(grossPay);
  }

  // Calculate NHIF if checkbox is checked
  if (showNHIF) {
    nhif = calculateNHIF(grossPay);
  }

    //Calculate housing fund
    const housing = 0.015 * grossPay
  
    // Calculate taxable pay
    const taxablePay = grossPay - nssf;

    // Calculate PAYE based on taxable pay
    let paye;
    if (taxablePay === 0) {
        paye = 0;
    } else if (taxablePay > 32333) {
        paye = Math.round(((taxablePay - 32333) * 0.3 + 4483.25 - 2400 - 255));
    } else {
        paye = 0; // If taxable pay is less than or equal to 32333, no tax is applied based on the provided formula
    }

    // Calculate net pay
    const netPay = grossPay - (paye + nssf + nhif + housing);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(nssf)
    setHousingFund(housing)
    setNhif(nhif)
  };
  
  return (
    <div>
      <body>
        <div class="card">
          <div class="card-container">
            <div class="inputs-section">
            <form method="post">
              <h4 class="title">{country}</h4>
              <div class ="input-sec">
              <label>Gross Pay:</label>
              <div class="input">
              <input
                type="number"
                name="gross_pay"
                id="gross_pay"
                value={income}
                class="input"
                onChange={(e) => setIncome(e.target.value)}
              />
              </div>
                {/* Checkbox for NSSF */}
          <div>
            <input
              type="checkbox"
              id="nssfCheckbox"
              checked={showNSSF}
              onChange={() => setShowNSSF(!showNSSF)}
            />
            <label for="nssfCheckbox">Deduct NSSF</label>
          </div>
          {/* Checkbox for NHIF */}
          <div>
            <input
              type="checkbox"
              id="nhifCheckbox"
              checked={showNHIF}
              onChange={() => setShowNHIF(!showNHIF)}
            />
            <label for="nhifCheckbox">Deduct NHIF</label>
          </div>
              </div>
              <div class="button-sec">
               <button 
               class="calculate-btn" 
               id="calculateBtn"
               onClick={(e) => calculatePAYE(e)}
               value="Calculate"
               >Calculate</button></div>
            </form>
            </div>
           
            <div class="outputs-section">
            <h4 class="results-title">Results</h4>
                <div class="gross-pay">
                    <p><label>Gross Pay:</label></p>
                    <h4 id="gross-pay-value">{formatNumber(grossPay.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>NSSF:</label></p>
                    <h4 id="paye-value">{formatNumber(socialSecurity.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>NHIF:</label></p>
                    <h4 id="paye-value">{formatNumber(nhif.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Housing Fund:</label></p>
                    <h4 id="paye-value">{formatNumber(housingFund.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>     
                    <h4 id="paye-value">{formatNumber(paye.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Net Pay:</label></p>
                    <h4 id="net-pay-value">{formatNumber(netPay.toFixed(0))}</h4>
                </div>
            </div>
          </div>
        </div>
      </body>      
    </div>
  );
}

export default KenyaUI;
