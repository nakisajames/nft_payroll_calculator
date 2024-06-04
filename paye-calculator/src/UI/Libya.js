import React, { useState } from "react";

import getCurrency from "../lib/utils";

function LibyaUI({ country }) {
    const currency = getCurrency(country);
    
    const [income, setIncome] = useState("0");
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [socialUnity, setSocialUnity] = useState(0);
    const [jehadTax, setJehadTax] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();

      function computeJehadTax(taxableIncome) {
        let jehadTax;
    
        if (taxableIncome <= 50) {
            jehadTax = taxableIncome * 0.01;
        } else if (taxableIncome <= 100) {
            jehadTax = taxableIncome * 0.02;
        } else {
            jehadTax = taxableIncome * 0.03;
        }
    
        return jehadTax;
    }
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 1000) {
            paye = taxableIncome * 0.05;
        } else {
            paye = ((taxableIncome - 1000) * 0.1) + 50;
        }
    
        return paye;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = grossPay * 0.0375;

      // Calcualte the social unity
      let socialUnity = grossPay * 0.01;
  
      // Calculate taxable income
      let taxableIncome = (grossPay - (socialUnity + socialSecurity));

      // Calculate PAYE
      let paye;
      paye = computePAYE(taxableIncome);

      // Compute jehad tax
      let jehadTax = computeJehadTax(taxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye + socialUnity + jehadTax);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
      setSocialUnity(socialUnity);
      setJehadTax(jehadTax);
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
                    <label>Social Security-Employee:</label>
                  </p>
                  <h4 id="social-security-value">{socialSecurity.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Social Unit Fund:</label>
                  </p>
                  <h4 id="social-security-value">{socialUnity.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Income Tax:</label>
                  </p>
                  <h4 id="paye-value">{paye.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Jehad Tax:</label>
                  </p>
                  <h4 id="paye-value">{jehadTax.toFixed(2)}</h4>
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
  
export default LibyaUI;