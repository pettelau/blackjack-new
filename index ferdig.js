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
  connection.query("SELECT * FROM Leaderboard ORDER BY score DESC;", (error, results) => {
    if (error) return console.error(error);
    for (let player of results) {
      if (counter < 5) {
        leaderboardList.innerHTML += "<li>" + player.username + ": " + player.score + "%" + "</li>";
      }
      counter += 1;
    }
  });
  console.log("nicneb");
}

let spillerTreff = 0;
loggInnKnapp.onclick = () => {
  emailLoggInn.disabled = true;
  connection.query("SELECT * FROM Leaderboard", (error, results) => {
    if (error) return console.error(error);
    for (let spiller of results) {
      if (spiller.email == emailLoggInn.value) {
        saldo = spiller.score * 10;
        spillerTreff += 1;
        visSaldo();
        stuff.style.visibility = "visible";
        loggInnKnapp.style.visibility = "hidden";
      }
    }
    if (spillerTreff == 0) {
      alert("Finner ikke brukeren i databasen. Prøv igjen.");
      emailLoggInn.disabled = false;
    }
  });
};
leggtilbruker.onclick = () => {
  if (brukernavnNy.value !== emailNy.value) {
    connection.query("INSERT INTO Leaderboard (username, email, score) VALUES (?, ?, ?)", [
      brukernavnNy.value,
      emailNy.value,
      100
    ]);
  }
};

let alleKort = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let alleKortValue = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let alleKortPoeng = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
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
];

//test
let dealerKort1;
let dealerKort2;
let dealerKort3;
let dealerKort4;
let dealerKort5;
let dealerKort6;
let dealerKort7;
let dealerKort8;

let spillerKort1;
let spillerKort2;
let spillerKort3;
let spillerKort4;
let spillerKort5;
let spillerKort6;
let spillerKort7;
let spillerKort8;

let trekkNyKnapp;
let staKnapp;
let nyttSpillKnapp;

let nyttSpillCounter = 0;
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
  document.getElementById("saldo").innerText = "Saldo: " + parseInt(saldo);
  connection.query("UPDATE Leaderboard SET score=? WHERE username=?", [
    (parseInt(saldo) / 1000) * 100,
    emailLoggInn.value
  ]);
  leaderboardfunc();
  counter = 0;
  leaderboardList.innerHTML = "";
}

sjekkInnsatsKnapp.onclick = () => {
  if (innsats.value > saldo || saldo < 0) {
    alert("Innsatsen overskrider saldoen din");
    document.getElementById("oppstart").style.visibility = "hidden";
  } else {
    document.getElementById("oppstart").style.visibility = "visible";
    document.getElementById("sjekkInnsats").disabled = true;
    document.getElementById("innsats").disabled = true;
  }
};
var spillerKortArray;
oppstartKnapp.onclick = () => {
  saldo = saldo - innsats.value;
  visSaldo();
  console.log("saldo: " + saldo);
  console.log(innsats.value);
  dealerKort1 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort2 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort3 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort4 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort5 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort6 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort7 = alleKort[Math.floor(Math.random() * 13)];
  dealerKort8 = alleKort[Math.floor(Math.random() * 13)];

  spillerKort1 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort2 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort3 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort4 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort5 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort6 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort7 = alleKort[Math.floor(Math.random() * 13)];
  spillerKort8 = alleKort[Math.floor(Math.random() * 13)];

  spillerKortArray = [spillerKort1, spillerKort2];

  bilde1.src = alleKortBilder[dealerKort1 - 1];
  document.getElementById("currentPointDealer").innerHTML = alleKortPoeng[dealerKort1 - 1];

  bilde9.src = alleKortBilder[spillerKort1 - 1];
  bilde10.src = alleKortBilder[spillerKort2 - 1];

  if (runderSpilt == 0) {
    trekkNyKnapp = document.createElement("button");
    trekkNyKnapp.innerHTML = "Trekk nytt kort";
    document.body.appendChild(trekkNyKnapp);

    staKnapp = document.createElement("button");
    staKnapp.innerHTML = "Stå";
    document.body.appendChild(staKnapp);

    runderSpilt++;
  }

  staKnapp.style.visibility = "visible";
  trekkNyKnapp.style.visibility = "visible";

  steg2();
};

