import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function EthiopiaUI({ country }) {
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

        if (taxableIncome <= 600) {
            paye = 0;
        } else if (taxableIncome <= 1650) {
            paye = taxableIncome * 0.1 - 60;
        } else if (taxableIncome <= 3200) {
            paye = taxableIncome * 0.15 - 142.5;
        } else if (taxableIncome <= 5250) {
            paye = taxableIncome * 0.2 - 302.5;
        } else if (taxableIncome <= 7800) {
            paye = taxableIncome * 0.25 - 565;
        } else if (taxableIncome <= 10900) {
            paye = taxableIncome * 0.3 - 955;
        } else {
            paye = taxableIncome * 0.35 - 1500;
        }
    
        return paye;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = grossPay * 0.07;
  
      // Calculate PAYE
      let paye;
      paye = computePAYE(grossPay);
  
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
  
export default EthiopiaUI;