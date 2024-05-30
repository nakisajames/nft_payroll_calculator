// CountryUI.js
import React, { useState } from "react";
import "../index.css"
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function MoroccoUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [paye, setPAYE] = useState(0);
  const [nhi, setNHI] = useState(0);

  const calculateSocialSecurity = (income) => {
    if (income <= 6000) {
      socialSecurity = grossPay * 0.0448;
    } else {
      socialSecurity = 6000 * 0.0448;
    }
  };

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    const healthInsurance = grossPay * 0.0226;

    // Calculate the social security
    let socialSecurity;
    if (grossPay <= 6000) {
      socialSecurity = grossPay * 0.0448;
    } else {
      socialSecurity = 6000 * 0.0448;
    }
    console.log(socialSecurity);
    // Calculate the taxable income
    const taxableIncome = (grossPay - socialSecurity - healthInsurance) * 12;

    let paye;
    if (taxableIncome <= 30000) {
      paye = 0;
    } else if (taxableIncome <= 50000) {
      paye = ((taxableIncome - 30000) * 0.1) / 12;
    } else if (taxableIncome <= 60000) {
      paye = (2000 + (taxableIncome - 50000) * 0.2) / 12;
    } else if (taxableIncome <= 80000) {
      paye = (4000 + (taxableIncome - 60000) * 0.3) / 12;
    } else if (taxableIncome <= 180000) {
      paye = (10000 + (taxableIncome - 80000) * 0.34) / 12;
    } else {
      paye = (44000 + (taxableIncome - 180000) * 0.38) / 12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + socialSecurity + healthInsurance);

    // Update results
    setGrossPay(grossPay);
    setSocialSecurity(socialSecurity);
    setPAYE(paye);
    setNetPay(netPay);
    setNHI(healthInsurance);
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
                  <label>National Health Insurance:</label>
                </p>
                <h4 id="paye-value">{formatNumber(nhi.toFixed(0))}</h4>
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

export default MoroccoUI;
