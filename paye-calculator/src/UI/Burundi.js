// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";

function BurundiUI({ country }) {
  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [pension,setPension] =useState(0)
  const [healthInsurance,setHealthInsurance] = useState(0)

// Calculate social security per month
const calculateSocialSecurity = (grossPay) => {
    const socialSecurity = grossPay * 0.035; // 3.5% of grossPay
    return socialSecurity <= 450000 ? socialSecurity : 450000;
    };

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;
  
    // Calculate PAYE
    let paye;
    if (annualPay <= 1800000) {
      paye = 0;
    } else if (annualPay <= 3600000) {
      paye = (annualPay - 1800000) * 0.2 / 12;
    } else {
      paye = (360000 + (annualPay - 3600000) * 0.3) / 12;
    }

    // Calculate social security per month
    const social_security = calculateSocialSecurity(grossPay);

    //Calculate pension
    const pen = grossPay * 0.01

    //Calculate health Insurance
    const health = grossPay * 0.03

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

export default BurundiUI;
