
import React, {useState} from 'react';
import { Fieldset, PageContainer } from './homeStyles';
import Select from 'react-select';

//select -  https://www.cluemediator.com/how-to-get-selected-by-only-value-in-react-select
//checkbox - https://www.cluemediator.com/search?q=checkbox
//radiobuttony - https://www.cluemediator.com/how-to-use-radio-buttons-in-react

export default function Home() {
  const destinace = [
    {
       value: 500,
       label: "Praha"
     },
     {
       value: 3000,
       label: "Frankfurt"
     },
     {
       value: 15000,
       label: "New York"
     },
     {
       value: 30000,
       label: "Sydney"
     }
   ];
  const pocet = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "2"
    },
    {
      value: 3,
      label: "3"
    },
    {
      value: 4,
      label: "4"
    },
    {
      value: 5,
      label: "5"
    },
    {
      value: 6,
      label: "6"
    },
    {
      value: 7,
      label: "7"
    },
    {
      value: 8,
      label: "8"
    },
    {
      value: 9,
      label: "9"
    },
    {
      value: 10,
      label: "10"
    }
  ];
  const zpatecniLetenka = [
    { value: "ANO", label: "Zpáteční letenka" }
  ];
  const tridaList = [
    { value: 1, label: "Economy class" },
    { value: 1.25, label: "Business class" },
    { value: 1.5, label: "Royal class" }
  ];
  
  
 
 





//destinace
const [selectedDestinace, setSelectedDestinace] = useState(500);
// počet
  const [selectedValue, setSelectedValue] = useState(1);
//zpáteční letenka
const [zpatecni, setZpatecni] = useState([]);
//třídy
const [trida, setTrida] = useState(null);

//destinace
const handleChangeDestinace = e => {
  setSelectedDestinace(e.value); 
} 
 //počet
  const handleChange = e => {
    setSelectedValue(e.value);
  }
//zpáteční letenka
  const handleChangeZpatecni = e => {
    const { value, checked } = e.target;
    if (checked) {
      // push selected value in list
      setZpatecni(prev => [...prev, value]);
    } else {
      // remove unchecked value from the list
      setZpatecni(prev => prev.filter(x => x !== value));   
    }
  }
//třídy
  const handleChangeTrida = e => {
    setTrida(e.target.value);
  }
 


  
function calcDestinaceKusy(){
  let cena = parseInt(selectedDestinace);
  let ks = parseInt(selectedValue);
  let cenaDestinaceKusy = cena * ks;
  return cenaDestinaceKusy;
};
function calcTridaZpatecni(){
  //vypocet ceny se zpatecnim letem
  let predchoziCena = calcDestinaceKusy();
  let zpatecniLetenka = 0;
 // let priplatekTrida = 0;
  if(zpatecni.length >0) {
    zpatecniLetenka = calcDestinaceKusy();
  } else {  
      zpatecniLetenka = 0;}
  let novaCena = predchoziCena + zpatecniLetenka;
  return novaCena;
  }

  function calcTridaZpatecniFinal(){
     //vypocet ceny se zpatecnim letem
  let predchoziCena = calcDestinaceKusy();
  let zpatecniLetenka = 0;
  if(zpatecni.length >0) {
    zpatecniLetenka = calcDestinaceKusy();
  } else {  
      zpatecniLetenka = 0;}
  let novaCena = predchoziCena + zpatecniLetenka;
    //vypocet ceny s prirazkou podle vybrane tridy
    let cenaZpatecniTridaFinal = novaCena * trida;
    return cenaZpatecniTridaFinal;
 };


  return (
      <PageContainer>
        <Fieldset>
          <h1>Objednávka letenek</h1>
          <h3>Vyberte destinaci:</h3>
      <Select
        placeholder="Destinace"
        value={destinace.find(obj => obj.value === selectedDestinace)} // set selected value
        options={destinace} // set list of the data
        onChange={handleChangeDestinace} // assign onChange function
      />
      {selectedDestinace && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div><b>Selected Destinace: </b> {selectedDestinace}</div>
      </div>}

      <h3>Vyberte množství letenek:</h3>
      <Select
        placeholder="Počet letenek"
        value={pocet.find(obj => obj.value === selectedValue)} // set selected value
        options={pocet} // set list of the data
        onChange={handleChange} // assign onChange function
      />
      {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div><b>Selected Value: </b> {selectedValue}</div>
      </div>}
<div><b>Výpočet základní ceny: </b> {calcDestinaceKusy()}</div>

<h3>Zpáteční letenka:</h3>
      { zpatecniLetenka.map((x, i) => <label key={i}>
        <input
          type="checkbox"
          name="zpatecni"
          value={x.value}
          onChange={handleChangeZpatecni}
        /> {x.label}
      </label>)}
      <div>Zpáteční letenka: {zpatecni.length ? zpatecni.join(', ') : null}</div>
      <div><b>Výpočet základní ceny se zpáteční letenkou: </b> {calcTridaZpatecni()}</div>

      <h3>Vyberte třídu:</h3>
      {tridaList.map((x, i) => <label key={i}>
        <input
          type="radio"
          name="trida"
          value={x.value}
          onChange={handleChangeTrida}
        /> {x.label}
      </label>)}
      <div>Selected trida: {trida}</div>
      <div><b>Konečná cena: </b> {calcTridaZpatecniFinal()}</div>

      </Fieldset>
      </PageContainer>
  );
}
 
