let country_code = {
    "USD": "US",
    "STD": "ST",
    "SZL": "SZ",
    "UYU": "UY",
    "YER": "YE",
    "TRY": "TR",
    "TMT": "TM"
};

// Replace with your actual API key
let apiKey = "412b40fad7df2358eb0039f0";

const dropList = document.querySelectorAll('.drop-list select');
let fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    getButton = document.querySelector("form button");

// Populate the dropdowns
for (let i = 0; i < dropList.length; i++) {
    for (let currency in country_code) {

         let selected ;
         
        if(i==0){
            selected = currency == "USD" ? "selected" : "";
        }else if(i==1){
            selected = currency == "UYU"? "selected" : "";
        }

            
        
        let optionTag = `<option value="${currency}" ${selected}>${currency}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener('change', e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    let currencyCode = element.value;
    if (country_code[currencyCode]) {
        let imgTag = element.parentElement.querySelector('img');
        if (imgTag) {
            imgTag.src = `https://flagsapi.com/${country_code[currencyCode]}/shiny/64.png`;
        }
    }
}

// Ensure exchange rate updates on page load
window.addEventListener("load", () => {
    getExchangeRate();
});

// Handle button click
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

// Handle currency swap
const exchangeIcon = document.querySelector('.drop-list i');
if (exchangeIcon) {
    exchangeIcon.addEventListener("click", () => {
        let tempCode = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = tempCode;
        getExchangeRate();
    });
}

// Fetch Exchange Rate
function getExchangeRate() {
    const amount = document.querySelector('.amount input'),
          exchangeRateText = document.querySelector(".exchange-rate");

    let amountVal = amount.value;
    if (amountVal === "" || amountVal === "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateText.innerHTML = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

    fetch(url)
        // .then(response => console.log(response.json()));
        .then(response => response.json()) .then(result => {
           var exchangeRate = result.conversion_rates[toCurrency.value];
            // console.log(exchangeRate);

            let totalExchangeRate=(amountVal*exchangeRate).toFixed(2);
       
        exchangeRateText.innerHTML=`${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
        //  console.log(totalExchangeRate);
           
            
         
        });
}






// ERROR HANDELING


   // if (result.result === "error" || !result.rates) {
            //     // throw new Error("Invalid API response");
            // }

            

        //     if (!exchangeRate) {
        //         throw new Error("Currency not found");
        //     }

        //     let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        //     exchangeRateText.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        // })
        // .catch(error => {
        //     exchangeRateText.innerHTML = `Error: ${error.message}`;


