import './App.css';
import { Title, FormSection, FormSectionColumn, GiftAlert, KontrolaButton, Formular, InputDiv, MainTitle, PageContainer, SectionTitle, FormSectionRow } from './AppStyles';
//
import { useReducer, useState, useEffect } from 'react';
// initialState pro useReducer
const defaultObjednavka = {
  koloHorske: false,
  koloDetske: false,
  koloSilnicni: false,
  koloGravel: false,
  pocetHorske: 0,
  pocetDetske: 0,
  pocetSilnicni: 0,
  pocetGravel: 0,
delkaZapujceni: 1,
nosic:0,
  rozpocet: 0,
  email: '',
};

function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "update_text":
      return { ...objednavka, [action.key]: action.value };
    case "update_number":
      if(!Number(parseFloat(action.value))){
        return { ...objednavka, [action.key]:0};
      }
       return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "update_boolean":
      let newBool = !objednavka[action.key]
	    return { ...objednavka, [action.key]: newBool };
    default: return objednavka;
  }
};

function App() {
  const [finalPrice, setFinalPrice] = useState(0);
  //vypisování aktuílná hodnoty při změně zadání
  const [showFinalPrice, setShowFinalPrice] = useState(0);
   //zbarvení tlačítka - porovnání ceny a rozpočtu
  const [checkedPrice, setCheckedPrice] = useState(0);

  //state objednavky spravujeme pomoci useReducer hooku
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

 //vyskočení okna s dárkem při objednávce nad 2000Kč
  const [gift, setGift] = useState(0);



  // useEffect(() => { console.log(JSON.stringify(objednavka)) }, [objednavka]);
  //použití useEffectu k vypisování aktuální hodnoty finální ceny
  useEffect(() => {
    let newFinalPrice = getFinalPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
//vyskočení okna s dárkem při objednávce nad 2000Kč
let newGiftCheck = checkGift(showFinalPrice);
    setGift(newGiftCheck);
  }, [objednavka, showFinalPrice]);  //aby se nám měnily hodnoty konečného výsledku při změně zadání
//kvůli dárkovému oknu se dodává i   showFinalPrice]

//pro kontrolu stavů:
useEffect(() => {console.log(JSON.stringify(objednavka))},[objednavka]);


  const getFinalPrice = (objednavka) => {
let priceHorske = 0;
let priceDetske = 0;
let priceSilnicni = 0;
let priceGravel = 0;
if (objednavka.koloHorske) {  priceHorske = (objednavka.pocetHorske * 500) };
if (objednavka.koloDetske) { priceDetske = (objednavka.pocetDetske * 200)  };
if (objednavka.koloSilnicni) { priceSilnicni = (objednavka.pocetSilnicni * 1500) };
if (objednavka.koloGravel) { priceGravel = (objednavka.pocetGravel * 2500) }; 
    
   let thisBasePrice = priceHorske + priceDetske + priceSilnicni + priceGravel;;
    let thisFinalPrice = thisBasePrice * objednavka.delkaZapujceni;


    if (objednavka.nosic === 0.05) {
      thisFinalPrice += (thisBasePrice * 0.05);
    }
    else if (objednavka.nosic === 0.10) {
      thisFinalPrice += (thisBasePrice * 0.10);
    }
 
    
    setFinalPrice(thisFinalPrice);
    return thisFinalPrice;
  }

  //zbarvení tlačítka - porovnání ceny a rozpočtu
  const checkPrice = (objednavka) => {
    if(objednavka.rozpocet >= finalPrice){
      let checkOK = 1;
      setCheckedPrice(checkOK);
    } else {
      let checkNOK = 2;
      setCheckedPrice(checkNOK);
    }
  };
//vyskočení okna s dárkem při objednávce nad 2000Kč
  const checkGift = (showFinalPrice) => {
    let checkGiftResult = 0;
    if (showFinalPrice >= 10000) {
      checkGiftResult = 1;
    } else {
      checkGiftResult = 2;
    }
    return checkGiftResult;
  }



  return (
    <PageContainer>
    <Formular>
      <FormSection name="nadpis">
        <MainTitle>Vaše objednávka</MainTitle>
      </FormSection>
      <FormSection name="vyber">
   <FormSectionRow>
      <Title>Výběr typu kola</Title>
      <Title>Počet kol</Title> 
    </FormSectionRow>     
  <FormSectionRow>  
<FormSectionColumn> 
<InputDiv>
          {/* zde je boolean hodnota zadaná přímo a pak se mění v hooku useReducer*/}
            <input type="checkbox" id="koloHorske"  onChange={(e) => {
              dispatch({
                type: "update_boolean",
                key: "koloHorske",
              });
            }} />
            <label>Horské kolo &nbsp; 500 Kč/den</label>
          </InputDiv>
</FormSectionColumn>
<FormSectionColumn>
<input type="text" id="pocetHorske" value={objednavka.pocetHorske} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "pocetHorske",
            });
          }} />
