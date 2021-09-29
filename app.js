const baseInput = document.querySelector("#baseInput");
const baseSelect = document.querySelector("#baseSelect");

const toCurrencyInput = document.querySelector("#toCurrencyInput");
const toCurrencySelect = document.querySelector("#toCurrencySelect");

baseInput.addEventListener("keyup", setInput);
baseSelect.addEventListener("change", setInput);
toCurrencySelect.addEventListener("change", setInput);

async function selectCountries() {
  const response = await fetch("https://api.frankfurter.app/latest");
  const data = await response.json();
  const rates = [data.base, ...Object.keys(data.rates)];

  rates.map((rate) => {
    const baseOption = document.createElement("option");
    baseOption.value = rate;
    baseOption.textContent = rate;
    baseSelect.appendChild(baseOption);

    const toCurrencyOption = document.createElement("option");
    toCurrencyOption.value = rate;
    toCurrencyOption.textContent = rate;
    toCurrencySelect.appendChild(toCurrencyOption);
  });
}

async function setInput() {
  try {
    if (baseSelect.value == toCurrencySelect.value) {
      toCurrencyInput.value = baseInput.value;
      return;
    }
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${baseInput.value}&from=${baseSelect.value}&to=${toCurrencySelect.value}`
    );
    const data = await response.json();
    toCurrencyInput.value = Object.values(data.rates)[0].toFixed(2);
  } catch (err) {
    console.error(err);
  }
}

selectCountries();
