import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function MaliUI({ country }) {
    const currency = getCurrency(country);
    
    
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [NHIF, setNHIF] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 330000) {
            paye = 0;
        } else if (taxableIncome <= 578400) {
            paye = (taxableIncome - 330000) * 0.05;
        } else if (taxableIncome <= 1176400) {
            paye = (taxableIncome - 578400) * 0.12 + 12420;
        } else if (taxableIncome <= 1789733) {
            paye = (taxableIncome - 1176400) * 0.18 + 12420 + 71760;
        } else if (taxableIncome <= 2384195) {
            paye = (taxableIncome - 1789733) * 0.26 + 12420 + 71760 + 110399.94;
        } else if (taxableIncome <= 3494130) {
            paye = (taxableIncome - 2384195) * 0.31 + 12420 + 71760 + 110399.94 + 154560.12;
        } else {
            paye = (taxableIncome - 3494130) * 0.37 + 12420 + 71760 + 110399.94 + 154560.12 + 344079.85;
        }
    
        // Return the monthly PAYE by dividing by 12
        return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
      const annualPay = grossPay * 12;
  
      // Calculate social security
      let socialSecurity = grossPay * 0.036;

      // Compute NHIF
      let NHIF = grossPay * 0.0306;

      // Compute annual taxable income
      const annualTaxableIncome = annualPay - ((NHIF + socialSecurity) * 12);
      
      // Calculate PAYE
      let paye;
      paye = computePAYE(annualTaxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye + NHIF);
  
      // Update results
      setGrossPay(grossPay);
      setSocialSecurity(socialSecurity);
      setNHIF(NHIF);
      setPaye(paye);
      setNetPay(netPay);
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
                  <div class="input-sec">
                    <label for="gross_pay">Gross Pay:</label>
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
                  <h4 id="gross-pay-value">{formatNumber(grossPay.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Social Security-Employee:</label>
                  </p>
                  <h4 id="social-security-value">{formatNumber(socialSecurity.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>National Health Insurance (NHIF):</label>
                  </p>
                  <h4 id="social-security-value">{formatNumber(NHIF.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>PAYE:</label>
                  </p>
                  <h4 id="paye-value">{formatNumber(paye.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>Net Pay:</label>
                  </p>
                  <h4 id="net-pay-value">{formatNumber(netPay.toFixed(2))}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
  
export default MaliUI;