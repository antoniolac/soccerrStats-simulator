
// Enum per i ruoli
enum Ruolo {
  Portiere = "Portiere",
  Difensore = "Difensore",
  Centrocampista = "Centrocampista",
  Attaccante = "Attaccante"
}

// Stato della richiesta
enum StatoRichiesta {
  Caricamento = "Caricamento dati...",
  Successo = "Dati caricati con successo",
  Errore = "Errore nel caricamento dei dati"
}

// Interfaccia Giocatore
interface Giocatore {
  id: number;
  nome: string;
  ruolo: Ruolo;
  goal: number;
  assist: number;
  partiteGiocate: number;
}

// Simulazione chiamata API
function fetchGiocatori(): Promise<Giocatore[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // Simula un'API che fallisce il 10% delle volte
        resolve([
          { id: 1, nome: "Valerio Di Cesare", ruolo: Ruolo.Portiere, goal: 0, assist: 0, partiteGiocate: 30 },
          { id: 2, nome: "Valerio Di Cesare", ruolo: Ruolo.Difensore, goal: 5, assist: 3, partiteGiocate: 28 },
          { id: 3, nome: "Nicolo Barella", ruolo: Ruolo.Centrocampista, goal: 4, assist: 6, partiteGiocate: 29 },
          { id: 4, nome: "Federico Chiesa", ruolo: Ruolo.Attaccante, goal: 7, assist: 5, partiteGiocate: 25 },
          { id: 5, nome: "Ciro Immobile", ruolo: Ruolo.Attaccante, goal: 12, assist: 4, partiteGiocate: 27 }
        ]);
      } else {
        reject("Errore nel caricamento dei dati");
      }
    }, 2000);
  });
}

// Classe Squadra
class Squadra {
  nome: string;
  giocatori: Giocatore[] = [];
  stato: StatoRichiesta = StatoRichiesta.Caricamento;

  constructor(nome: string) {
    this.nome = nome;
  }

  aggiornaGiocatori(): void {
    this.stato = StatoRichiesta.Caricamento;
    this.render();

    fetchGiocatori()
      .then((giocatori) => {
        this.giocatori = giocatori;
        this.stato = StatoRichiesta.Successo;
        this.render();
      })
      .catch(() => {
        this.stato = StatoRichiesta.Errore;
        this.render();
      });
  }

  private render(): void {
    const container = document.getElementById("contenitore");
    if (!container) return;

    container.innerHTML = `<h1>${this.nome}</h1>`;
    container.innerHTML += `<p>${this.stato}</p>`;

    if (this.stato === StatoRichiesta.Successo) {
      const table = document.createElement("table");
      table.innerHTML = `
        <tr>
          <th>Nome</th>
          <th>Ruolo</th>
          <th>Goal</th>
          <th>Assist</th>
          <th>Partite Giocate</th>
        </tr>
      `;
      this.giocatori.forEach(giocatore => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${giocatore.nome}</td>
          <td>${giocatore.ruolo}</td>
          <td>${giocatore.goal}</td>
          <td>${giocatore.assist}</td>
          <td>${giocatore.partiteGiocate}</td>
        `;
        table.appendChild(row);
      });
      container.appendChild(table);
    }
  }
}

// Creazione della squadra e gestione eventi
const squadra = new Squadra("Italia");
document.getElementById("aggiornaDati")?.addEventListener("click", () => squadra.aggiornaGiocatori());
squadra.aggiornaGiocatori();
