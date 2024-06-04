// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function CongoUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState("0");
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [pension,setPension] = useState(0)
  const [tax,setTax] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
  
    // Calculate annual pay
    const annualPay = grossPay * 12;

    // Calculate national housing fund
    const uniqueTax = grossPay * 0.075

    //Calculate pension
    const pen = grossPay * 0.04
  
    // Calculate PAYE
    let paye;
  if (annualPay <= 464000) {
    paye = (0.01 * annualPay) / 12;
  } else if (annualPay <= 1000000) {
    paye = (4640 + 0.1 * (annualPay - 464000)) / 12;
  } else if (annualPay <= 3000000) {
    paye = (4640 + 53600 + 0.25 * (annualPay - 1000000)) / 12;
  } else {
    paye = (4640 + 53600 + 500000 + 0.4 * (annualPay - 3000000)) / 12;
  }

    // Calculate net pay
    const netPay = grossPay - (paye + uniqueTax + pen);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setPension(pen)
    setTax(uniqueTax)
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
                    <p><label>Pension Fund:</label></p>
                    <h4 id="paye-value">{formatNumber(pension.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Unique Tax:</label></p>
                    <h4 id="paye-value">{formatNumber(tax.toFixed(0))}</h4>
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

export default CongoUI;
