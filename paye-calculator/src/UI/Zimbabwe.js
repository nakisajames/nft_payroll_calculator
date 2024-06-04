// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function ZimbabweUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [aids,setAIDS] =useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;
  
    // Calculate PAYE
    let paye;
        if (annualPay <= 300000) {
            paye = (annualPay * 0) / 12;
        } else if (annualPay <= 720000) {
            paye = ((annualPay - 300000) * 0.2) / 12;
        } else if (annualPay <= 1440000) {
            paye = (84000 + (annualPay - 720000) * 0.25) / 12;
        } else if (annualPay <= 2880000) {
            paye = (264000 + (annualPay - 1440000) * 0.3) / 12;
        } else if (annualPay <= 6000000) {
            paye = (696000 + (annualPay - 2880000) * 0.35) / 12;
        } else {
            paye = (1788000 + (annualPay - 6000000) * 0.4) / 12;
        }
  
    // Calculate social security per month
    const social_security = grossPay * 0.045

    //Calculate AIDS
    const aids = paye * 0.03

    // Calculate net pay
    const netPay = grossPay - (paye + social_security + aids);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security)
    setAIDS(aids)
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
                    <p><label>AIDS:</label></p>
                    <h4 id="paye-value">{formatNumber(aids.toFixed(0))}</h4>
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

export default ZimbabweUI;
