const gridAutoContainer = document.getElementById("grid-autocontainer");

let templateIndex = 1;
let templateName = "template" + templateIndex;
const cellsAuto = [];

// Erstellen Sie das Raster
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const cellAuto = document.createElement("div");
    cellAuto.classList.add("cellAuto");
    gridAutoContainer.appendChild(cellAuto);
    cellsAuto.push(cellAuto);
  }
}

function applyTemplateToAutoContainer(templateName) {
  // Funktion zum Anwenden einer Vorlage auf grid-autocontainer

  fetch("templates.json")
    .then((response) => response.json())
    .then((templates) => {
      const template = templates[templateName];
      if (template) {
        const cellsAuto = gridAutoContainer.querySelectorAll(".cellAuto");
        cellsAuto.forEach((cellAuto, index) => {
          cellAuto.style.backgroundColor = template[index];
        });
      }
    })
    .catch((error) => {
      console.error("Fehler beim Laden der Vorlagen: " + error);
    });
}

applyTemplateToAutoContainer(templateName);

const cells = [];

function initializeGrids() {
  const gridContainer = document.getElementById("grid-container");

  // Zurücksetzen der Hintergrundfarben auf "white" für alle Zellen in cells
  cells.forEach((cellObj) => {
    const cell = cellObj.element;
    cell.style.backgroundColor = "white";
    cellObj.color = "white";
  });

  // Erstellen Sie das Raster
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridContainer.appendChild(cell);
      cell.style.backgroundColor = "white";
      cells.push({ element: cell, color: "white" }); // Jede Zelle und ihre Hintergrundfarbe
    }
  }

  // Fügen Sie die Klick-Funktionalität hinzu
  cells.forEach((cellObj) => {
    const cell = cellObj.element;

    cell.addEventListener("click", () => {
      if (cellObj.color === "white") {
        // Wenn die Zelle weiß ist, mache sie blau
        cell.style.backgroundColor = "blue";
        cellObj.color = "blue";
      } else if (cellObj.color === "blue") {
        // Wenn die Zelle blau ist, mache sie grün
        cell.style.backgroundColor = "green";
        cellObj.color = "green";
      } else if (cellObj.color === "green") {
        // Wenn die Zelle grün ist, mache sie gelb
        cell.style.backgroundColor = "yellow";
        cellObj.color = "yellow";
      } else {
        // Wenn die Zelle gelb ist, setze sie zurück
        cell.style.backgroundColor = "white";
        cellObj.color = "white";
      }
    });
  });
}
// Funktion zum Vergleichen der Raster
function compareGrids() {
  const gridContainer = document.getElementById("grid-container");
  const gridAutoContainer = document.getElementById("grid-autocontainer");

  const cells = Array.from(gridContainer.querySelectorAll(".cell"));
  const cellsAuto = Array.from(gridAutoContainer.querySelectorAll(".cellAuto"));

  if (arraysAreEqual(cellsAuto, cells)) {
    console.log("Gleicher Inhalt");
    templateIndex += 1;
    templateName = "template" + templateIndex;
    applyTemplateToAutoContainer(templateName);
  } else {
    console.log("Unterschiedlicher Inhalt");
    console.log(cellsAuto);
    console.log(cells);
  }
}

// Funktion zum Vergleichen der Arrays
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    // Überprüfen, ob arr2[i] definiert ist und eine style-Eigenschaft hat
    if (
      arr2[i] &&
      arr2[i].style &&
      arr1[i].style.backgroundColor !== arr2[i].style.backgroundColor
    ) {
      return false;
    }
  }

  return true;
}

// Event-Handler für den Button-Klick
const checkButton = document.getElementById("check");
checkButton.addEventListener("click", compareGrids);

initializeGrids();
