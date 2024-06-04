import React, { useState } from "react";

import getCurrency from "../lib/utils";

/*
    - Lesotho doesnt have social security 
    in their paye computation

*/

function EritreaUI({ country }) {
    const currency = getCurrency(country);
    const [income, setIncome] = useState();
    const [grossPay, setGrossPay] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let annualTax;

        if (taxableIncome <= 2400) {
            annualTax = taxableIncome * 0.02;
        } else if (taxableIncome <= 14400) {
            annualTax = ((taxableIncome - 2400) * 0.1) + 48;
        } else if (taxableIncome <= 30000) {
            annualTax = ((taxableIncome - 14400) * 0.2) + 1248;
        } else if (taxableIncome <= 42000) {
            annualTax = ((taxableIncome - 30000) * 0.25) + 4368;
        } else {
            annualTax = ((taxableIncome - 42000) * 0.3) + 7368;
        }

        // Convert annual tax to monthly tax
        let monthlyTax = annualTax / 12;

        return monthlyTax;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);

      // Compute annual pay
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
  
export default EritreaUI;