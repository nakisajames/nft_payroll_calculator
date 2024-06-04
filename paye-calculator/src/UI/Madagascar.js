// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function MadagscarUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState("0");
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [pension,setPension] = useState(0)
  const [housing,setHosuing] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;

    // Calculate national housing fund
    const housingFund = grossPay * 0.01

    //Calculate pension
    const pen = grossPay * 0.01
  
    // Calculate PAYE
    let paye;
    if (annualPay <= 350000) {
      paye = 0;
    } else if (annualPay <= 400000) {
      paye = (0.05 * (annualPay - 350000)) / 12;
    } else if (annualPay <= 500000) {
      paye = (2500 + 0.1 * (annualPay - 400000)) / 12;
    } else if (annualPay <= 600000) {
      paye = (2500 + 10000 + 0.15 * (annualPay - 500000)) / 12;
    } else {
      paye = (2500 + 10000 + 15000 + 0.2 * (annualPay - 600000)) / 12;
    }

    // Calculate net pay
    const netPay = grossPay - (paye + housingFund + pension);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setPension(pen)
    setHosuing(housingFund)
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
              <div class ="input-sec">
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
               >Calculate</button></div>
            </form>
            </div>
           
            <div class="outputs-section">
            <h4 class="results-title">Results</h4>
                <div class="gross-pay">
                    <p><label>Currency:</label></p>
                    <h4 id="gross-pay-value">{currency}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Gross Pay:</label></p>
                    <h4 id="gross-pay-value">{formatNumber(grossPay.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Housing Fund:</label></p>
                    <h4 id="paye-value">{formatNumber(housing.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Pension Fund:</label></p>
                    <h4 id="paye-value">{formatNumber(pension.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>     
                    <h4 id="paye-value">{formatNumber(paye.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Net Pay:</label></p>
                    <h4 id="net-pay-value">{formatNumber(netPay.toFixed(0))}</h4>
                </div>
            </div>
          </div>
        </div>
      </body>      
    </div>
  );
}

export default MadagscarUI;
