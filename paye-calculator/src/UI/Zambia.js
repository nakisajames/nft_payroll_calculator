// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";

function ZambiaUI({ country }) {
  const [income, setIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [nssf, setNSSF] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [nhi,setNHI] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
    const otherDeductions = parseFloat(deductions) * 12;
  
    const healthInsurance = grossPay * 0.01;
  
    // Calculate the social security
    let socialSecurity;
    if (grossPay <= 21476) {
      socialSecurity = grossPay * 0.05;
    } else {
      socialSecurity = 1342;
    }
  
    // Calculate the taxable income
    const taxableIncome = grossPay - otherDeductions;
  
    let paye;
    if (taxableIncome < 5101) {
      paye = 0;
    } else if (taxableIncome < 7101) {
      paye = ((taxableIncome - 5100) * 0.2) ;
    } else if (taxableIncome < 9201) {
      paye = (((taxableIncome - 7100) * 0.3) + 400) ;
    } else {
      paye = (((taxableIncome - 9200) * 0.37) + 1030) ;
    }
    // Calculate net pay
    const netPay = grossPay - (paye + socialSecurity + healthInsurance);
  
    // Update results
    setGrossPay(grossPay);
    setNSSF(socialSecurity);
    setPAYE(paye);
    setNetPay(netPay);
    setNHI(healthInsurance);
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
                    <p><label>Gross Pay:</label></p>
                    <h4 id="gross-pay-value">{formatNumber(grossPay.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Social Security:</label></p>
                    <h4 id="paye-value">{formatNumber(nssf.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Health Insurance:</label></p>     
                    <h4 id="paye-value">{formatNumber(nhi.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>
                    <h4 id="net-pay-value">{formatNumber(paye.toFixed(0))}</h4>
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

export default ZambiaUI;
