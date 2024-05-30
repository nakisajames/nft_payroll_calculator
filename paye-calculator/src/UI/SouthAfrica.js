// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function SouthAfricaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [uif, setUIF] = useState(177);
  const [age, setAge] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
    const ageGroup = parseFloat(age);
    const otherDeductions = parseFloat(deductions);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;
  
    // Calculate tax rebate based on age group
    let taxRebate;
    if (ageGroup < 65) {
      taxRebate = 17235;
    } else if (ageGroup <= 75) {
      taxRebate = 9444;
    } else {
      taxRebate = 3145;
    }
  
    // Calculate PAYE
    let paye;
    if (annualPay < 237100) {
      paye = (annualPay * 0.18 - taxRebate) / 12;
    } else if (annualPay < 370500) {
      paye = ((annualPay - 237100) * 0.26 + 42678 - taxRebate) / 12;
    } else if (annualPay < 512800) {
      paye = ((annualPay - 370500) * 0.31 + 77362 - taxRebate) / 12;
    } else if (annualPay < 673000) {
      paye = ((annualPay - 512800) * 0.36 + 121475 - taxRebate) / 12;
    } else if (annualPay < 857900) {
      paye = ((annualPay - 673000) * 0.39 + 179147 - taxRebate) / 12;
    } else if (annualPay < 1817000) {
      paye = ((annualPay - 857900) * 0.41 + 251258 - taxRebate) / 12;
    } else {
      paye = ((annualPay - 1817000) * 0.45 + 644489 - taxRebate) / 12;
    }
  
    // Calculate UIF
    const uifAmount = parseFloat(uif);
  
    // Calculate net pay
    const netPay = grossPay - (paye + uifAmount + otherDeductions);
  
    // Update results
    setGrossPay(grossPay);
    setUIF(uifAmount);
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
              <div class ="input-sec">
              <label>Age Group:</label>
              <div class="input">
              <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              </div>
              <div class ="input-sec">
              <label>UIF:</label>
              <div class="input">
              <input type="number" name="uif" id="uif" defaultValue={uif} onChange={(e) => setUIF(e.target.value)} readOnly/>
              </div>
              </div>
              <div class ="input-sec">
              <label>Other Deductions:</label>
              <div class="input">
              <input
                type="number"
                name="deductions"
                id="deductions"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
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
                    <p><label>UIF:</label></p>
                    <h4 id="paye-value">{formatNumber(uif.toFixed(0))}</h4>
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

export default SouthAfricaUI;
