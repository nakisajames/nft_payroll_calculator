// CountryUI.js
import React, { useState } from "react";
import "../index.css"
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function EquatorialGuineaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [paye, setPAYE] = useState(0);
  const [protectionFund, setProtectionFund] = useState(0);

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    const protection_fund = grossPay * 0.005;

    // Calculate the social security
   const social_security = grossPay * 0.045

    // Calculate the annual income
    const annualIncome = grossPay  * 12;

    let paye;
    if (annualIncome <= 1000000) {
        paye = 0;
    } else if (annualIncome <= 3000000) {
        paye = ((annualIncome - 1000000) * 0.1) / 12;
    } else if (annualIncome <= 5000000) {
        paye = ((annualIncome - 3000000) * 0.15 + 200000) / 12;
    } else if (annualIncome <= 10000000) {
        paye = ((annualIncome - 5000000) * 0.2 + 500000) / 12;
    } else if (annualIncome <= 15000000) {
        paye = ((annualIncome - 10000000) * 0.25 + 1500000) / 12;
    } else if (annualIncome <= 20000000) {
        paye = ((annualIncome - 15000000) * 0.3 + 2750000) / 12;
    } else {
        paye = ((annualIncome - 20000000) * 0.35 + 4250000) / 12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + social_security + protection_fund);

    // Update results
    setGrossPay(grossPay);
    setSocialSecurity(social_security);
    setPAYE(paye);
    setNetPay(netPay);
    setProtectionFund(protection_fund);
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
                  <label>Gross Pay:</label>
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
                  <label>Work Protection Fund:</label>
                </p>
                <h4 id="paye-value">{formatNumber(protectionFund.toFixed(0))}</h4>
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
      </div>
    </div>
  );
}

export default EquatorialGuineaUI;
