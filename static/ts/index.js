// Simulazione dei dati della squadra
const datiGiocatori = [
    { id: 1, nome: "Boris Radunovic", ruolo: "Portiere", goal: 0, assist: 0, partiteGiocate: 30 },
    { id: 2, nome: "Valerio Di Cesare", ruolo: "Difensore", goal: 1, assist: 3, partiteGiocate: 28 },
    { id: 3, nome: "Mattia Maita", ruolo: "Centrocampista", goal: 4, assist: 6, partiteGiocate: 29 },
    { id: 4, nome: "Andrea Favilli", ruolo: "Attaccante", goal: 7, assist: 5, partiteGiocate: 25 },
    { id: 5, nome: "Nicholas Bonfanti", ruolo: "Attaccante", goal: 12, assist: 4, partiteGiocate: 27 }
];

// Simulazione API con delay di 2 secondi
function fetchGiocatori() {
    return new Promise(resolve => {
        setTimeout(() => resolve(datiGiocatori), 2000);
    });
}

// Classe Squadra
class Squadra {
    constructor(nome) {
        this.nome = nome;
        this.giocatori = [];
        this.stato = "Caricamento dati...";
    }

    aggiornaGiocatori() {
        this.stato = "Caricamento dati...";
        this.render();

        fetchGiocatori().then(giocatori => {
            this.giocatori = giocatori;
            this.stato = "Dati caricati con successo!";
            this.render();
        }).catch(error => {
            this.stato = "Errore nel caricamento dei dati";
            this.render();
            console.error(error); // Log dell'errore in caso di fallimento
        });
    }

    render() {
        const statoElemento = document.getElementById("statoRichiesta");
        const tabellaCorpo = document.getElementById("giocatoriTabella");

        if (statoElemento) statoElemento.textContent = this.stato;
        if (tabellaCorpo) {
            tabellaCorpo.innerHTML = ""; // Pulisce la tabella prima di renderizzare i dati
            this.giocatori.forEach(giocatore => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${giocatore.nome}</td>
                    <td>${giocatore.ruolo}</td>
                    <td>${giocatore.goal}</td>
                    <td>${giocatore.assist}</td>
                    <td>${giocatore.partiteGiocate}</td>
                `;
                tabellaCorpo.appendChild(row);
            });
        }
    }
}

// Creazione e gestione della squadra
const squadra = new Squadra("Italia");

// Gestione dell'evento click per aggiornare i dati
const bottoneAggiorna = document.getElementById("aggiornaDati");
if (bottoneAggiorna) {
    bottoneAggiorna.addEventListener("click", () => {
        squadra.aggiornaGiocatori();
    });
}

// Caricamento iniziale dei dati
squadra.aggiornaGiocatori();
