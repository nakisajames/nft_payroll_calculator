import React, { useState } from "react";
import getCurrency from "../lib/utils";

function GhanaUI({ country }) {
  const currency = getCurrency(country);
  
  const [income, setIncome] = useState();
  const [isResident, setIsResident] = useState("Resident");
  const [grossPay, setGrossPay] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [paye, setPaye] = useState(0);
  const [netPay, setNetPay] = useState(0);

  const calculatePAYE = (e) => {
    e.preventDefault();

    const computePAYE = (isResident, taxableIncome) => {
      let paye;

      if (isResident === "RESIDENT") {
        if (taxableIncome <= 490) {
          paye = 0;
        } else if (taxableIncome <= 600) {
          paye = (taxableIncome - 490) * 0.05;
        } else if (taxableIncome <= 730) {
          paye = 110 * 0.05 + (taxableIncome - 600) * 0.1;
        } else if (taxableIncome <= 3896.67) {
          paye = 110 * 0.05 + 130 * 0.1 + (taxableIncome - 730) * 0.175;
        } else if (taxableIncome <= 19896.67) {
          paye =
            110 * 0.05 +
            130 * 0.1 +
            3166.67 * 0.175 +
            (taxableIncome - 3896.67) * 0.25;
        } else if (taxableIncome <= 50416.67) {
          paye =
            110 * 0.05 +
            130 * 0.1 +
            3166.67 * 0.175 +
            16000 * 0.25 +
            (taxableIncome - 19896.67) * 0.3;
        } else {
          paye =
            110 * 0.05 +
            130 * 0.1 +
            3166.67 * 0.175 +
            16000 * 0.25 +
            30520 * 0.3 +
            (taxableIncome - 50416.67) * 0.35;
        }
      } else {
        paye = taxableIncome * 0.25;
      }

      return paye;
    };

    // Convert inputs to numbers
    const grossPay = parseFloat(income);
    const is_resident = isResident.toUpperCase();

    // Calculate social security
    let socialSecurity = grossPay * 0.055;

    // Calculate taxable income
    let taxableIncome = grossPay - socialSecurity;
    

    // Calculate PAYE
    let paye;
    paye = computePAYE(is_resident, taxableIncome);

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
                      placeholder="0"
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-sec">
                  <label htmlFor="is_resident">Residential Status:</label>
                  <div className="input">
                    <select
                      id="is_resident"
                      name="is_resident"
                      className="input"
                      value={isResident}
                      onChange={(e) => setIsResident(e.target.value)}
                    >
                      <option value="Resident">Resident</option>
                      <option value="Non-Resident">Non-Resident</option>
                    </select>
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
                  <label>Social Security-Employee (SSNIT):</label>
                </p>
                <h4 id="social-security-value">{socialSecurity.toFixed(2)}</h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>PAYE:</label>
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

export default GhanaUI;
