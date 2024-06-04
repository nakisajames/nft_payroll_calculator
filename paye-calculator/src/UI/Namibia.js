// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function NamibiaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState();
  const [socialSecurity, setSocialSecurity] = useState(81);
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

    if (annualPay <= 50000) {
      paye = 0;
    } else if (annualPay <= 100000) {
      paye = 0.18 * (annualPay - 50000);
    } else if (annualPay <= 300000) {
      paye = 9000 + 0.25 * (annualPay - 100000);
    } else if (annualPay <= 500000) {
      paye = 59000 + 0.28 * (annualPay - 300000);
    } else if (annualPay <= 800000) {
      paye = 115000 + 0.3 * (annualPay - 500000);
    } else if (annualPay <= 1500000) {
      paye = 205000 + 0.32 * (annualPay - 800000);
    } else {
      paye = 429000 + 0.37 * (annualPay - 1500000);
    }
  
    // Calculate PAYE per month
    const payePerMonth = paye / 12;

    // Calculate net pay
    const netPay = grossPay - ((paye/12) + socialSecurity);
  
    // Update results
    setGrossPay(grossPay);
    setPAYE(payePerMonth);
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
                placeholder="0"
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

export default NamibiaUI;
