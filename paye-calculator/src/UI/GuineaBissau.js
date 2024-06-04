// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function GuineaBissauUI({ country }) {
  const currency = getCurrency(country);
  const [income, setIncome] = useState("0");
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    // Calculate social security per month
    const social_security = grossPay * 0.08

    //Calculate taxable Income
    const taxableIncome = (grossPay - social_security)* 12
  
    // Calculate PAYE
    let paye;
    if (taxableIncome <= 500000) {
        paye = (taxableIncome * 0.01) / 12;
    } else if (taxableIncome <= 1000000) {
        paye = ((taxableIncome - 500000) * 0.06 + 5000) / 12;
    } else if (taxableIncome <= 2500000) {
        paye = ((taxableIncome - 1000000) * 0.08 + 5000 + 30000) / 12;
    } else if (taxableIncome <= 3600000) {
        paye = ((taxableIncome - 2500000) * 0.1 + 5000 + 30000 + 120000) / 12;
    } else if (taxableIncome <= 4806000) {
        paye = ((taxableIncome - 3600000) * 0.12 + 5000 + 30000 + 120000 + 110000) / 12;
    } else if (taxableIncome <= 9000000) {
        paye = ((taxableIncome - 4806000) * 0.14 + 5000 + 30000 + 120000 + 110000 + 144720) / 12;
    } else if (taxableIncome <= 13200000) {
        paye = ((taxableIncome - 9000000) * 0.16 + 5000 + 30000 + 120000 + 110000 + 144720 + 587160) / 12;
    } else if (taxableIncome <= 18000000) {
        paye = ((taxableIncome - 13200000) * 0.18 + 5000 + 30000 + 120000 + 110000 + 144720 + 587160 + 672000) / 12;
    } else {
        paye = ((taxableIncome - 18000000) * 0.2 + 5000 + 30000 + 120000 + 110000 + 144720 + 587160 + 672000 + 864000) / 12;
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
              <div class="input-sec">
                  <label for="currency">Currency:</label>
                  <div class="input">
                    <input
                      type="text"
                      name="currency"
                      id="currency"
                      value={currency}
                      class="input"
                      readOnly
                    />
                  </div>
                </div>
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
                    <p><label>Currency:</label></p>
                    <h4 id="gross-pay-value">{currency}</h4>
                </div>
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

export default GuineaBissauUI;