</FormSectionColumn>
</FormSectionRow>  

<FormSectionRow>
<FormSectionColumn>
<InputDiv>
          {/* zde je boolean hodnota zadaná přímo a pak se mění v hooku useReducer*/}
            <input type="checkbox" id="koloDetske"  onChange={(e) => {
              dispatch({
                type: "update_boolean",
                key: "koloDetske",
              });
            }} />
            <label>Dětské kolo &nbsp; 200 Kč/den</label>
          </InputDiv>
</FormSectionColumn>
<FormSectionColumn>
<input type="text" id="pocetDetske" value={objednavka.pocetDetske} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "pocetDetske",
            });
          }} />
</FormSectionColumn>
</FormSectionRow>
<FormSectionRow>
<FormSectionColumn>
<InputDiv>
          {/* zde je boolean hodnota zadaná přímo a pak se mění v hooku useReducer*/}
            <input type="checkbox" id="koloSilnicni"  onChange={(e) => {
              dispatch({
                type: "update_boolean",
                key: "koloSilnicni",
              });
            }} />
            <label>Silniční kolo &nbsp; 1500 Kč/den</label>
          </InputDiv>
</FormSectionColumn>
<FormSectionColumn>
<input type="text" id="pocetSilnicni" value={objednavka.pocetSilnicni} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "pocetSilnicni",
            });
          }} />
</FormSectionColumn>
</FormSectionRow>
<FormSectionRow>
<FormSectionColumn>
<InputDiv>
          {/* zde je boolean hodnota zadaná přímo a pak se mění v hooku useReducer*/}
            <input type="checkbox" id="c"  onChange={(e) => {
              dispatch({
                type: "update_boolean",
                key: "koloGravel",
              });
            }} />
            <label>Gravel kolo &nbsp; 2500 Kč/den</label>
          </InputDiv>
</FormSectionColumn>
<FormSectionColumn>
<input type="text" id="pocetGravel" value={objednavka.pocetGravel} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "pocetGravel",
            });
          }} />
</FormSectionColumn>
</FormSectionRow>
      </FormSection>
      <FormSection name="vlastnosti">
          <SectionTitle>Délka zapůjčení</SectionTitle>
          <select id='delkaZapujceni' onClick={(e) => {
            dispatch({
              type: "update_text",
              value: e.target.value,
              key: "delkaZapujceni",
            });
          }}>
            <option value={1}>1 den</option>
            <option value={3}>1 víkend</option>
            <option value={7}>1 týden</option>
            <option value={30}>1 měsíc</option>
          </select>
          </FormSection>
          <FormSection name="doprava">
          <SectionTitle>Další nabídka</SectionTitle>
          <div>
            <input type="radio" name="nosic" id="nosicStresni" value={0.05} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "nosic",
              });
            }} />
            <label>cyklonosič střešní (+ 5 procent z celkové ceny zápůjčky navíc)</label><br/>
            <input type="radio" name="nosic" id="nosicTazny" value={0.10} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "nosic",
              });
            }} />
            <label>cyklonosič na tažné zařízení (+ 10 procent z celkové ceny zápůjčky navíc)</label><br/>
            <input type="radio" name="nosic" id="nosicZadny" value={0} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "nosic",
              });
            }} />
            <label>není třeba cyklonosič</label><br/>
          </div>
        </FormSection>
<FormSection name="kalkulace">
<SectionTitle>Konečná kalkulace</SectionTitle>
<label>Finální cena:</label>
          <input type="text" id="finalniCena" value={showFinalPrice} disabled />

          <label>Zadejte váš rozpočet:</label>
          <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "rozpocet",
            });
          }} />
          
          <KontrolaButton 
            checked={checkedPrice} onClick={() => {
            checkPrice(objednavka);
          }}>
            Kontrola
          </KontrolaButton>
          {/* vyskočení okna s dárkem při objednávce nad 2000Kč */}
          <GiftAlert checked={gift}>
            <b>DĚKUJEME ZA OBJEDNÁVKU V HODNOTĚ NAD 10 000 KČ!</b>
            <p>K objednávce Vám přibalíme malý dárek.</p>
          </GiftAlert>
        </FormSection>
<FormSection name="email">
<SectionTitle>Kontaktní údaje</SectionTitle>
<label>Zadejte vaši emailovou adresu</label>
<input type="text" id="email" value={objednavka.email} onChange={(e) => {
  dispatch({
    type: "update_text",
    value: e.target.value,
    key: "email",
  });
}} />
</FormSection>
</Formular>
</PageContainer>
);
};
export default App;
