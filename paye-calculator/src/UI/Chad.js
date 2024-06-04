import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function ChadUI({ country }) {
    const currency = getCurrency(country);

    const FIR = 40;
    const [income, setIncome] = useState(0);
    const [grossPay, setGrossPay] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(0);
    const [paye, setPaye] = useState(0);
    const [netPay, setNetPay] = useState(0);
  
    const calculatePAYE = (e) => {
      e.preventDefault();
  
      const computePAYE = (taxableIncome) => {
        let paye;

        if (taxableIncome <= 800000) {
            paye = 0;
        } else if (taxableIncome <= 6000000) {
            paye = (taxableIncome - 800000) * 0.105;
        } else if (taxableIncome <= 7500000) {
            paye = ((taxableIncome - 6000000) * 0.15) + 546000;
        } else if (taxableIncome <= 9000000) {
            paye = ((taxableIncome - 7500000) * 0.2) + 771000;
        } else if (taxableIncome <= 12000000) {
            paye = ((taxableIncome - 9000000) * 0.25) + 1071000;
        } else {
            paye = ((taxableIncome - 12000000) * 0.3) + 1821000;
        }
    
        return paye / 12;
      };      
      
      // Convert inputs to numbers
      const grossPay = parseFloat(income);
  
      // Calculate social security
      let socialSecurity = grossPay * 0.035;
  
      // Calculate taxable income
      let taxableIncome = (grossPay - socialSecurity);
      let annualTaxableIncome = taxableIncome * 12;
      // Calculate PAYE
      let paye;
      paye = computePAYE(annualTaxableIncome);
  
      // Calculate the netpay
      const netPay = grossPay - (socialSecurity + paye + FIR);
  
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
                    <div class="input-sec">
                    <label for="currency">F.I.R (Rural Intervention Fund):</label>
                    <div class="input">
                      <input
                        type="number"
                        name="fir"
                        id="fir"
                        value={FIR}
                        class="input"
                        readOnly
                      />
                    </div>
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
                    <label>Social Security-Employee (CNPS):</label>
                  </p>
                  <h4 id="social-security-value">{formatNumber(socialSecurity.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>PAYE (Income Tax):</label>
                  </p>
                  <h4 id="paye-value">{formatNumber(paye.toFixed(2))}</h4>
                </div>
                <div class="gross-pay">
                  <p>
                    <label>F.I.R (Rural Intervention Fund):</label>
                  </p>
                  <h4 id="paye-value">{formatNumber(FIR.toFixed(2))}</h4>
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
  
export default ChadUI;