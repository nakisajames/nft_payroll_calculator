import React, { useState } from "react";

import getCurrency from "../lib/utils";

function TunisiaUI({ country }) {
    const currency = getCurrency(country);
    
    const [socialSolidarity, setSocialSolidarity] = useState(0);
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();

      function calculateSocialSolidarity(taxableIncome) {
            if (taxableIncome <= 5000) {
                return 0;
            } else {
                return (taxableIncome * 0.005) / 12;
            }
        }
    
  
      function calculateProfessionalExpenses(annualPay, monthlySocialSecurity) {
        // Calculate annual social security
        const annualSocialSecurity = monthlySocialSecurity * 12;
        
        // Subtract annual social security from annual pay
        const netPay = annualPay - annualSocialSecurity;
        
        // Calculate 10% of net pay
        const tenPercentNetPay = netPay * 0.1;
        
        // Return the minimum value between 2000 and 10% of net pay
        return Math.min(2000, tenPercentNetPay);
       }

      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 5000) {
            paye = 0;
        } else if (taxableIncome <= 20000) {
            paye = (taxableIncome - 5000) * 0.26;
        } else if (taxableIncome <= 30000) {
            paye = ((taxableIncome - 20000) * 0.28) + 3900;
        } else if (taxableIncome <= 50000) {
            paye = ((taxableIncome - 30000) * 0.32) + 6700;
        } else {
            paye = ((taxableIncome - 50000) * 0.35) + 13100;
        }
    
        return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
      const annualPay = grossPay * 12;
  
      // Calculate social security
      let socialSecurity = grossPay * 0.0918;

      // Compute deductions for professional expenses
      let profCosts;
      profCosts  = calculateProfessionalExpenses(annualPay, socialSecurity);

      // Calculate annual taxable income
      let annualTaxableIncome = annualPay - ((socialSecurity * 12) + profCosts)

      // Compute social solidarity (SSC)
      let socialSolidarity = calculateSocialSolidarity(annualTaxableIncome);

      // Calculate PAYE
      let paye;
      paye = computePAYE(annualTaxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye + socialSolidarity);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
      setPaye(paye);
      setNetPay(netPay);
      setSocialSolidarity(socialSolidarity);
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
                    <label>Social Solidarity Contribution (SSC): </label>
                  </p>
                  <h4 id="social-security-value">{socialSolidarity.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>IRPP - Tax:</label>
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
  
export default TunisiaUI;