// CountryUI.js
import React, { useState } from "react";

function NigeriaUI({ country }) {
  const [income, setIncome] = useState(0);
  const [pension, setPension] = useState(0);
  const [grossPay,setGrossPay] =useState(0)
  const [netPay,setNetPay] = useState(0)
  const [paye,setPAYE] = useState(0)
  const [nhif,setNhif] =useState(0)
  const [nhf, setNhf] = useState(0); 
  const [housingAllowance,setHousingAllowance] = useState(0)
  const [transportAllowance,setTransportAllowance] = useState(0)
  const [otherAllowances,setOtherAllowances] = useState(0)
//   const [consolidatedRelief,setConsolidatedRelief] = useState(0)
//   const [grossRelief, setGrossRelief] = useState(0)


const calculateSocialSecurity = (grossPay) => {
    const socialSecurity = grossPay * 0.035; // 3.5% of grossPay
    return socialSecurity <= 450000 ? socialSecurity : 450000;
    };


  const calculatePAYE = (e) => {
    e.preventDefault();
    // Convert input values to numbers
    const grossPay = parseFloat(income) ;
    const housing = parseFloat(housingAllowance) ;
    const transport = parseFloat(transportAllowance);
    const allowances = parseFloat(otherAllowances)

    // Calculate total taxable earnings
    const totalTaxableEarnings = (grossPay * 12) + (housing * 12) + (transport * 12) + (allowances * 12);

  // Calculate NHIF
  const nhif = totalTaxableEarnings * 0.05

  // Calculate NHF
  const nhf = totalTaxableEarnings * 0.025

  // Calculate total taxable earnings
  const pensionContribution = totalTaxableEarnings * 0.08

  // Calculate total deductions
  const totalDeductions = nhif + nhf + pensionContribution;
  console.log(totalDeductions)


// Calculate Gross Income Relief
const gross_relief = totalTaxableEarnings * 0.2

  // Calculate consolidated relief
  let consolidatedRelief;
  if (totalTaxableEarnings * 0.01 > 200000) {
      consolidatedRelief = totalTaxableEarnings * 0.01;
  } else {
      consolidatedRelief = 200000;
  }

  // Calculate total deductions
  const totalRelief = gross_relief + consolidatedRelief
  console.log(totalRelief)

    // Calculate taxable pay
    const taxablePay = (grossPay * 12) - (totalDeductions + totalRelief) ;
    console.log(taxablePay)


    // Calculate PAYE based on taxable pay
    let paye;
    if (taxablePay < 300000) {
        paye = 0.07 * taxablePay;
    } else if (taxablePay <= 600000) {
        paye = 21000 + 0.11 * (taxablePay - 300000);
    } else if (taxablePay <= 1100000) {
        paye = 21000 + 33000 + 0.15 * (taxablePay - 600000);
    } else if (taxablePay <= 1600000) {
        paye = 21000 + 33000 + 75000 + 0.19 * (taxablePay - 1100000);
    } else if (taxablePay <= 3200000) {
        paye = 21000 + 33000 + 75000 + 95000 + 0.21 * (taxablePay - 1600000);
    } else {
        paye = 21000 + 33000 + 75000 + 95000 + 336000 + 0.24 * (taxablePay - 3200000);
    }

    // Calculate monthly PAYE
    const monthlyPAYE = paye / 12;

    // Calculate net pay
    const netPay = grossPay - monthlyPAYE;
  
    // Update results 
    setGrossPay(grossPay);
    setPAYE(monthlyPAYE);
    setNetPay(netPay);
    setNhf(nhf/12)
    setHousingAllowance(housing)
    setTransportAllowance(transport)
    setOtherAllowances(allowances)
    setNhif(nhif/12)
    setPension(pensionContribution/12)
    // setConsolidatedRelief(consolidatedRelief)

  };
  
  return (
    <div>
      <body>
        <div class="card">
          <div class="card-container">
            <div class="inputs-section">
            <form method="post">
              <h4 class="title">{country}</h4>
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
              <div class ="input-sec">
              <label>Transport Allowance:</label>
              <div class="input">
              <input
                type="number"
                name="transport"
                id="transport"
                value={transportAllowance}
                class="input"
                onChange={(e) => setTransportAllowance(e.target.value)}
              />
              </div>
          
              </div>
              <div class ="input-sec">
              <label>Housing Allowance:</label>
              <div class="input">
              <input
                type="number"
                name="housing"
                id="housing"
                value={housingAllowance}
                class="input"
                onChange={(e) => setHousingAllowance(e.target.value)}
              />
              </div>
          
              </div>
              <div class ="input-sec">
              <label>Other Allowances:</label>
              <div class="input">
              <input
                type="number"
                name="housing"
                id="housing"
                value={housingAllowance}
                class="input"
                onChange={(e) => setHousingAllowance(e.target.value)}
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
                    <p><label>Gross Pay:</label></p>
                    <h4 id="gross-pay-value">{grossPay.toFixed(0)}</h4>
                </div>
                {/* <div class="gross-pay">
                    <p><label>Housing Allowance:</label></p>
                    <h4 id="paye-value">{housingAllowance.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Transport Allowance:</label></p>
                    <h4 id="paye-value">{transportAllowance.toFixed(0)}</h4>
                </div> */}
                <div class="gross-pay">
                    <p><label>NHIF:</label></p>
                    <h4 id="paye-value">{nhif.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>National Housing Fund:</label></p>
                    <h4 id="paye-value">{nhf.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Pension:</label></p>
                    <h4 id="paye-value">{pension.toFixed(0)}</h4>
                </div>
                {/* <div class="gross-pay">
                    <p><label>Consolidated Relief:</label></p>
                    <h4 id="paye-value">{.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Gross Income Relief:</label></p>
                    <h4 id="paye-value">{nhif.toFixed(0)}</h4>
                </div> */}
                <div class="gross-pay">
                    <p><label>PAYE:</label></p>     
                    <h4 id="paye-value">{paye.toFixed(0)}</h4>
                </div>
                <div class="gross-pay">
                    <p><label>Net Pay:</label></p>
                    <h4 id="net-pay-value">{netPay.toFixed(0)}</h4>
                </div>
            </div>
          </div>
        </div>
      </body>      
    </div>
  );
}

export default NigeriaUI;
