window.addEventListener("DOMContentLoaded", () => {
  function req() {
    //dupa ce se creeaza DOM SE cheama aceasta functie
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/people"); //ADRESA am luato din json-ser) ver

    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(); //e gol in cazul GET
    request.addEventListener("load", function () {
      if (request.status == 200) {
        //atunci cind totul e ok
        //response este o proprietate a obiectului XMLHttpRequest
        let data = JSON.parse(request.response); //in response avem raspunsul de la server
        console.log(data); //la acest moment daca totul este bine noi am primit datele de pe server
        data.forEach((item) => {
          let card = document.createElement("div");
          card.classList.add("card");

          let icon;
          if(item.sex === "male"){
              icon = "icons/mars.png";
          }else{
              icon = "icons/female.png"
          }
          card.innerHTML = `
                    <img src="${item.photo}" alt="phoyo"> 
                    <div class="name"> ${item.name} ${item.surname}</div>
                    <div class="sex"> <img src="${icon}" alt="sex"> </div>
                    <div class="age">${item.age}</div>`;
                    document.querySelector('.app').appendChild(card);
        });
      } else {
        console.error("Something wrong");
      }
    });

    this.remove();//stergem butonul dupa click
  }
  document.querySelector("button").addEventListener("click", req, {"once": true});
  //aici nu chemam functia (req()). al treile argument options { }. ii spunem sa lucreze doar o data
});
