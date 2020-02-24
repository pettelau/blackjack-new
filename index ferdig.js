import { connection } from "./mysql_connection.js"; //legger inn connection med mysql

let leaderboard;
let leaderboardList = document.getElementById("leaderboardList");
let emailLoggInn = document.getElementById("emailLoggInn");
let leggtilbruker = document.getElementById("registrer");
let brukernavnNy = document.getElementById("brukernavnNy");
let emailNy = document.getElementById("email");
let loggInnKnapp = document.getElementById("loggInn");
let saldo;
let stuff = document.getElementById("stuff"); // Har lagt inn en del ting som skal være
stuff.style.visibility = "hidden"; // skjult under oppstart, som blir gjort visible senere

let counter = 0; // en counter som bruker i funksjonen under for å kun vise de fem beste brukerne i listen

leaderboardfunc();
function leaderboardfunc() {
  //funksjon som oppdaterer leaderboardet på siden
  connection.query(
    "SELECT * FROM Leaderboard ORDER BY score DESC;",
    (error, results) => {
      if (error) return console.error(error);
      for (let player of results) {
        if (counter < 5) {
          leaderboardList.innerHTML +=
            "<li>" + player.username + ": " + player.score + "%" + "</li>";
        }
        counter += 1; // plusser på counteren med 1 for hver gang, slik at løkka stopper etter 5 ganger
      }
    }
  );
}

let spillerTreff = 0; // en variabel som starter på 0 og som blir 1 om emailen som skrives inn treffer en eksisterende
// bruker i databasen.
loggInnKnapp.onclick = () => {
  //knapp og funksjon for å logge inn med en eksisterende bruker
  emailLoggInn.disabled = true;
  connection.query("SELECT * FROM Leaderboard", (error, results) => {
    if (error) return console.error(error);
    for (let spiller of results) {
      if (spiller.email == emailLoggInn.value) {
        saldo = spiller.score * 10; //ROIen ganges med 10 for å få saldoen opp, siden startsaldo er 1000 og roi er 100 by default
        spillerTreff += 1;
        visSaldo();
        stuff.style.visibility = "visible"; //gjør diverse knapper og input synlige
        loggInnKnapp.style.visibility = "hidden"; //gjør logg inn knapp usynlig
      }
    }
    if (spillerTreff == 0) {
      //hvis emailen ikke finner en passende bruker i databasen returneres denne alerten.
      alert("Finner ikke brukeren i databasen. Prøv igjen.");
      emailLoggInn.disabled = false;
    }
  });
};
leggtilbruker.onclick = () => {
  //legge til ny bruker
  if (brukernavnNy.value !== emailNy.value) {
    //brukernavn og email kan ikke være like (security reasons)
    connection.query(
      //legger inn i databasen med en spørring
      "INSERT INTO Leaderboard (username, email, score) VALUES (?, ?, ?)",
      [brukernavnNy.value, emailNy.value, 100]
    );
  }
};

let alleKort = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let alleKortValue = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]; //alle kortene sine navn
let alleKortPoeng = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]; //alle kortene sine verdier i form av poeng i BJ (10-K er 10 poeng)
let alleKortBilder = [
  "ess.png",
  "to.png",
  "tre.png",
  "fire.png",
  "fem.png",
  "seks.png",
  "syv.png",
  "åtte.png",
  "ni.png",
  "ti.png",
  "knekt.png",
  "dame.png",
  "konge.png"
]; //filnavnet til alle bildene som blir printet ut til siden

let dealerKort1;
let dealerKort2;
let dealerKort3;
let dealerKort4;
let dealerKort5;
let dealerKort6;
let dealerKort7;
let dealerKort8; //alle dealerkort. disse blir senere tildelt en verdi fra 1-13

let spillerKort1;
let spillerKort2;
let spillerKort3;
let spillerKort4;
let spillerKort5;
let spillerKort6;
let spillerKort7;
let spillerKort8; //alle spillerkort. disse blir senere tildelt en verdi fra 1-13

let trekkNyKnapp; //lager noen variabler for knapper som blir brukt senere
let staKnapp;
let nyttSpillKnapp;

