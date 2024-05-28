import React, { useState } from "react";

import getCurrency from "../lib/utils";

function ComorosUI({ country }) {
    const currency = getCurrency(country);
    
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 150000) {
            paye = 0;
        } else if (taxableIncome <= 500000) {
            paye = (taxableIncome - 150000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            paye = ((taxableIncome - 500000) * 0.10) + 17500;
        } else if (taxableIncome <= 1500000) {
            paye = ((taxableIncome - 1000000) * 0.15) + 67500;
        } else if (taxableIncome <= 2500000) {
            paye = ((taxableIncome - 1500000) * 0.20) + 142500;
        } else if (taxableIncome <= 3500000) {
            paye = ((taxableIncome - 2500000) * 0.25) + 342500;
        } else {
            paye = ((taxableIncome - 3500000) * 0.30) + 592500;
        }
    
        return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);

      // Compute the annual pay
      const annualPay = grossPay * 12;

      // Calculate PAYE
      let paye;
      paye = computePAYE(annualPay);
  

      // Calculate the netpay
      const netPay = grossPay - paye;
  
      // Update results
      setGrossPay(grossPay);
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
  
export default ComorosUI;