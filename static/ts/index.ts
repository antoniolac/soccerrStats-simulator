// Definizione dell'interfaccia Giocatore
interface Giocatore {
    id: number;
    nome: string;
    ruolo: Ruolo;
    goal: number;
    assist: number;
    partiteGiocate: number;
}

// Enum per il ruolo dei giocatori
enum Ruolo {
    Portiere = "Portiere",
    Difensore = "Difensore",
    Centrocampista = "Centrocampista",
    Attaccante = "Attaccante"
}

// Simulazione dei dati della squadra
const datiGiocatori: Giocatore[] = [
    { id: 1, nome: "Gianluigi Donnarumma", ruolo: Ruolo.Portiere, goal: 0, assist: 0, partiteGiocate: 30 },
    { id: 2, nome: "Giovanni Di Lorenzo", ruolo: Ruolo.Difensore, goal: 1, assist: 3, partiteGiocate: 28 },
    { id: 3, nome: "Nicolo Barella", ruolo: Ruolo.Centrocampista, goal: 4, assist: 6, partiteGiocate: 29 },
    { id: 4, nome: "Federico Chiesa", ruolo: Ruolo.Attaccante, goal: 7, assist: 5, partiteGiocate: 25 },
    { id: 5, nome: "Ciro Immobile", ruolo: Ruolo.Attaccante, goal: 12, assist: 4, partiteGiocate: 27 }
];

// Simulazione API con delay di 2 secondi
function fetchGiocatori(): Promise<Giocatore[]> {
    return new Promise(resolve => {
        setTimeout(() => resolve(datiGiocatori), 2000);
    });
}

// Classe Squadra
class Squadra {
    nome: string;
    giocatori: Giocatore[] = [];
    stato: string = "Caricamento dati...";

    constructor(nome: string) {
        this.nome = nome;
    }

    aggiornaGiocatori(): void {
        this.stato = "Caricamento dati...";
        this.render();

        fetchGiocatori().then(giocatori => {
            this.giocatori = giocatori;
            this.stato = "Dati caricati con successo!";
            this.render();
        });
    }

    private render(): void {
        const statoElemento = document.getElementById("statoRichiesta");
        const tabellaCorpo = document.getElementById("giocatoriTabella");

        if (statoElemento) statoElemento.textContent = this.stato;
        if (tabellaCorpo) {
            tabellaCorpo.innerHTML = "";
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

document.getElementById("aggiornaDati")?.addEventListener("click", () => {
    squadra.aggiornaGiocatori();
});

// Caricamento iniziale
squadra.aggiornaGiocatori();