let  country_code ={
    "USD": "US",
    "STD": "ST",
    "SZL": "SZ",
    "UYU": "UY",
    "YER": "YE",
    "TRY": "TR",
    "TMT": "TM",
    "SO": "SH"
   
    
}

let apiKey= '412b40fad7df2358eb0039f0'

 const dropList= document.querySelectorAll('.drop-list select'),
 fromCurrency= document.querySelector('.from select '),
 toCurrency= document.querySelector('.to select'),
 getButton=document.querySelector("form button")
 
 
 for(let i=0; i<dropList.length; i++){

    for (currency_code in country_code){
        // console.log(currency_code);
        
        // SELECTING USD BY DEFOULT  AS FROM AND NPR AS TO CURRENCY
        let selected;
        if(i==0){
            selected = currency_code == "USD"? "selected": " ";
        }else if(i==1){
            selected = currency_code == "STD"? "selected": " ";
        }


        

        // creating option tag with passing currency code as atext and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
     
        // insert options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend",optionTag);

    }
    dropList[i].addEventListener('change',e=>{
         loadFlag(e.target); //calling loadfLAG WITH PASSING  TARGET ELEMENT AS AN ARGUMENT


    })

 }
 function loadFlag(element){
    for (code in currency_code){
        if(code == element.value){ // if the country list is equal to option value
            let imgTage=element.parentElement.querySelector('img') // slecting img tag of particular drop list
            // passing country code of selected currency code in img url
            imgTage.src = `https://flagsapi.com/${country_code[currency_code]}/shiny/64.png`;
        }
    }

 }

 window.addEventListener("load",()=>{

    getExchangeRate();
 })

 getButton.addEventListener("click",e=>{
    e.preventDefault() //preventing from submitting

    getExchangeRate();
 })

 const exchnageIcon = document.querySelector('.drop-list i');
 exchnageIcon.addEventListener("click",()=>{
    // alert('hi')
    let tempCode = fromCurrency.value; //temporary currency code of from droplist
    fromCurrency.value = toCurrency.value; // passing to currency code to fromcurrency code
    toCurrency.value = tempCode; // passing temprary currency code to tocurrency code

    getExchangeRate();
 })

 function  getExchangeRate(){
    const amount =document.querySelector('.amount input'),
     exchangeRateText= document.querySelector(".exchange-rate")
    let amountVal=amount.value;
    // if the user don't enter value or  enter o then we'll put 1 value by default in the input
    if(amountVal== ""|| amountVal =="0"){

        amount.value ="1";
        amountVal=1;
    }
    exchangeRateText.innerHTML =" Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    console.log(url);
    
    fetch(url).then(response=> response.json()).then(result=>{
      
        let exchangeRate=result.conversion_rates[toCurrency.value]
      let totalExchangeRate=(amountVal*exchangeRate).toFixed(2);
       
        exchangeRateText.innerHTML=`${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
        //  console.log(totalExchangeRate);
        
    })
 }



//   tafsiir : https://api.alquran.cloud/v1/quran/en.asad


