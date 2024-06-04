// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function RwandaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [maternity,setMaternity] =useState(0)
  const [cbhi,setCBHI] = useState(0)

// Calculate social security per month
const calculateSocialSecurity = (grossPay) => {
    const socialSecurity = grossPay * 0.03; 
    return socialSecurity;
    };

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate PAYE
    let paye;
    if (grossPay < 60001) {
        paye = 0;
    } else if (grossPay < 100000) {
        paye = (grossPay - 60000) * 0.1;
    } else if (grossPay < 200000) {
        paye = ((grossPay - 100000) * 0.2) + 4000;
    } else {
        paye = ((grossPay - 200000) * 0.3) + 4000 + 20000;
    }

    // Calculate social security per month
    const social_security = grossPay * 0.03;

    //Calculate pension
    const maternity = grossPay * 0.003

    // Calculate CBHI
    const cbhi = (grossPay - (social_security + maternity + paye)) * 0.005;


    // Calculate net pay
    const netPay = grossPay - (paye + social_security + cbhi + maternity);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security)
    setMaternity(maternity)
    setCBHI(cbhi)
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
                    <p><label>Maternity:</label></p>
                    <h4 id="paye-value">{formatNumber(maternity.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label> CBHI (Community-Based Health Insurance):</label></p>
                    <h4 id="paye-value">{formatNumber(cbhi.toFixed(0))}</h4>
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

export default RwandaUI;
