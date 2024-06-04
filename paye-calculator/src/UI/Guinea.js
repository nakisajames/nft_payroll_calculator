// CountryUI.js
import React, { useState } from "react";
import "../index.css"
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function GuineaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState();
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [paye, setPAYE] = useState(0);

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    // Calculate the social security
   const social_security = grossPay * 0.05

    // Calculate the annual income
    const annualIncome = grossPay  * 12;

    let paye;
    if (annualIncome <= 100000) {
        paye = 0;
    } else if (annualIncome <= 1000000) {
        paye = ((annualIncome - 100000) * 0.1) / 12;
    } else if (annualIncome <= 1500000) {
        paye = (90000 + (annualIncome - 1000000) * 0.15) / 12;
    } else if (annualIncome <= 3000000) {
        paye = (165000 + (annualIncome - 1500000) * 0.2) / 12;
    } else if (annualIncome <= 6000000) {
        paye = (465000 + (annualIncome - 3000000) * 0.25) / 12;
    } else if (annualIncome <= 10000000) {
        paye = (1215000 + (annualIncome - 6000000) * 0.3) / 12;
    } else if (annualIncome <= 20000000) {
        paye = (2415000 + (annualIncome - 10000000) * 0.35) / 12;
    } else {
        paye = (5915000 + (annualIncome - 20000000) * 0.4) / 12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + social_security);

    // Update results
    setGrossPay(grossPay);
    setSocialSecurity(social_security);
    setPAYE(paye);
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
                  <label>Gross Pay:</label>
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
                <h4 id="gross-pay-value">{currency}</h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>Gross Pay:</label>
                </p>
                <h4 id="gross-pay-value">{formatNumber(grossPay.toFixed(0))}</h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>Social Security:</label>
                </p>
                <h4 id="paye-value">{formatNumber(socialSecurity.toFixed(0))}</h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>PAYE:</label>
                </p>
                <h4 id="net-pay-value">{formatNumber(paye.toFixed(0))}</h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>Net Pay:</label>
                </p>
                <h4 id="net-pay-value">{formatNumber(netPay.toFixed(0))}</h4>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default GuineaUI;
