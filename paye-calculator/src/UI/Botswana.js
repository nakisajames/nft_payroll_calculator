// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function BotswanaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState("0");
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;
  
    // Calculate PAYE
    let paye;

  if (annualPay <= 48000) {
    paye = 0;
  } else if (annualPay <= 84000) {
    paye = ((annualPay - 48000) * 0.05) /12;
  } else if (annualPay <= 120000) {
    paye = ((annualPay - 84000) * 0.125 + 1800) / 12;
  } else if (annualPay <= 156000) {
    paye = ((annualPay - 120000) * 0.1875 + 6300)/ 12;
  } else {
    paye = ((annualPay - 156000) * 0.25 + 13050) / 12;
  }

    // Calculate net pay
    const netPay = grossPay - paye;
  
    // Update results
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
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
                  <p>
                    <label>Currency:</label>
                  </p>
                  <h4 id="gross-pay-value">
                    {currency}
                  </h4>
                </div>
                <div class="gross-pay">
                    <p><label>Gross Pay:</label></p>
                    <h4 id="gross-pay-value">{formatNumber(grossPay.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>     
                    <h4 id="paye-value">{formatNumber(paye.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Net Pay:</label></p>
                    <h4 id="net-pay-value">{formatNumber(netPay.toFixed(2))}</h4>
                </div>
            </div>
          </div>
        </div>
      </body>      
    </div>
  );
}

export default BotswanaUI;
