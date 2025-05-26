const rollBtn = document.getElementById("rollBtn");
const resultDiv = document.getElementById("result");

const resultSchema = {
  d4: {
    nul: 1,
    fort: 4,
  },
  d6: {
    nul: 2,
    fort: 5,
  },
  // compléter avec d8, d10, d12, d20, etc.
};

function parseBonus(bonusStr) {
  const match = bonusStr.match(/([+-]?\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function rollDice(sides, count, bonus) {
  let total = 0;
  let rolls = [];
  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    total += roll;
  }

  // créer une phrase qui dit si le résultat est nul, fort, ou normal
  let phrase = "";
  const nulFort = resultSchema[`d${sides}`];
  if (total <= nulFort.nul * count) {
    phrase = "C’est le début du voyage, chaque point compte 👏 ";
  } else if (total >= nulFort.fort * count) {
    phrase = "Tu es à deux doigts de la légende 🌟";
  } else {
    phrase = "Tu as explosé le score 🔥";
  }

  total += bonus;
  return { total, rolls, phrase };
}

rollBtn.addEventListener("click", () => {
  const diceSides = parseInt(
    document.querySelector('input[name="dice"]:checked').value,
    10
  );
  const numDice = parseInt(document.getElementById("numDice").value, 10);
  const bonus = parseBonus(document.getElementById("bonus").value);

  const { total, rolls, phrase } = rollDice(diceSides, numDice, bonus);

  document.querySelector(".phrase").textContent = phrase;

  // Display the total result
  resultDiv.innerHTML = total;

  // Create spans for each roll
  const rollsSpans = rolls
    .map((roll) => `<span class="roll">${roll}</span>`)
    .join(" ");

  const rollsDiv = document.getElementById("rolls");
  rollsDiv.innerHTML = rollsSpans;

  // Display bonus if it's not zero
  const bonusResultDiv = document.getElementById("bonusResult");
  if (bonus !== 0) {
    bonusResultDiv.innerHTML = bonus > 0 ? `+${bonus}` : bonus;
  } else {
    bonusResultDiv.innerHTML = "";
  }
});
