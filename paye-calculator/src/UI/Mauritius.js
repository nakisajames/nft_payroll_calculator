import React, { useState } from "react";

import getCurrency from "../lib/utils";

function MauritiusUI({ country }) {
    const currency = getCurrency(country);
    const taxRelief = 325000;
    
    const [income, setIncome] = useState("0");
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [NSF, setNSF] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();

      function calculateSocialSecurity(grossPay) {
        let socialSecurity;
    
        if (grossPay <= 50000) {
            socialSecurity = grossPay * 0.015;
        } else {
            socialSecurity = grossPay * 0.03;
        }
    
        return socialSecurity;
       }
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 390000) {
            paye = 0;
        } else if (taxableIncome <= 430000) {
            paye = (taxableIncome - 390000) * 0.02;
        } else if (taxableIncome <= 470000) {
            paye = (taxableIncome - 430000) * 0.04 + 800;
        } else if (taxableIncome <= 530000) {
            paye = (taxableIncome - 470000) * 0.06 + 800 + 1600;
        } else if (taxableIncome <= 590000) {
            paye = (taxableIncome - 530000) * 0.08 + 800 + 1600 + 3600;
        } else if (taxableIncome <= 890000) {
            paye = (taxableIncome - 590000) * 0.1 + 800 + 1600 + 3600 + 4800;
        } else if (taxableIncome <= 1190000) {
            paye = (taxableIncome - 890000) * 0.12 + 800 + 1600 + 3600 + 4800 + 30000;
        } else if (taxableIncome <= 1490000) {
            paye = (taxableIncome - 1190000) * 0.14 + 800 + 1600 + 3600 + 4800 + 30000 + 36000;
        } else if (taxableIncome <= 1890000) {
            paye = (taxableIncome - 1490000) * 0.16 + 800 + 1600 + 3600 + 4800 + 30000 + 36000 + 42000;
        } else if (taxableIncome <= 2390000) {
            paye = (taxableIncome - 1890000) * 0.18 + 800 + 1600 + 3600 + 4800 + 30000 + 36000 + 42000 + 64000;
        } else {
            paye = (taxableIncome - 2390000) * 0.2 + 800 + 1600 + 3600 + 4800 + 30000 + 36000 + 42000 + 64000 + 90000;
        }
    
        return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
      const annualPay = grossPay * 12;
  
      // Calculate social security
      let socialSecurity = calculateSocialSecurity(grossPay);

      // Compute NSF
      let NSF = grossPay * 0.01;

      // Compute taxable income 
      let taxableIncome = annualPay - taxRelief;
      
      // Calculate PAYE
      let paye;
      paye = computePAYE(taxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye + NSF);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
      setNSF(NSF);
      setPaye(paye);
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
                  <div class="input-sec">
                    <label for="gross_pay">Gross Pay:</label>
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
                    >
                      Calculate
                    </button>
                  </div>
                </form>
              </div>
  
              <div class="outputs-section">
                <h4 class="results-title">Results</h4>
                <div class="gross-pay">
                  <p>
                    <label>Currency:</label>
                  </p>
                  <h4 id="currency-value">{currency}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Gross Pay:</label>
                  </p>
                  <h4 id="gross-pay-value">{grossPay.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Social Security-Employee (CSG):</label>
                  </p>
                  <h4 id="social-security-value">{socialSecurity.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>National Savings Fund (NSF):</label>
                  </p>
                  <h4 id="social-security-value">{NSF.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>PAYE:</label>
                  </p>
                  <h4 id="paye-value">{paye.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Net Pay:</label>
                  </p>
                  <h4 id="net-pay-value">{netPay.toFixed(2)}</h4>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
}
  
export default MauritiusUI;