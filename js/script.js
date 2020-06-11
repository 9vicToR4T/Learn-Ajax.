window.addEventListener("DOMContentLoaded", () => {
  function req() {
    // //dupa ce se creeaza DOM SE cheama aceasta functie
    // const request = new XMLHttpRequest();
    // request.open("GET", "http://localhost:3000/people"); //ADRESA am luato din json-ser) ver

    // request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    // request.send(); //e gol in cazul GET
    // request.addEventListener("load", function () {
    //   if (request.status == 200) {
    //     //atunci cind totul e ok
    //     //response este o proprietate a obiectului XMLHttpRequest
    //     let data = JSON.parse(request.response); //in response avem raspunsul de la server
    //     console.log(data); //la acest moment daca totul este bine noi am primit datele de pe server
    //     createCards(data);
       

    //   } else {
    //     console.error("Something wrong");
    //   }
    // });


    getResources("http://localhost:3000/people") //cererea spre server. ne intoarce un Promes
      //.then((data) => data.json()) //primim, daca totul e bine, datele venite de la server.Aceasta nu ne intoarce un json obiect, ci un alt Promes
      .then((data) => createCards(data)) //aici deja putem prelucra datele
      .catch((err) => console.error(err));

    this.remove();//stergem butonul dupa click
  }





  async function  getResources(url) {//pentru a scapa de codul care se repeta
      let res = await fetch(`${url}`);//folosim async await pentru a astepta datele de pe server

        if(!res.ok){//in fetch avem proprietatea ok, care ne spune rezultatul cererii
            throw new Error(`Could not fetch ${url}, 
            status: ${res.status }`) //e bine sa cerem status deoarece fetch default nu arata care e problema
        }

      return await res.json();//in loc de  .then( data => data.json())
      
  }
  
  document.querySelector("button").addEventListener("click", req, {"once": true});
  //aici nu chemam functia (req()). al treile argument options { }. ii spunem sa lucreze doar o data

function createCards(response){ 
     response.forEach((item) => {
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
}

});
