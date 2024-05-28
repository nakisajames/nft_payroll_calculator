// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";

function TanzaniaUI({ country }) {
  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    // Calculate social security per month
    const social_security = (grossPay * 0.1)
  
    // Calculate taxable income
    const taxableIncome = grossPay - social_security;

    // Calculate PAYE based on the provided formula
    let paye;
    if (taxableIncome <= 270000) {
        paye = 0;
    } else if (taxableIncome <= 520000) {
        paye = (taxableIncome - 270000) * 0.08;
    } else if (taxableIncome <= 760000) {
        paye = 20000 + (taxableIncome - 520000) * 0.2;
    } else if (taxableIncome <= 1000000) {
        paye = 68000 + (taxableIncome - 760000) * 0.25;
    } else {
        paye = 128000 + (taxableIncome - 1000000) * 0.3;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + social_security);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security)
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
                    <p><label>Social Security:</label></p>
                    <h4 id="paye-value">{formatNumber(socialSecurity.toFixed(0))}</h4>
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

export default TanzaniaUI;
