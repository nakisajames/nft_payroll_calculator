// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function GabonUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState("0");
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [pension,setPension] = useState(0)
  const [spouseDead,setSpouseDead] = useState('')
  const [status,setStatus] = useState('')
  const [socialSecurity,setSocialSecurity] = useState(0)
  const [healthInsurance,setHealthInsurance] = useState(0)
  const [diseaseInsurance,setDiseaseInsurance] = useState(0)
  const [children,setChildren] = useState(0)
  const [complementaryTax,setComplementaryTax] = useState(0)

  const calculateShares = () => {
    if (
      (status === "Unmarried" || status === "Divorced" || status === "Widowed") &&
      children === 0
    ) {
      return 1;
    } else if (
      (status === "Married" && children === 0) ||
      ((status === "Unmarried" || status === "Divorced") && children > 0)
    ) {
      return 2;
    } else if (
      ((status === "Married" || status === "Widowed") && spouseDead === "Yes" && children > 0) ||
      ((status === "Unmarried" || status === "Divorced") && children === 2)
    ) {
      return 2.5;
    } else if (
      ((status === "Married" || status === "Widowed") && spouseDead === "Yes" && children === 2) ||
      ((status === "Unmarried" || status === "Divorced") && children === 3)
    ) {
      return 3;
    } else if (
      ((status === "Married" || status === "Widowed") && spouseDead === "Yes" && children === 3) ||
      ((status === "Unmarried" || status === "Divorced") && children === 4)
    ) {
      return 3.5;
    } else {
      return ""; // Default value if no condition is met
    }
  };

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;

    // Calculate the number of shares
    const no_of_shares = calculateShares()

    //Calculate the taxable income
    const taxableIncome = (annualPay -(annualPay*0.2))/no_of_shares
    //Calculate pension
    const pen = grossPay * 0.025

    //Calculate disease Insurance
    const disease = grossPay * 0.01

    //Calculate health Insurance
    const health = grossPay * 0.03

    //Calculate coplimentary tax
    const tax = ((annualPay-1800000) * 0.05)/12

    //Calculate social security
    const social_secuirty = grossPay * 0.06

    // Calculate PAYE
    let paye;
    if (taxableIncome <= 1500000) {
      paye = 0;
    } else if (taxableIncome <= 1920000) {
      paye = (0.05 * (taxableIncome - 1500000)) / 12;
    } else if (taxableIncome <= 2700000) {
      paye = (21000 + 0.1 * (taxableIncome - 1920000)) / 12;
    } else if (taxableIncome <= 3600000) {
      paye = (21000 + 78000 + 0.15 * (taxableIncome - 2700000)) / 12;
    } else if (taxableIncome <= 5160000) {
      paye = (21000 + 78000 + 135000 + 0.2 * (taxableIncome - 3600000)) / 12;
    } else if (taxableIncome <= 7500000) {
      paye = (21000 + 78000 + 135000 + 312000 + 0.25 * (taxableIncome - 5160000)) / 12;
    } else if (taxableIncome <= 9600000) {
      paye = (21000 + 78000 + 135000 + 312000 + 585000 + 0.3 * (taxableIncome - 7500000)) / 12;
    } else {
      paye = (21000 + 78000 + 135000 + 312000 + 585000 + 630000 + 0.35 * (taxableIncome - 9600000)) / 12;
    }
    // Calculate net pay
    const netPay = grossPay - (paye + tax + pen + disease + health + social_secuirty);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setPension(pen)
    setComplementaryTax(tax)
    setDiseaseInsurance(disease)
    setSocialSecurity(social_secuirty)
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
              <div class="input-sec">
                  <label>Marital Status:</label>
                  <div class="input">
                    <select
                      class='input'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              <div class="input-sec input">
                  <label>Spouse died within 2years:</label>
                  <div class="input">
                    <select
                      value={spouseDead}
                      onChange={(e) => setSpouseDead(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
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
                    <p><label>National Pension Fund (CNSS):</label></p>
                    <h4 id="paye-value">{formatNumber(pension.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Social Security (CNaPS):</label></p>
                    <h4 id="paye-value">{formatNumber(socialSecurity.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Health Insurance Fund (CNAM):</label></p>
                    <h4 id="paye-value">{formatNumber(healthInsurance.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Disease Insurance and Social Guarantee Fund (CNAMGS):</label></p>
                    <h4 id="paye-value">{formatNumber(diseaseInsurance.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Complementary Tax:</label></p>     
                    <h4 id="paye-value">{formatNumber(complementaryTax.toFixed(0))}</h4>
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

export default GabonUI;
