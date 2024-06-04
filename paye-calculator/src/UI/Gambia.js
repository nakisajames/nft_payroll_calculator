// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function GambiaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState("0");
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [nhif,setNhif] =useState(0)
  const [diseaseInsurance,setDiseaseInsurance] = useState(0)
  const [pension,setPension] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
 
    //Calculate nhif
    const nhif = grossPay * 0.03
    
    //Calculate housing fund
    const pension = 0.025 * grossPay

     //Calculate social security
     const social_security = 0.05 * grossPay

    //Calculate the national disease insurance
    const insurance = 0.01 * grossPay
  
    // Calculate annual pay
    const annualIncome = grossPay * 12;

    // Calculate PAYE based on taxable pay
    let paye;
    if (annualIncome <= 7500) {
        paye = 0;
    } else if (annualIncome <= 17500) {
        paye = ((annualIncome - 7500) * 0.1) / 12;
    } else if (annualIncome <= 27500) {
        paye = ((annualIncome - 17500) * 0.15 + 1000) / 12;
    } else if (annualIncome <= 37500) {
        paye = ((annualIncome - 27500) * 0.2 + 1000 + 1500) / 12;
    } else if (annualIncome <= 47500) {
        paye = ((annualIncome - 37500) * 0.25 + 1000 + 1500 + 2000) / 12;
    } else {
        paye = ((annualIncome - 47500) * 0.35 + 1000 + 1500 + 2000 + 2500) / 12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + social_security + nhif + pension + insurance);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security)
    setPension(pension)
    setNhif(nhif)
    setDiseaseInsurance(insurance)
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
                    <p><label>Pension:</label></p>
                    <h4 id="paye-value">{formatNumber(pension.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>NHIF:</label></p>
                    <h4 id="paye-value">{formatNumber(nhif.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Disease Insurance and Social Gurantee Fund:</label></p>
                    <h4 id="paye-value">{formatNumber(diseaseInsurance.toFixed(0))}</h4>
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

export default GambiaUI;
