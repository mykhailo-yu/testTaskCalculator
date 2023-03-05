const inputStorage = document.querySelector('#storage-range');
const inputTransfer = document.querySelector("#transfer-range");
const storageText = document.querySelector(".storage-text");
const transferText = document.querySelector(".transfer-text");
const hdd = document.querySelector('#hdd');
const sdd = document.querySelector('#ssd');
const multi = document.querySelector('#multi');
const single = document.querySelector('#single');
const backblazeTextPrice = document.querySelector('#backblazePrice');
const bunnyTextPrice = document.querySelector('#bunnyPrice');
const scalewayTextPrice = document.querySelector('#scalewayPrice');
const vultrTextPrice = document.querySelector('#vultrPrice');
const backblazeBar = document.querySelector('#backblaze-bar');
const bunnyBar = document.querySelector('#bunny-bar');
const scalewayBar = document.querySelector('#scaleway-bar');
const vultrBar = document.querySelector('#vultr-bar');
let isSsd = true, isMulti = false;
let isMobile;
if (window.innerWidth < 768) isMobile = true;
else isMobile = false;
// Event listeners for changing values of inputs by scroll wheel by 1 GB
inputTransfer.addEventListener("wheel", (e) => {
    if (e.deltaY < 0) {
        inputTransfer.valueAsNumber += 1;
    } else {
        inputTransfer.value -= 1;
    }
    e.preventDefault();
    e.stopPropagation();

    calc();
    transferText.innerHTML = inputTransfer.value
})
inputStorage.addEventListener("wheel", (e) => {
    if (e.deltaY < 0) {
        inputStorage.valueAsNumber += 1;
    } else {
        inputStorage.value -= 1;
    }
    e.preventDefault();
    e.stopPropagation();

    calc();
    storageText.innerHTML = inputStorage.value
})
// Event listeners for recalculating prices every change of something
inputStorage.oninput = () => {
    storageText.innerHTML = inputStorage.value
    calc()
}
inputTransfer.oninput = () => {
    transferText.innerHTML = inputTransfer.value
    calc()
}
hdd.oninput = () => {
    isSsd = false;
    calc();
}
ssd.oninput = () => {
    isSsd = true;
    calc();

}
multi.oninput = () => {
    isMulti = true;
    calc();
}
single.oninput = () => {
    isMulti = false;
    calc();
}
// Main function for calculating prices
function calc() {
    let storageValue = inputStorage.value;
    let transferValue = inputTransfer.value;
    let backblazePrice, bunnyPrice, scalewayPrice, vultrPrice;
    let backblaze = () => {
        const storage = 0.005;
        const transfer = 0.01;
        let price = storage * storageValue + transfer * transferValue;
        if (price < 7) price = 7;
        return (price);
    }
    let bunny = () => {
        let storage;
        if (isSsd === true) {
            storage = 0.02;
        } else storage = 0.01;
        const transfer = 0.01;
        let price = storage * storageValue + transfer * transferValue;
        if (price > 10) price = 10;
        return (price);
    }
    let scaleway = () => {
        let storage;
        let transfer;
        let price;
        if (storageValue > 75 && isMulti === true) {
            storage = 0.06;
            transfer = 0.02;
            price = storage * (storageValue - 75) + transfer * (transferValue - 75);
        }
        else if (storageValue > 75 && isMulti == false) {
            storage = 0.03;
            transfer = 0.02;
            price = storage * (storageValue - 75) + transfer * (transferValue - 75);
        }
        else {
            storage = 0;
            transfer = 0;
            price = storage * storageValue + transfer * transferValue;
        }
        return (price);
    }
    let vultr = () => {
        const storage = 0.01;
        const transfer = 0.01;
        let price = storage * storageValue + transfer * transferValue;
        if (price < 5) price = 5;
        return (price);
    }
    backblazePrice = backblaze();
    bunnyPrice = bunny();
    scalewayPrice = scaleway();
    vultrPrice = vultr();

    // Finding biggest and smallest price
    let prices = [];
    prices.push(backblazePrice);
    prices.push(bunnyPrice);
    prices.push(scalewayPrice);
    prices.push(vultrPrice);
    let biggestPrice = Math.max(...prices);
    let smallestPrice = Math.min(...prices);
    console.log(smallestPrice)
    // Changing background color in bar with smallest price 
    if (smallestPrice === backblazePrice) {
        backblazeBar.style.backgroundColor = "rgb(131, 3, 131)";
        bunnyBar.style.backgroundColor = "rgb(185, 180, 180)";
        scalewayBar.style.backgroundColor = "rgb(185, 180, 180)";
        vultrBar.style.backgroundColor = "rgb(185, 180, 180)";
    }
    else if (smallestPrice === bunnyPrice) {
        backblazeBar.style.backgroundColor = "rgb(185, 180, 180)";
        bunnyBar.style.backgroundColor = "rgb(131, 3, 131)";
        scalewayBar.style.backgroundColor = "rgb(185, 180, 180)";
        vultrBar.style.backgroundColor = "rgb(185, 180, 180)";
    }
    else if (smallestPrice === scalewayPrice) {
        backblazeBar.style.backgroundColor = "rgb(185, 180, 180)";
        bunnyBar.style.backgroundColor = "rgb(185, 180, 180)";
        scalewayBar.style.backgroundColor = "rgb(131, 3, 131)";
        vultrBar.style.backgroundColor = "rgb(185, 180, 180)";
    }
    else if (smallestPrice === vultrPrice) {
        backblazeBar.style.backgroundColor = "rgb(185, 180, 180)";
        bunnyBar.style.backgroundColor = "rgb(185, 180, 180)";
        scalewayBar.style.backgroundColor = "rgb(185, 180, 180)";
        vultrBar.style.backgroundColor = "rgb(131, 3, 131)";
    }

    // Changing width of bars on desktop and height on mobile
    if (isMobile === false) {
        backblazeBar.style.width = `${backblazePrice * 80 / biggestPrice}%`;
        bunnyBar.style.width = `${bunnyPrice * 80 / biggestPrice}%`;
        scalewayBar.style.width = `${scalewayPrice * 80 / biggestPrice}%`;
        vultrBar.style.width = `${vultrPrice * 80 / biggestPrice}%`;
    }
    else if (isMobile === true) {
        backblazeBar.style.height = `${backblazePrice * 95 / biggestPrice}%`;
        bunnyBar.style.height = `${bunnyPrice * 95 / biggestPrice}%`;
        scalewayBar.style.height = `${scalewayPrice * 95 / biggestPrice}%`;
        vultrBar.style.height = `${vultrPrice * 95 / biggestPrice}%`;
    }
    //Round the prices
    backblazeTextPrice.innerHTML = backblazePrice.toFixed(2);
    bunnyTextPrice.innerHTML = bunnyPrice.toFixed(2);
    scalewayTextPrice.innerHTML = scalewayPrice.toFixed(2);
    vultrTextPrice.innerHTML = vultrPrice.toFixed(2);
}
// Сalling a function to calculate after the site is loaded
calc(); 