let nyttSpillCounter = 0; //null runder spilt. Dette blir brukt senere for å opprette nye knapper kun den første runden det blir spilt, slik at ikke nye ting
//oppretter hver gang
let dealerKortArray = [];
let innsats = document.getElementById("innsats");
let bilde1 = document.getElementById("bilde1");
let bilde2 = document.getElementById("bilde2");
let bilde3 = document.getElementById("bilde3");
let bilde4 = document.getElementById("bilde4");
let bilde5 = document.getElementById("bilde5");
let bilde6 = document.getElementById("bilde6");
let bilde7 = document.getElementById("bilde7");
let bilde8 = document.getElementById("bilde8");

let bilde9 = document.getElementById("bilde9");
let bilde10 = document.getElementById("bilde10");
let bilde11 = document.getElementById("bilde11");
let bilde12 = document.getElementById("bilde12");
let bilde13 = document.getElementById("bilde13");
let bilde14 = document.getElementById("bilde14");
let bilde15 = document.getElementById("bilde15");
let bilde16 = document.getElementById("bilde16");

let oppstartKnapp = document.getElementById("oppstart");
let sjekkInnsatsKnapp = document.getElementById("sjekkInnsats");

let spillerSum = 0;
let runderSpilt = 0;
//visSaldo();
function visSaldo() {
  //en funksjon som blir kallet på hver gang det skjer oppdateringer i brukerens saldo.
  document.getElementById("saldo").innerText = "Saldo: " + parseInt(saldo);
  connection.query("UPDATE Leaderboard SET score=? WHERE username=?", [
    (parseInt(saldo) / 1000) * 100,
    emailLoggInn.value
  ]); //oppdateer også saldo i databasen
  leaderboardfunc(); //kaller på leaderboard funksjonen slik at leaderboard blir oppdatert kontinuerlig
  counter = 0; //reseter counter som hører til leaderboard, slik at for-løkken som printer ut de fem beste brukerne kjører på nytt
  leaderboardList.innerHTML = ""; //sletter gammel leaderboard slik at kun den oppdaterte blir vist.
}

sjekkInnsatsKnapp.onclick = () => {
  //sjekker at innsatsen er mindre eller lik saldo, hvis ikke kan ikke brukeren spille.
  if (innsats.value > saldo || saldo < 0) {
    alert("Innsatsen overskrider saldoen din");
    document.getElementById("oppstart").style.visibility = "hidden";
  } else {
    //synliggjør diverse knapper når saldo er godkjent og bruker er klar til å spille
    document.getElementById("oppstart").style.visibility = "visible";
    document.getElementById("sjekkInnsats").disabled = true;
    document.getElementById("innsats").disabled = true;
  }
};
var spillerKortArray;
oppstartKnapp.onclick = () => {
  // dette er på en måte hovedfunksjonen som starter en runde med blackjack
  saldo = saldo - innsats.value; //innsatsen trekkes fra saldo, og saldo oppdateres
  visSaldo();

  dealerKort1 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort2 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort3 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort4 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort5 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort6 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort7 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort8 = alleKort[Math.floor(Math.random() * 13)]; //alle dealerkort får en verdi

  spillerKort1 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort2 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort3 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort4 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort5 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort6 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort7 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort8 = alleKort[Math.floor(Math.random() * 13)]; //alle dealerkort får en verdi

  spillerKortArray = [spillerKort1, spillerKort2]; // de to første spillerkortene legges inn i et array

  bilde1.src = alleKortBilder[dealerKort1 - 1]; //dealerkort 1 vises på siden
  document.getElementById("currentPointDealer").innerHTML =
    alleKortPoeng[dealerKort1 - 1]; //dealerens poengsum vises

  bilde9.src = alleKortBilder[spillerKort1 - 1]; //spillerens to første kort vises
  bilde10.src = alleKortBilder[spillerKort2 - 1];

  if (runderSpilt == 0) {
    //hvis dette er første runde vil det blir oppdatert knapper for å trekke nytt kort og å stå på nåværende poengsum
    trekkNyKnapp = document.createElement("button");
    trekkNyKnapp.innerHTML = "Trekk nytt kort";
    document.body.appendChild(trekkNyKnapp);

    staKnapp = document.createElement("button");
    staKnapp.innerHTML = "Stå";
    document.body.appendChild(staKnapp);

    runderSpilt++; //runderspilt blir til 1 og dette skjer altså ikke på den eventuelt neste runden som blir spilt
  }

  staKnapp.style.visibility = "visible";
  trekkNyKnapp.style.visibility = "visible";

  steg2(); // alt som skjer etter dette måtte settes inn i en veldig stor funksjon ( steg2() ), siden JS kjører gjennom hele koden når siden lastes ble det krøll
  //lenger nede i koden. Derfor kalles ikke dette på før her.
}; //ikke i bruk

