// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function SwazilandUI({ country }) {
  let currency 
  if (country === "Swaziland") {
    currency = getCurrency("Eswatini");
  }
  
  const [income, setIncome] = useState();
  const [deductions, setDeductions] = useState();
  const [npf, setNPF] = useState(185);
  const [graded_tax, setGradedtax] = useState(18);
  const [age, setAge] = useState();
  const [grossPay, setGrossPay] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [paye, setPAYE] = useState(0);

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
    const ageGroup = parseFloat(age);
    const gradedTax = parseFloat(graded_tax);
    const otherDeductions = parseFloat(deductions) * 12;
    const npfAmount = parseFloat(npf);

    // Calculate annual pay
    const annualPay = grossPay * 12;

    // Calculate tax rebate based on age group
    let taxRebate;
    if (ageGroup < 60) {
      taxRebate = 8200;
    } else {
      taxRebate = 10900;
    }

    //Calculate the taxable income
    const taxableIncome = annualPay - (gradedTax + npfAmount + otherDeductions);

    let taxLiability;
    if (taxableIncome <= 0) {
      taxLiability = 0;
    } else if (taxableIncome <= 100000) {
      taxLiability = taxableIncome * 0.2;
    } else if (taxableIncome <= 150000) {
      taxLiability = 20000 + (taxableIncome - 100000) * 0.25;
    } else if (taxableIncome <= 200000) {
      taxLiability = 32500 + (taxableIncome - 150000) * 0.3;
    } else {
      taxLiability = 47500 + (taxableIncome - 200000) * 0.33;
    }

    // Calculate PAYE (Pay As You Earn)
    const paye = (taxLiability - taxRebate) / 12;

    // Calculate net pay
    const netPay = grossPay - paye;

    // Update results
    setGrossPay(grossPay);
    setNPF(npfAmount);
    setPAYE(paye);
    setNetPay(netPay);
    setGradedtax(gradedTax);
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
                <div class="input-sec">
                  <label>Age Group:</label>
                  <div class="input">
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={age}
                      placeholder="0"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-sec">
                  <label>NPF:</label>
                  <div class="input">
                    <input
                      type="number"
                      name="uif"
                      id="uif"
                      defaultValue={npf}
                      onChange={(e) => setNPF(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-sec">
                  <label>Other Deductions:</label>
                  <div class="input">
                    <input
                      type="number"
                      name="deductions"
                      id="deductions"
                      value={deductions}
                      placeholder="0"
                      onChange={(e) => setDeductions(e.target.value)}
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
                <h4 id="gross-pay-value">
                  {formatNumber(grossPay.toFixed(0))}
                </h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>NPF:</label>
                </p>
                <h4 id="paye-value">{formatNumber(npf.toFixed(0))}</h4>
              </div>
              <div class="gross-pay">
                <p>
                  <label>PAYE:</label>
                </p>
                <h4 id="paye-value">{formatNumber(paye.toFixed(0))}</h4>
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

export default SwazilandUI;
