import React, { useState } from "react";

import getCurrency from "../lib/utils";

function TogoUI({ country }) {
    const currency = getCurrency(country);
    const [stdAbatement , setAbatement]= useState(0);
    
    const [income, setIncome] = useState();
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 900000) {
            paye = 0;
        } else if (taxableIncome <= 3000000) {
            paye = (taxableIncome - 900000) * 0.03;
        } else if (taxableIncome <= 6000000) {
            paye = ((taxableIncome - 3000000) * 0.10) + 63000;
        } else if (taxableIncome <= 9000000) {
            paye = ((taxableIncome - 6000000) * 0.15) + 363000;
        } else if (taxableIncome <= 12000000) {
            paye = ((taxableIncome - 9000000) * 0.20) + 813000;
        } else if (taxableIncome <= 15000000) {
            paye = ((taxableIncome - 12000000) * 0.25) + 1413000;
        } else if (taxableIncome <= 20000000) {
            paye = ((taxableIncome - 15000000) * 0.30) + 2163000;
        } else {
            paye = ((taxableIncome - 20000000) * 0.35) + 3663000;
        }

        // The formula divides the annual tax by 12 to get the monthly PAYE
        return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = grossPay * 0.04;

      // Calculate standard abatement
      let stdAbatement;

      stdAbatement = (grossPay - socialSecurity) * 0.28;
  
      // Calculate taxable income
      let annualtaxableIncome = (grossPay - (socialSecurity + stdAbatement)) * 12;
      // Calculate PAYE
      let paye;
      paye = computePAYE(annualtaxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
      setPaye(paye);
      setNetPay(netPay);
      setAbatement(stdAbatement);
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
                        placeholder="0"
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
                    <label>Standard Abatement:</label>
                  </p>
                  <h4 id="social-security-value">{stdAbatement.toFixed(2)}</h4>
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
  
export default TogoUI;
  

