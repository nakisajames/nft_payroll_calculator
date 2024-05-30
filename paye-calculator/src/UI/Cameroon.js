// CountryUI.js
import React, { useState } from "react";
import "../index.css"
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function CameroonUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [paye, setPAYE] = useState(0);
  const [providentFund, setProvidentFund] = useState(0);

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    const provident_fund = grossPay * 0.01;

    // Calculate the social security
   const social_security = grossPay * 0.042

    // Calculate the annual income
    const annualIncome = grossPay  * 12;

    let paye;
    if (annualIncome <= 2000000) {
        paye = (annualIncome * 0.11) / 12;
    } else if (annualIncome <= 3000000) {
        paye = (220000 + (annualIncome - 2000000) * 0.165) / 12;
    } else if (annualIncome <= 5000000) {
        paye = (220000 + 165000 + (annualIncome - 3000000) * 0.275) / 12;
    } else {
        paye = (220000 + 165000 + 550000 + (annualIncome - 5000000) * 0.385) / 12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + social_security + provident_fund);

    // Update results
    setGrossPay(grossPay);
    setSocialSecurity(social_security);
    setPAYE(paye);
    setNetPay(netPay);
    setProvidentFund(provident_fund);
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
                  <label>National Provident Fund:</label>
                </p>
                <h4 id="paye-value">{formatNumber(providentFund.toFixed(0))}</h4>
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

export default CameroonUI;