/* function currentValueold(trukkedeKort) {
  trukkedeKort.sort(aceToBack);
  console.log(trukkedeKort);
  let sum = 0;
  for (let kort of trukkedeKort) {
    if (kort != 1) {
      sum += parseInt(alleKortPoeng[kort - 1]);
    } else if (sum + 11 >= 22) {
      sum += 1;
    } else {
      sum += 11;
    }
  }
  return sum;
} */ //BJ er laget sånn at Essene kan ha båd verdi som 1 eller 11, ut ifra hva som er best for spilleren/dealeren. Hvis summen overskrider 21 når essen telles som 11,
//vil essen istedenfor telles som 1. De to funksjonene under finner ut av hva som er mest gunstig for spilleren og gjør dette
//Disse to funksjonene vil være lettere og gi mer mening dersom man ser på funksjonen steg2() under først.

function aceToBack(a, b) {
  //funksjon som setter alle essene bakerst i arrayet for spiller og dealer.
  if (a == 1 || b == 1) {
    if (b == 1) {
      return -1;
    }
    return 1;
  } else {
    return 0;
  }
}

function currentValue(trukkedeKort) {
  //denne funksjonen gir spilleren/dealeren den høyeste mulige poengsummen med essene
  trukkedeKort.sort(aceToBack);
  let sum = 0;
  for (let i = 0; i < trukkedeKort.length; i++) {
    if (trukkedeKort[i] != 1) {
      //hvis kortet ikke er et ess, blir det naturligvis bare lagt til i summen
      sum += parseInt(alleKortPoeng[trukkedeKort[i] - 1]);
    } else {
      if (typeof trukkedeKort[i + 1] != "undefined") {
        //hvis man har fått TO ELLER FLERE ess i samme runde, vil alle essene unntatt den siste
        //telles som 1, fordi to ess som teller som 11 blir 22 og da har man uansett gått over 21, noe man ikke ønsker.
        sum += 1; //så alle essene som ikke er det siste esset får summen 1
      } else {
        if (sum + 11 >= 22) {
          //hvis det siste esset går over 21 dersom det teller som 11, blir det lagt til som 1
          sum += 1;
        } else {
          //hvis ikke det går over 21, blir det lagt til som 11.
          sum += 11;
        }
      }
    }
  }
  return sum; //summen, som altså er den mest gunstige summeren spilleren/dealeren kan ha ut ifra kortene, blir returnert av funksjonen
}

