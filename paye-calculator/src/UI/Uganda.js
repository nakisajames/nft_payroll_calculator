// CountryUI.js
import React, { useState } from "react";
import { formatNumber } from "../utils";
import getCurrency from "../lib/utils";

function UgandaUI({ country }) {
  const currency = getCurrency(country);

  const [income, setIncome] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [lst,setlst] =useState(0)
  const [showLST, setShowLST] = useState(false); 

  //Calculate LST
    const calculateLST = (grossPay) => {
        let tax;
      
        if (grossPay <= 100000) {
            tax = 0;
        } else if (grossPay <= 200000) {
            tax = 5000 / 4;
        } else if (grossPay <= 300000) {
            tax = 10000 / 4;
        } else if (grossPay <= 400000) {
            tax = 20000 / 4;
        } else if (grossPay <= 500000) {
            tax = 30000 / 4;
        } else if (grossPay <= 600000) {
            tax = 40000 / 4;
        } else if (grossPay <= 700000) {
            tax = 60000 / 4;
        } else if (grossPay <= 800000) {
            tax = 70000 / 4;
        } else if (grossPay <= 900000) {
            tax = 80000 / 4;
        } else if (grossPay <= 1000000) {
            tax = 90000 / 4;
        } else {
            tax = 100000 / 4;
        }
      
        return tax;
      };

  //Calculate social security

  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income);

    //Calculate NSSF
    const social_secuirty = 0.05 * grossPay
  
  // Calculate LST if checkbox is checked
  const lst = showLST ? calculateLST(grossPay) : 0;

  // Calculate taxable pay
  const taxablePay = grossPay - lst;

  // Calculate PAYE based on taxable pay
  let paye;
  if (taxablePay <= 235000) {
    paye = 0;
  } else if (taxablePay <= 335000) {
    paye = (taxablePay - 235000) * 0.1;
  } else if (taxablePay <= 410000) {
    paye = ((taxablePay - 335000) * 0.2) + 10000;
  } else if (taxablePay <= 10000000) {
    paye = ((taxablePay - 410000) * 0.3) + 25000;
  } else {
    paye = ((taxablePay - 410000) * 0.3) + 25000 + ((taxablePay - 10000000) * 0.1);
  }


    // Calculate net pay
    const netPay = grossPay - (paye + social_secuirty + lst);
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(paye);
    setNetPay(netPay);
    setSocialSecurity(social_secuirty)
    setlst(lst)
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
           
          {/* Checkbox for NSSF */}
          <div>
            <input
              type="checkbox"
              id="lstCheckbox"
              checked={showLST}
              onChange={() => setShowLST(!showLST)}
            />
            <label for="lstCheckbox">Deduct LST</label>
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
                <p><label>NSSF:</label></p>
                <h4 id="social-security-value">{formatNumber(socialSecurity.toFixed(0))}</h4>
              </div>
              {showLST && lst > 0 && (
                <div class="gross-pay">
                  <p><label>LST:</label></p>
                  <h4 id="lst-value">{formatNumber(lst.toFixed(0))}</h4>
                </div>
              )}
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

export default UgandaUI;
