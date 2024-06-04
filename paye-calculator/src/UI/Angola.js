// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function AngolaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState("0");
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [paye, setPAYE] = useState(0);

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    // Calculate annual pay
    const annualPay = grossPay * 12;

    // Calculate social security per month
    const social_security = grossPay * 0.03;

    //Taxable Income
    const taxableIncome = annualPay - social_security * 12;

    // Calculate PAYE
    let paye;
    if (taxableIncome <= 70000) {
      paye = 0;
    } else if (taxableIncome <= 100000) {
      paye = ((taxableIncome - 70000) * 0.1) / 12;
    } else if (taxableIncome <= 150000) {
      paye = (3000 + (taxableIncome - 100000) * 0.13) / 12;
    } else if (taxableIncome <= 200000) {
      paye = (3000 + 6500 + (taxableIncome - 150000) * 0.16) / 12;
    } else if (taxableIncome <= 300000) {
      paye = (3000 + 6500 + 8000 + (taxableIncome - 200000) * 0.18) / 12;
    } else if (taxableIncome <= 500000) {
      paye =
        (3000 + 6500 + 8000 + 18000 + (taxableIncome - 300000) * 0.19) / 12;
    } else if (taxableIncome <= 1000000) {
      paye =
        (3000 + 6500 + 8000 + 18000 + 38000 + (taxableIncome - 500000) * 0.2) /
        12;
    } else if (taxableIncome <= 1500000) {
      paye =
        (3000 +
          6500 +
          8000 +
          18000 +
          38000 +
          100000 +
          (taxableIncome - 1000000) * 0.21) /
        12;
    } else if (taxableIncome <= 2000000) {
      paye =
        (3000 +
          6500 +
          8000 +
          18000 +
          38000 +
          100000 +
          105000 +
          (taxableIncome - 1500000) * 0.22) /
        12;
    } else if (taxableIncome <= 2500000) {
      paye =
        (3000 +
          6500 +
          8000 +
          18000 +
          38000 +
          100000 +
          105000 +
          110000 +
          (taxableIncome - 2000000) * 0.23) /
        12;
    } else if (taxableIncome <= 5000000) {
      paye =
        (3000 +
          6500 +
          8000 +
          18000 +
          38000 +
          100000 +
          105000 +
          110000 +
          115000 +
          (taxableIncome - 2500000) * 0.24) /
        12;
    } else if (taxableIncome <= 10000000) {
      paye =
        (3000 +
          6500 +
          8000 +
          18000 +
          38000 +
          100000 +
          105000 +
          110000 +
          115000 +
          600000 +
          (taxableIncome - 5000000) * 0.245) /
        12;
    } else {
      paye =
        (3000 +
          6500 +
          8000 +
          18000 +
          38000 +
          100000 +
          105000 +
          110000 +
          115000 +
          600000 +
          1225000 +
          (taxableIncome - 10000000) * 0.25) /
        12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + social_security);

    // Update results
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_security);
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
                <h4 id="gross-pay-value">
                  {currency}
                </h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>Gross Pay:</label>
                </p>
                <h4 id="gross-pay-value">
                  {formatNumber(grossPay.toFixed(2))}
                </h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>Social Security:</label>
                </p>
                <h4 id="paye-value">
                  {formatNumber(socialSecurity.toFixed(2))}
                </h4>
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
      </body>
    </div>
  );
}

export default AngolaUI;
