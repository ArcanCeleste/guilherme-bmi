import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { fbConfig } from './firebase/firebase'
import { transformNumber } from './helpers/formatNum'

function App() {
  fbConfig
  const [BMI, setBMI] = useState(0)
  const [BMIColor, setBMIColor] = useState('')
  const [BMIHeight, setBMIHeight] = useState('')
  const [BMIWeight, setBMIWeight] = useState('')
  const [BMICalculated, setBMICalculated] = useState(false)  

  const changeHeight = (e:ChangeEvent<HTMLInputElement>)=> {
    if (e.target.value !== '' && parseFloat(e.target.value) < 0) {
      setBMIHeight('0')
    } else {
      setBMIHeight(e.target.value)
    }
  }
  const changeweight = (e:ChangeEvent<HTMLInputElement>)=> {
    if (e.target.value !== '' && parseFloat(e.target.value) < 0) {
      setBMIWeight('0')
    } else {
      setBMIWeight(e.target.value)
    }
  }
  const calculateBMI = ()=> {
    if (BMIHeight.indexOf(',') != -1) {
      setBMIHeight(BMIHeight.replace(',', '.'));
      calculateBMI();
    } else if (BMIWeight.indexOf(',') != -1) {
      setBMIWeight(BMIWeight.replace(',', '.'));
      calculateBMI();
    } else {
      if (BMIHeight === '' || BMIWeight === '') {
        alert("Please, fill the Height and Weight fields.")
      } else if (isNaN(parseFloat(BMIHeight)) || isNaN(parseFloat(BMIWeight))) {
        alert("Please, enter valid numbers.")
      } else {
        setBMICalculated(true)
        let BMICalc = parseFloat(BMIWeight) / (parseFloat(BMIHeight) * parseFloat(BMIHeight));
        setBMI(BMICalc)
      }
    }
  }
  const clearBMI = ()=> {
    setBMICalculated(false)
    setBMIHeight('')
    setBMIWeight('')
  }
  const aboutBMI = () =>{
    if (BMI < 18.5) {
      return('Underweight, BMI < 18.5')
    } else if (BMI < 25) {
      return('Normal, BMI = 18.5 – 24.9')
    } else if (BMI < 30) {
      return('Overweight, BMI = 25 – 29.9')
    } else {
      return('Obesity, BMI > 30')
    }
  }
  const colorBMI = ()=> {
    if (BMI < 18.5) {
      setBMIColor('#f1d11a')
    } else if (BMI < 25) {
      setBMIColor('#2bb800')
    } else if (BMI < 30) {
      setBMIColor('#e28000')
    } else {
      setBMIColor('#e20f00')
    }
  }
  useEffect(colorBMI, [BMI])
  
  return (
    <div className='container'>
      <header className='headerSite'>
        <h1 className='headerTitle'>
          <a href="/">BMI Calculator</a>
        </h1>
      </header>
      <main className='mainContent'>
        <div className='BMIShowArea' style={{display: BMICalculated ? 'flex' : 'none', color: BMIColor}}>
          <div className='yourBMI'>{transformNumber(BMI.toFixed(2))}</div>
          <span className='aboutBMI' style={{color: BMIColor}}>{aboutBMI()}</span>
        </div>
        <div className='optionsArea'>
          <div className='BMIInputsArea'>
            <label htmlFor="inputHeight">Height:</label>
            <input type="number" id='inputHeight' placeholder='Enter your Height Eg: 1.76' value={BMIHeight} onChange={changeHeight}/>
            <label htmlFor="inputWeight">Weight:</label>
            <input type="number" id='inputWeight' placeholder='Enter your Weight Eg: 70.50' value={BMIWeight} onChange={changeweight}/>
          </div>
          <div className='BMIButtonsArea'>
            <button onClick={calculateBMI}>Calculate</button>
            <button onClick={clearBMI}>Clear</button>
          </div>
        </div>
      </main>
      <footer className='footerSite'>
        <small>Created By Guilherme de Paula da Silva</small>
      </footer>
    </div>
  )
}

export default App
