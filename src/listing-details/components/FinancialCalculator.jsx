import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FinancialCalculator({carDetail}) {
    const [carPrice, setCarPrice] = useState();
    const [interestRate, setInterestRate] = useState();
    const [loanTerm, setLoanTerm] = useState();
    const [downPayment, setDownPayment] = useState();
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const CalculateMonthlyPayment = () => {
        const Principal = carPrice-downPayment;
        const MonthlyInterestRate = interestRate/1200; // convert to decimal

        const MonthlyPayment = ((Principal*MonthlyInterestRate*Math.pow(1+MonthlyInterestRate, loanTerm))/(Math.pow(1+MonthlyInterestRate, loanTerm) -1)).toFixed(2);
        setMonthlyPayment(MonthlyPayment)
        console.log(MonthlyPayment)
    }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7 '>
      <h2 className='text-2xl font-medium'>Financial Calculator</h2>
      <div className='flex g-5 mt-5'>
        <div className='w-full'>
            <label>Price $</label>
            <Input type="number" onChange={(e) => setCarPrice(e.target.value)}/>
        </div>
        <div className='w-full'>
            <label>Interest Rate</label>
            <Input type="number" onChange={(e) => setInterestRate(e.target.value)}/>
        </div>
      </div>
      <div className='flex g-5 mt-5'>
        <div className='w-full'>
            <label>Loan Term (Monthly)</label>
            <Input type="number" onChange={(e) => setLoanTerm(e.target.value)}/>
        </div>
        <div className='w-full'>
            <label>Down Payment</label>
            <Input type="number" onChange={(e) => setDownPayment(e.target.value)}/>
        </div>
      </div>
      {monthlyPayment> 0 && <h2 className='text-2xl font-medium mt-5'>Your montly payment is: <span className='text-4xl font-bold'>${monthlyPayment}</span></h2>}
      <Button className='w-full mt-5' size='lg' onClick={CalculateMonthlyPayment}>Calculate</Button>
    </div>
  )
}

export default FinancialCalculator