function steg2() {
  //her begynner "del 2" av spillet, hvor brukeren faktisk må begynne å ta valg (stå eller trekke nytt kort)
  let at = 0; //denne variablen spier hvor mange ganger spilleren har trykket på "trekk nytt kort"-knappen, som er en egen funksjon under ("trekkNyKnapp.onclick")
  document.getElementById("currentPoint").innerText = currentValue(
    spillerKortArray
  ); //nåværende poengsum vises på siden etter å ha kjørt gjennom currentValue-funksjonen, som alltid viser riktig sum
  if (currentValue(spillerKortArray) == 21) {
    //hvis man får det spesielle tilfellet akkurat 21 poeng (Blackjack),
    setTimeout(function() {
      alert("Blackjack babyyyyy");
    }, 500);
    staFunksjon();
    if (currentValue(dealerKortArray) !== 21) {
      //hvis dealer ikke har blackjack samtidig har spilleren automatisk vunnet og innsats ganges med 0.5 ekstra (BJ-regel)
      saldo += innsats.value * 0.5;
    }
    visSaldo();
  }

  trekkNyKnapp.onclick = () => {
    //spilleren velger å trekke nytt kort
    trekkFunksjon();
  };
  function trekkFunksjon() {
    //da kalles denne funksjonen
    if (at == 0) {
      //at starter som 0 så denne if-setningen kjøres da uansett
      bilde11.src = alleKortBilder[spillerKort3 - 1]; //kort 3 vises
      spillerKortArray.push(spillerKort3);
      document.getElementById("currentPoint").innerText = currentValue(
        spillerKortArray
      );
      if (currentValue(spillerKortArray) > 21) {
        resultat(dealerKortArray); //hvis spilleren nå har over 21 hoppes det rett på resultat, og man har tapt.
      }
    }
    if (at == 1) {
      //at plusses på med 1 i bunnen av trekkFunksjon, så hvis spilleren velger å trekke enda et kort vil denne if-setningen kjøre
      //herfra og ned skjer egentlig akkurat det samme hver gang: Er spilleren fortsatt under 21 kan han/hun trekke nytt kort, kommer spilleren over 21 kjøres resultat-funksjon.
      bilde12.src = alleKortBilder[spillerKort4 - 1];
      spillerKortArray.push(spillerKort4);
      document.getElementById("currentPoint").innerText = currentValue(
        spillerKortArray
      );
      if (currentValue(spillerKortArray) > 21) {
        resultat(dealerKortArray);
      }
    }
    if (at == 2) {
      bilde13.src = alleKortBilder[spillerKort5 - 1];
      spillerKortArray.push(spillerKort4);
      document.getElementById("currentPoint").innerText = currentValue(
        spillerKortArray
      );

      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    if (at == 3) {
      bilde14.src = alleKortBilder[spillerKort6 - 1];
      spillerKortArray.push(spillerKort5);
      document.getElementById("currentPoint").innerText = currentValue(
        spillerKortArray
      );
      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    if (at == 4) {
      bilde15.src = alleKortBilder[spillerKort7 - 1];
      spillerKortArray.push(spillerKort6);
      document.getElementById("currentPoint").innerText = currentValue(
        spillerKortArray
      );
      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    if (at == 5) {
      bilde16.src = alleKortBilder[spillerKort8 - 1];
      spillerKortArray.push(spillerKort7);
      document.getElementById("currentPoint").innerText = currentValue(
        spillerKortArray
      );
      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    at++; // at = antall trekk. Viser hvor mange ganger spilleren har trykket på Trekk nytt kort.
  }
  //staknapp() viser automatisk kort nr 2 for dealer, oppdaterer forløpig totalsum og kjører neste kortfunk etter 1.5 sek dersom totalsum er >17
  staKnapp.onclick = () => {
    staFunksjon();
  };
  function staFunksjon() {
    bilde2.src = alleKortBilder[dealerKort2 - 1];
    dealerKortArray = [dealerKort1, dealerKort2];
    document.getElementById("currentPointDealer").innerText = currentValue(
      dealerKortArray
    );
    let dealerSum =
      alleKortPoeng[dealerKort1 - 1] + alleKortPoeng[dealerKort2 - 1];

    if (currentValue(dealerKortArray) < 17) {
      setTimeout(function() {
        kort3();
      }, 1500);
      //her kommer funkesjoner for kort 3,4,5,6,7 og 8. Funkjsonen viser neste bildekort, pusher kortverdi inn i array og viser forløpig totalsum. Dersom totalsumen til dealer er under 17 kjøres neste kortfunksjon etter 1.5 sek for bedre visuell opplevelse. Man kan maksimalt trekke 8 kort i dette spilet, i teorien kan man trekke 21 ess på rad siden man vanligvis spiller med 8 kortstokker, men vi har begrenset antall kort til 8 her da det er svært usansynlig at man trekker mer en dette uansett.
      function kort3() {
        console.log(currentValue(dealerKortArray));
        bilde3.src = alleKortBilder[dealerKort3 - 1];
        dealerKortArray.push(dealerKort3);
        document.getElementById("currentPointDealer").innerText = currentValue(
          dealerKortArray
        );
        if (currentValue(dealerKortArray) < 17) {
          setTimeout(function() {
            kort4();
          }, 1500);
        } else {
          resultat();
        }
      }
    } else {
      resultat();
    }
    function kort4() {
      console.log(currentValue(dealerKortArray));
      bilde4.src = alleKortBilder[dealerKort4 - 1];
      dealerKortArray.push(dealerKort4);
      document.getElementById("currentPointDealer").innerText = currentValue(
        dealerKortArray
      );
      if (currentValue(dealerKortArray) < 17) {
        setTimeout(function() {
          kort5();
        }, 1500);
      } else {
        resultat();
      }
    }
    function kort5() {
      console.log(currentValue(dealerKortArray));
      bilde5.src = alleKortBilder[dealerKort5 - 1];
      dealerKortArray.push(dealerKort5);
      document.getElementById("currentPointDealer").innerText = currentValue(
        dealerKortArray
      );
      if (currentValue(dealerKortArray) < 17) {
        setTimeout(function() {
          kort6();
        }, 1500);
      } else {
        resultat();
      }
    }
    function kort6() {
      console.log(currentValue(dealerKortArray));
      bilde6.src = alleKortBilder[dealerKort6 - 1];
      dealerKortArray.push(dealerKort6);
      document.getElementById("currentPointDealer").innerText = currentValue(
        dealerKortArray
      );
      if (currentValue(dealerKortArray) < 17) {
        setTimeout(function() {
          kort7();
        }, 1500);
      } else {
        resultat();
      }
    }
    function kort7() {
      console.log(currentValue(dealerKortArray));
      bilde7.src = alleKortBilder[dealerKort7 - 1];
      dealerKortArray.push(dealerKort7);
      document.getElementById("currentPointDealer").innerText = currentValue(
        dealerKortArray
      );
      if (currentValue(dealerKortArray) < 17) {
        setTimeout(function() {
          kort8();
        }, 1500);
      } else {
        resultat();
      }
    }
    function kort8() {
      console.log(currentValue(dealerKortArray));
      bilde8.src = alleKortBilder[dealerKort8 - 1];
      dealerKortArray.push(dealerKort8);
      document.getElementById("currentPointDealer").innerText = currentValue(
        dealerKortArray
      );
      resultat();
    }
    //tester diverse outputs med console.log
    // console.log("Andre dealersum: " + dealerSum);
    // console.log("Andre spillersum: " + spillerSum);
  }
  //resultat() sjekker resultatet, seier/tap/push og gir tilsvarende output. Oppdaterer også saldo til neste runde
  function resultat() {
    if (currentValue(dealerKortArray) > 21) {
      document.getElementById("ut1").innerHTML =
        "<br>" + "Dealer gikk over 21. Du vant!";
      saldo += innsats.value * 2;
    } else {
      if (
        currentValue(dealerKortArray) < currentValue(spillerKortArray) &&
        currentValue(spillerKortArray) < 22
      ) {
        let resultatVinn = "Gratulerer! Du vant.";
        document.getElementById("ut1").innerHTML = "<br>" + resultatVinn;
        saldo += innsats.value * 2;
      } else if (
        currentValue(dealerKortArray) == currentValue(spillerKortArray)
      ) {
        let resultatPush = "Uavgjort. Det ble push.";
        document.getElementById("ut1").innerHTML = "<br>" + resultatPush;
        saldo += innsats.value * 1;
      } else {
        let resultatTap = "Du tapte.";
        document.getElementById("ut1").innerHTML = "<br>" + resultatTap;
      }
    }
    //visSaldo() lager en nyspillknapp første runde ved hjelp av counter, alle andre runder blir knappen kun gjort synlig/usynlig
    visSaldo();
    if (nyttSpillCounter == 0) {
      nyttSpillKnapp = document.createElement("button");
      nyttSpillKnapp.innerText = "Nytt spill";
      document.body.appendChild(nyttSpillKnapp);
      nyRunde();
      nyttSpillCounter += 1;
    }
    //fjerner knappene som man spiller med mens man starter ny runde
    nyttSpillKnapp.style.visibility = "visible";
    staKnapp.style.visibility = "hidden";
    trekkNyKnapp.style.visibility = "hidden";
  }
}
//nyRunde() gjør innsats inputt og knapp tilgjenglig til en nyrunde. Tømmer også all spilldata som spillerarrays, dealerarrays samt all spillutdata som bilder og tekst.
function nyRunde() {
  nyttSpillKnapp.onclick = () => {
    document.getElementById("sjekkInnsats").disabled = false;
    document.getElementById("innsats").disabled = false;
    spillerKortArray = [];
    dealerKortArray = [];
    bilde1.src = "";
    bilde2.src = "";
    bilde3.src = "";
    bilde4.src = "";
    bilde5.src = "";
    bilde6.src = "";
    bilde7.src = "";
    bilde8.src = "";
    bilde9.src = "";
    bilde10.src = "";
    bilde11.src = "";
    bilde12.src = "";
    bilde13.src = "";
    bilde14.src = "";
    bilde15.src = "";
    bilde16.src = "";
    document.getElementById("ut1").innerHTML = "";
    document.getElementById("currentPoint").innerHTML = "";
    document.getElementById("currentPointDealer").innerHTML = "";
    //fjerner knappen til neste spillrunde
    nyttSpillKnapp.style.visibility = "hidden";
  };
}
