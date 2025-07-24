const form = document.getElementById("showForm");
const successMessage = document.getElementById("successMessage");
const showsList = document.getElementById("showsList");

window.addEventListener("DOMContentLoaded", renderShows);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newShow = {
    id: Date.now(),
    title: document.getElementById("title").value,
    emotion: document.getElementById("emotion").value,
    participation: form.elements["participation"].value,
    equipment: document.getElementById("equipment").value,
    intensity: document.getElementById("intensity").value,
    ageLimit: document.getElementById("ageLimit").value,
    email: document.getElementById("email").value,
  };

  const shows = JSON.parse(localStorage.getItem("shows") || "[]");
  shows.push(newShow);
  localStorage.setItem("shows", JSON.stringify(shows));
    
console.log("הטופס נשלח:", newShow);

form.reset();
successMessage.style.display = "block";

renderShows();

});

function renderShows() {
    const shows = JSON.parse(localStorage.getItem("shows") || "[]");

    showsList.innerHTML = "";

    if (shows.length === 0){
        return;
    }

    shows.forEach((show) => {
         const card = document.createElement("div");
    card.className = "show-card";
    card.innerHTML = `
      <p><strong> שם ההצגה:</strong> ${show.title}</p>
      <p><strong> רגש מרכזי:</strong> ${show.emotion}</p>
      <p><strong> השתתפות:</strong> ${show.participation}</p>
      <p><strong> ציוד נדרש:</strong> ${show.equipment}</p>
      <p><strong> אינטנסיביות:</strong> ${show.intensity}</p>
      <p><strong> מגבלת גיל:</strong> ${show.ageLimit}</p>
      <p><strong> מייל:</strong> ${show.email}</p>
      <button onclick="deleteShow(${show.id})"> מחק</button>
    `; 
        showsList.appendChild(card);
    });
}

function deleteShow(id) {
  let shows = JSON.parse(localStorage.getItem("shows") || "[]");
  shows = shows.filter((show) => show.id !== id);
  localStorage.setItem("shows", JSON.stringify(shows));
  renderShows();
}