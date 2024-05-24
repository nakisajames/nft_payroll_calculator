// CountryUI.js
import React, { useState } from "react";

function EygptUI({ country }) {
  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [martyrsFund, setMartyrsFund] = useState(0)
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)


  const calculateSocialSecurity = (income) => {
    if (income < 2000) {
        return 2000 * 0.11;
    } else if (income > 12600) {
        return 12600 * 0.11;
    } else {
        return income * 0.11;
    }
    };


  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    // Calculate social security per month
    const social_security = calculateSocialSecurity(income)

     // Calculate martyrs fund
     const martyrs_fund = grossPay * 0.0005

    //Taxable Income
    const taxableIncome = ((grossPay - social_security) * 12) -20000
  
    // Calculate PAYE
    let paye;
    if (taxableIncome <= 21000) {
        paye = 0;
    } else if (taxableIncome <= 30000) {
        paye = ((taxableIncome - 21000) * 0.025) / 12;
    } else if (taxableIncome <= 45000) {
        paye = (((taxableIncome - 30000) * 0.10) + 225) / 12;
    } else if (taxableIncome <= 60000) {
        paye = (((taxableIncome - 45000) * 0.15) + 1725) / 12;
    } else if (taxableIncome <= 200000) {
        paye = (((taxableIncome - 60000) * 0.20) + 3975) / 12;
    } else if (taxableIncome <= 400000) {
        paye = (((taxableIncome - 200000) * 0.225) + 31975) / 12;
    } else if (taxableIncome <= 785000) {
        paye = (((taxableIncome - 400000) * 0.25) + 76975) / 12;
    } else {
        paye = (((taxableIncome - 785000) * 0.275) + 173225) / 12;
    }
    // Calculate net pay
    const netPay = grossPay - (paye + social_security + martyrs_fund);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security)
    setMartyrsFund(martyrs_fund)
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
                    <h4 id="gross-pay-value">{grossPay.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Social Security:</label></p>
                    <h4 id="paye-value">{socialSecurity.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Martyrs Fund:</label></p>
                    <h4 id="paye-value">{martyrsFund.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>     
                    <h4 id="paye-value">{paye.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Net Pay:</label></p>
                    <h4 id="net-pay-value">{netPay.toFixed(0)}</h4>
                </div>
            </div>
          </div>
        </div>
      </body>      
    </div>
  );
}

export default EygptUI;
