 const gameBoard = document.getElementById("gameBoard");
    const restartBtn = document.getElementById("restartBtn");
    const scoreEl = document.getElementById("score");

    const cardValues = ["🍎", "🍌", "🍇", "🍒", "🍉", "🥝"];
    let cards = [...cardValues, ...cardValues];

    let flippedCards = [];
    let lockBoard = false;
    let score = 0;

    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
      gameBoard.innerHTML = "";
      shuffle(cards);

      score = 0;
      scoreEl.textContent = score;
      flippedCards = [];
      lockBoard = false;

      cards.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;

        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">${value}</div>
          </div>
        `;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
      });
    }

    function flipCard() {
      if (lockBoard || this.classList.contains("flip")) return;

      this.classList.add("flip");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    }

    function checkMatch() {
      lockBoard = true;
      const [card1, card2] = flippedCards;

      if (card1.dataset.value === card2.dataset.value) {
        score += 10;
        scoreEl.textContent = score;

        card1.classList.add("matched");
        card2.classList.add("matched");

        card1.style.pointerEvents = "none";
        card2.style.pointerEvents = "none";

        flippedCards = [];
        lockBoard = false;
      } else {
        setTimeout(() => {
          card1.classList.remove("flip");
          card2.classList.remove("flip");
          flippedCards = [];
          lockBoard = false;
        }, 800);
      }
    }

    restartBtn.addEventListener("click", createBoard);

    createBoard();