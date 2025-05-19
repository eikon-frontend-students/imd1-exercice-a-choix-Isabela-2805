<script>
    const rollBtn = document.getElementById("rollBtn");
    const resultDiv = document.getElementById("result");
    const rollsDiv = document.getElementById("rolls");
    const modeText = document.getElementById("modeText");

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
      total += bonus;
      return { total, rolls };
    }

    function getRandomText(mode, total, dice, iaTotal = null) {
      switch(mode) {
        case 'rpg':
          if (total === dice * 20) return "💥 CRITIQUE ! Une légende est née !";
          if (total <= dice) return "😢 Aïe... tout ça pour ça ?";
          return "Tu avances dans ta quête...";
        case 'ai':
          return total > iaTotal ? "🤖 Tu bats l'IA !" : total < iaTotal ? "😈 L'IA gagne cette fois !" : "🤝 Égalité !";
        default:
          return [
            "La chance est avec toi !",
            "Pas mal du tout.",
            "Peux mieux faire...",
            "Quelle surprise !"
          ][Math.floor(Math.random() * 4)];
      }
    }

    rollBtn.addEventListener("click", () => {
      const diceSides = parseInt(document.querySelector('input[name="dice"]:checked').value);
      const numDice = parseInt(document.getElementById("numDice").value);
      const bonus = parseBonus(document.getElementById("bonus").value);
      const mode = document.querySelector('input[name="mode"]:checked').value;

      const { total, rolls } = rollDice(diceSides, numDice, bonus);
      resultDiv.innerHTML = `<strong>Résultat : ${total}</strong>`;
      rollsDiv.innerHTML = rolls.map(n => `<span class="roll">${n}</span>`).join('');

      if (mode === 'ai') {
        const ia = rollDice(diceSides, numDice, 0);
        modeText.innerText = getRandomText(mode, total, diceSides, ia.total) + ` (IA : ${ia.total})`;
      } else {
        modeText.innerText = getRandomText(mode, total, diceSides);
      }
    });
  </script>
</body>
</html>