function currentValueold(trukkedeKort) {
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
}
function aceToBack(a, b) {
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
  trukkedeKort.sort(aceToBack);
  let sum = 0;
  for (let i = 0; i < trukkedeKort.length; i++) {
    if (trukkedeKort[i] != 1) {
      sum += parseInt(alleKortPoeng[trukkedeKort[i] - 1]);
    } else {
      if (typeof trukkedeKort[i + 1] != "undefined") {
        sum += 1;
      } else {
        if (sum + 11 >= 22) {
          sum += 1;
        } else {
          sum += 11;
        }
      }
    }
  }
  console.log(sum);
  console.log(trukkedeKort);
  return sum;
}

function steg2() {
  let at = 0;
  document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);
  if (currentValue(spillerKortArray) == 21) {
    setTimeout(function() {
      alert("Blackjack babyyyyy");
    }, 500);
    staFunksjon();
    saldo += innsats.value * 0.5;
    visSaldo();
  }

  trekkNyKnapp.onclick = () => {
    trekkFunksjon();
  };
  function trekkFunksjon() {
    if (at == 0) {
      bilde11.src = alleKortBilder[spillerKort3 - 1];
      spillerKortArray.push(spillerKort3);
      document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);
      if (currentValue(spillerKortArray) > 21) {
        resultat(dealerKortArray);
      }
    }
    if (at == 1) {
      bilde12.src = alleKortBilder[spillerKort4 - 1];
      spillerKortArray.push(spillerKort4);
      document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);
      if (currentValue(spillerKortArray) > 21) {
        resultat(dealerKortArray);
      }
    }
    if (at == 2) {
      bilde13.src = alleKortBilder[spillerKort5 - 1];
      spillerKortArray.push(spillerKort4);
      document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);

      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    if (at == 3) {
      bilde14.src = alleKortBilder[spillerKort6 - 1];
      spillerKortArray.push(spillerKort5);
      document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);
      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    if (at == 4) {
      bilde15.src = alleKortBilder[spillerKort7 - 1];
      spillerKortArray.push(spillerKort6);
      document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);
      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    if (at == 5) {
      bilde16.src = alleKortBilder[spillerKort8 - 1];
      spillerKortArray.push(spillerKort7);
      document.getElementById("currentPoint").innerText = currentValue(spillerKortArray);
      if (currentValue(spillerKortArray) > 21) {
        resultat(spillerKortArray);
      }
    }
    at++;

    console.log(spillerSum);
  }

  staKnapp.onclick = () => {
    staFunksjon();
  };
  function staFunksjon() {
    bilde2.src = alleKortBilder[dealerKort2 - 1];
    dealerKortArray = [dealerKort1, dealerKort2];
    document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
    let dealerSum = alleKortPoeng[dealerKort1 - 1] + alleKortPoeng[dealerKort2 - 1];

    if (currentValue(dealerKortArray) < 17) {
      setTimeout(function() {
        kort3();
      }, 1500);
      function kort3() {
        console.log(currentValue(dealerKortArray));
        bilde3.src = alleKortBilder[dealerKort3 - 1];
        dealerKortArray.push(dealerKort3);
        document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
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
      document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
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
      document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
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
      document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
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
      document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
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
      document.getElementById("currentPointDealer").innerText = currentValue(dealerKortArray);
    }
    console.log("Andre dealersum: " + dealerSum);
    console.log("Andre spillersum: " + spillerSum);
  }
  function resultat() {
    if (currentValue(dealerKortArray) > 21) {
      document.getElementById("ut1").innerHTML = "<br>" + "Dealer gikk over 21. Du vant!";
      saldo += innsats.value * 2;
    } else {
      if (currentValue(dealerKortArray) < currentValue(spillerKortArray) && currentValue(spillerKortArray) < 22) {
        let resultatVinn = "Gratulerer! Du vant.";
        document.getElementById("ut1").innerHTML = "<br>" + resultatVinn;
        saldo += innsats.value * 2;
      } else if (currentValue(dealerKortArray) == currentValue(spillerKortArray)) {
        let resultatPush = "Uavgjort. Det ble push.";
        document.getElementById("ut1").innerHTML = "<br>" + resultatPush;
        saldo += innsats.value * 1;
      } else {
        let resultatTap = "Du tapte.";
        document.getElementById("ut1").innerHTML = "<br>" + resultatTap;
      }
    }
    visSaldo();
    if (nyttSpillCounter == 0) {
      nyttSpillKnapp = document.createElement("button");
      nyttSpillKnapp.innerText = "Nytt spill";
      document.body.appendChild(nyttSpillKnapp);
      nyRunde();
      nyttSpillCounter += 1;
    }
    nyttSpillKnapp.style.visibility = "visible";
    staKnapp.style.visibility = "hidden";
    trekkNyKnapp.style.visibility = "hidden";
  }
}
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

    nyttSpillKnapp.style.visibility = "hidden";
  };
}
