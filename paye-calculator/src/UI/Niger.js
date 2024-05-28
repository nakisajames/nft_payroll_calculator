import React, { useState } from "react";

import getCurrency from "../lib/utils";

function NigerUI({ country }) {
    const currency = getCurrency(country);
    
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();

      function calculateSocialSecurity(grossPay) {
        const limit = 500000;
        const rate = 5.25 / 100;
        let socialSecurity;
    
        if (grossPay <= limit) {
            socialSecurity = grossPay * rate;
        } else {
            socialSecurity = limit * rate;
        }
    
        return socialSecurity;
      }
  
      const computePAYE = (taxableIncome) => {
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
    
        return paye;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = calculateSocialSecurity(grossPay);
  
      // Calculate taxable income
      let taxableIncome = (grossPay - socialSecurity);
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
                    <label>PAYE (Income Tax):</label>
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
  
export default NigerUI;