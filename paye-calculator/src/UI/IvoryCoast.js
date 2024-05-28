import React, { useState } from "react";

import getCurrency from "../lib/utils";

function IvoryCoastUI({ country }) {
    const currency = getCurrency(country);
    
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [CN, setCN] = useState(0);
    const [salaryTax, setSalaryTax] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);

    function calculateNationalContribution(annualTaxableIncome) {
      let contribution;
  
      if (annualTaxableIncome <= 600000) {
          contribution = 0;
      } else if (annualTaxableIncome <= 1560000) {
          contribution = (annualTaxableIncome * 0.015) - 9000;
      } else if (annualTaxableIncome <= 2400000) {
          contribution = (annualTaxableIncome * 0.05) - 63600;
      } else {
          contribution = (annualTaxableIncome * 0.10) - 183600;
      }
  
      return contribution / 12;
  };
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 300000) {
          paye = 0;
        } else if (taxableIncome <= 547000) {
            paye = (taxableIncome * (10 / 110)) - 27273;
        } else if (taxableIncome <= 979000) {
            paye = (taxableIncome * (15 / 115)) - 48913;
        } else if (taxableIncome <= 1519000) {
            paye = (taxableIncome * (20 / 120)) - 84375;
        } else if (taxableIncome <= 2644000) {
            paye = (taxableIncome * (25 / 125)) - 135000;
        } else if (taxableIncome <= 4669000) {
            paye = (taxableIncome * (35 / 135)) - 291667;
        } else if (taxableIncome <= 10106000) {
            paye = (taxableIncome * (45 / 145)) - 530172;
        } else {
            paye = (taxableIncome * (60 / 160)) - 1183594;
        }
  
      return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = grossPay * 0.063;

      // Compute taxable income 
      let taxableIncome = grossPay * 0.8

      // Calculate annual taxable income
      let annualTaxableIncome = taxableIncome * 12

      // Compute salary tax (IS)
      let salaryTax = taxableIncome * 0.015

      // Compute national contribution (CN)
      let CN = calculateNationalContribution(annualTaxableIncome);

      // Calculate tax base
      const taxBase = (taxableIncome - (salaryTax + CN)) * 0.85

      // Calculate annual tax base
      const annualTaxBase = taxBase * 12

      // Calculate PAYE
      let paye;
      paye = computePAYE(annualTaxBase);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye + CN + salaryTax);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
      setSalaryTax(salaryTax);
      setCN(CN);
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
                    <label>Social Security-Employee (CNPS):</label>
                  </p>
                  <h4 id="social-security-value">{socialSecurity.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Salary Tax (IS):</label>
                  </p>
                  <h4 id="paye-value">{salaryTax.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>National Contribution (CN):</label>
                  </p>
                  <h4 id="paye-value">{CN.toFixed(2)}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Income Tax (IGR):</label>
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
  
export default IvoryCoastUI;