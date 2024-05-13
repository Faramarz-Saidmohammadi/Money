const movie = document.getElementById("movie");
let ticketPrice = +movie.value;
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const clear = document.getElementById("clear");

readDB();

// Container event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountandTotal();
  }
});

movie.addEventListener("change", (e) => {
  ticketPrice = +movie.value;
  updateCountandTotal();
});

// update Count and total
function updateCountandTotal() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  const selectedIndex = [...selectedSeat].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex));

  const selectedSeatCount = selectedSeat.length;
  count.innerHTML = selectedSeatCount;
  total.innerHTML = selectedSeatCount * ticketPrice;
}

// readDb
function readDB() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }
}

//
clear.addEventListener("click", () => {
  localStorage.clear();
});
