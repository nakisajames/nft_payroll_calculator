import React, { useState } from "react";

import getCurrency from "../lib/utils";

function DjiboutiUI({ country }) {
    const currency = getCurrency(country);
    
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 30000) {
            paye = taxableIncome * 0.02;
          } else if (taxableIncome <= 50000) {
            paye = ((taxableIncome - 30000) * 0.12) + 600;
          } else if (taxableIncome <= 150000) {
            paye = ((taxableIncome - 50000) * 0.15) + 3000;
          } else if (taxableIncome <= 300000) {
            paye = ((taxableIncome - 150000) * 0.22) + 18000;
          } else if (taxableIncome <= 600000) {
            paye = ((taxableIncome - 300000) * 0.25) + 51000;
          } else if (taxableIncome <= 1000000) {
            paye = ((taxableIncome - 600000) * 0.30) + 126000;
          } else if (taxableIncome <= 2000000) {
            paye = ((taxableIncome - 1000000) * 0.35) + 246000;
          } else {
            paye = ((taxableIncome - 2000000) * 0.45) + 596000;
          }
        
          return paye;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = grossPay * 0.06;
  
      // Calculate taxable income
      let taxableIncome = grossPay - socialSecurity;
      // Calculate PAYE
      let paye;
      paye = computePAYE(taxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
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
                    <label>Social Security-Employee (CNSS):</label>
                  </p>
                  <h4 id="social-security-value">{socialSecurity.toFixed(2)}</h4>
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
  
export default DjiboutiUI;