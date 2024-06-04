// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function NigerUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)


  const calculateSocialSecurity = (income) => {
    if (income <= 500000) {
        return income * 0.0525;
    } else {
        return 500000 * 0.0525;
    }
    };


  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    // Calculate social security per month
    const social_security = calculateSocialSecurity(income)

    //Taxable Income
    const taxableIncome = grossPay - social_security
  
    // Calculate PAYE
    let paye;
    if (taxableIncome <= 25000) {
        paye = taxableIncome * 0.01;
    } else if (taxableIncome <= 50000) {
        paye = ((taxableIncome - 25000) * 0.02) + 250;
    } else if (taxableIncome <= 100000) {
        paye = ((taxableIncome - 50000) * 0.06) + 750;
    } else if (taxableIncome <= 150000) {
        paye = ((taxableIncome - 100000) * 0.13) + 3750;
    } else if (taxableIncome <= 300000) {
        paye = ((taxableIncome - 150000) * 0.25) + 10250;
    } else if (taxableIncome <= 400000) {
        paye = ((taxableIncome - 300000) * 0.30) + 47750;
    } else if (taxableIncome <= 700000) {
        paye = ((taxableIncome - 400000) * 0.32) + 77750;
    } else if (taxableIncome <= 1000000) {
        paye = ((taxableIncome - 700000) * 0.34) + 173750;
    } else {
        paye = ((taxableIncome - 1000000) * 0.35) + 275750;
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
      <div>
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
                type="text"
                name="gross_pay"
                id="gross_pay"
                value={income}
                class="input"
                onFocus={(e) => e.target.value === "0" && setIncome("")}
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
      </div>      
    </div>
  );
}

export default NigerUI;
