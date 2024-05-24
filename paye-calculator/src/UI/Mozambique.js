// CountryUI.js
import React, { useState } from "react";

function MozambiqueUI({ country }) {
  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;

    // Calculate social security per month
    const social_security = (grossPay * 0.03)

    //Taxable Income
    const taxableIncome = annualPay - (social_security * 12)
  
    // Calculate PAYE
    let paye;
    if (taxableIncome <= 42000) {
      paye = (taxableIncome * 0.1) / 12;
    } else if (taxableIncome <= 168000) {
      paye = (4200 + (taxableIncome - 42000) * 0.15) / 12;
    } else if (taxableIncome <= 504000) {
      paye = (4200 + 18900 + (taxableIncome - 168000) * 0.2) / 12;
    } else if (taxableIncome <= 1512000) {
      paye = (4200 + 18900 + 67200 + (taxableIncome - 504000) * 0.25) / 12;
    } else {
      paye = (4200 + 18900 + 67200 + 252000 + (taxableIncome - 1512000) * 0.32) / 12;
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
                    <h4 id="gross-pay-value">{grossPay.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Social Security:</label></p>
                    <h4 id="paye-value">{socialSecurity.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>     
                    <h4 id="paye-value">{paye.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Net Pay:</label></p>
                    <h4 id="net-pay-value">{netPay.toFixed(2)}</h4>
                </div>
            </div>
          </div>
        </div>
      </body>      
    </div>
  );
}

export default MozambiqueUI;
