// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";

function SenegalUI({ country }) {
  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [pension,setPension] =useState(0)
  const [healthInsurance,setHealthInsurance] = useState(0)



  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
     // Calculate social security per month
     const social_security = 0.075 * 250000;

     //Calculate pension
     const pen = 0.09 * 360000
 
     //Calculate health Insurance
     const health = 0.06 * (250000-60000)
 
    // Calculate taxable pay
    const taxablePay = (grossPay -(social_security + pen + health)) * 12
  
    // Calculate PAYE
    let paye;

    if (taxablePay <= 630000) {
        paye = (taxablePay * 0) / 12;
    } else if (taxablePay <= 1500000) {
        paye = ((taxablePay - 630000) * 0.2) / 12;
    } else if (taxablePay <= 4000000) {
        paye = (((taxablePay - 1500000) * 0.3) + 174000) / 12;
    } else if (taxablePay <= 8000000) {
        paye = (((taxablePay - 4000000) * 0.35) + 174000 + 750000) / 12;
    } else if (taxablePay <= 13500000) {
        paye = (((taxablePay - 8000000) * 0.37) + 174000 + 750000 + 1400000) / 12;
    } else if (taxablePay <= 50000000) {
        paye = (((taxablePay - 13500000) * 0.4) + 174000 + 750000 + 1400000 + 2035000) / 12;
    } else {
        paye = (((taxablePay - 50000000) * 0.43) + 174000 + 750000 + 1400000 + 2035000 + 14600000) / 12;
    }
   
    // Calculate net pay
    const netPay = grossPay - (paye + social_security + health + pen);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security)
    setPension(pen)
    setHealthInsurance(health)
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
                    <p><label>Pension:</label></p>
                    <h4 id="paye-value">{formatNumber(pension.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Health Insurance:</label></p>
                    <h4 id="paye-value">{formatNumber(healthInsurance.toFixed(0))}</h4>
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

export default SenegalUI;
