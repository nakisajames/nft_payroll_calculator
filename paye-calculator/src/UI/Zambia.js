// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function ZambiaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [nssf, setNSSF] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [nhi,setNHI] = useState(0)
  const [lunchAllowance,setLunchAllowance] = useState(0)
  const [transportAllowance,setTransportAllowance] = useState(0)
  const [housingAllowance, setHousingAllowance] = useState(0)

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);
    const otherDeductions = parseFloat(deductions)

    //Allowances
    const lunchMoney = 0.05 * grossPay;
    const housingMoney = 0.4 * grossPay
    const transportMoney = 0.05 * grossPay;
  
    const healthInsurance = grossPay * 0.01;
  
  // Calculate the social security
      let socialSecurity;
      if (grossPay <= 1490.8) {
        socialSecurity = grossPay * 0.05;
      } else {
        socialSecurity = 1490.8;
      }
  
  const totalGross = grossPay + transportMoney ?? 0 + lunchMoney ?? 0 + housingMoney ?? 0
    // Calculate the taxable income
    const taxableIncome = totalGross - otherDeductions;
  
    let paye;
    if (taxableIncome < 5101) {
      paye = 0;
    } else if (taxableIncome < 7101) {
      paye = ((taxableIncome - 5100) * 0.2) ;
    } else if (taxableIncome < 9201) {
      paye = (((taxableIncome - 7100) * 0.3) + 400) ;
    } else {
      paye = (((taxableIncome - 9200) * 0.37) + 1030) ;
    }
    // Calculate net pay
    const netPay = grossPay - (paye + socialSecurity );
  
    // Update results
    setGrossPay(grossPay);
    setNSSF(socialSecurity);
    setPAYE(paye);
    setNetPay(netPay);
    setNHI(healthInsurance);
    setLunchAllowance(lunchMoney)
    setHousingAllowance(housingMoney)
    setTransportAllowance(transportMoney)
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
                value={income === 0 ? "" : income}
                class="input"
                placeholder="0"
                onChange={(e) => setIncome(e.target.value)}
              />
              </div>
              </div>
              <div class ="input-sec">
              <label>Other Deductions:</label>
              <div class="input">
              <input
                type="number"
                name="deductions"
                id="deductions"
                value={deductions === 0 ? "" : deductions}
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
                    <p><label>Social Security:</label></p>
                    <h4 id="paye-value">{formatNumber(nssf.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Health Insurance:</label></p>     
                    <h4 id="paye-value">{formatNumber(nhi.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Housing Allowance:</label></p>     
                    <h4 id="paye-value">{formatNumber(housingAllowance.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Lunch Allowance:</label></p>     
                    <h4 id="paye-value">{formatNumber(lunchAllowance.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Transport ALlowance:</label></p>     
                    <h4 id="paye-value">{formatNumber(transportAllowance.toFixed(0))}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>
                    <h4 id="net-pay-value">{formatNumber(paye.toFixed(0))}</h4>
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

export default ZambiaUI;
