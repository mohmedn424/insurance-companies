if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) =>
      console.log('service worker not registered', err)
    );
}

//Getting Dom Elements
let percent = document.getElementById('percent'),
  Amount = document.getElementById('amount'),
  calcBt = document.getElementById('calcBt'),
  agentResult = document.getElementById('agentResult'),
  deleteBt = document.getElementById('deleteBt'),
  form = document.getElementById('calc-form'),
  exchangeAmount = document.getElementById('exchangeAmount');

//make focus on percent fo faster interact
percent.focus();

function calc() {
  //calc the percent neded from the Agent
  let agentPays = ((Amount.value / 100) * percent.value).toFixed(2);
  agentResult.value = agentPays;

  let hash = Math.abs(
    (Amount.value / 100) * (50 - percent.value) - Amount.value
  );
  exchangeAmount.value = hash.toFixed(2);
}

calcBt.addEventListener('click', () => {
  calc();
});

deleteBt.addEventListener('click', () => {
  percent.focus();
  form.reset();
});

document.addEventListener('keypress', function (event) {
  if (event.keyCode == 13) {
    calc();
  }
});
document.addEventListener('keypress', function (e) {
  if (e.keyCode == 32) {
    percent.focus();
    deleteBt.click();
  }
});
