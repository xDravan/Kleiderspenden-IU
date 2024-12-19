//Funktion - Formulare werden durch klicken der Formularbuttons geöffnet 
function showForm(formId) {
  document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
  document.getElementById(formId).style.display = 'block';

  //Java Bootstrap Script
  (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
}

  
  
// Prüfen der PLZ, um Spende über Abholformular zu ermöglichen
  function validatePLZ() {
    const plzInput = document.getElementById('inputPLZ');
    const abholForm = document.getElementById('abholForm');
    const resultElement = document.getElementById('result');
  
    const plz = plzInput.value;
  
    // Überprüfen, ob die PLZ genau 5 Stellen hat und mit 59 beginnt
    if (plz.length === 5 && plz.startsWith('59')) {
      resultElement.textContent = "Abholbereich gültig.";
      abholForm.style.display = 'block';
    } else {
      resultElement.textContent = "Ungültiger Abholbereich. Bitte geben Sie eine Postleitzahl mit den Anfangsziffern 59 ein.";
      abholForm.style.display = 'none';
    }
  }

//AddRow Funktion 
  const maxRows = 10; // Maximale Anzahl an Zeilen
  let currentRows = 0;
  
  function addRow(tbodyId, buttonId) {
    const tbody = document.getElementById(tbodyId);
    const rows = tbody.querySelectorAll('tr');
  
    // Überprüfen, ob die maximale Zeilenanzahl erreicht ist
    if (rows.length >= maxRows) {
      alert("Maximale Anzahl an Zeilen erreicht!");
      return; // Funktion abbrechen
    }
  
    // Klonen der ersten Zeile und Anhängen
    const firstRow = tbody.querySelector('tr');
    const newRow = firstRow.cloneNode(true);
    tbody.appendChild(newRow);
  
    // Aktualisieren der Zählvariablen und Deaktivieren des Buttons
    currentRows++;
    const button = document.getElementById(buttonId);
    if (currentRows >= maxRows) {
      button.disabled = true;
    }
  
    // Optionales: Input-Felder in der neuen Zeile leeren
    newRow.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
  }


//submitForm Funktionen
/*Formularlogik per Sammelfahrzeug */

async function submitForm() {

  // Hole die Daten aus dem Formular
  const rows = document.getElementById('abholTableBody').rows;
  const donations = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const clothingType = row.cells[0].querySelector('select').value;
    const quantity = row.cells[1].querySelector('input').value;
    const destination = row.cells[2].querySelector('select').value;
    donations.push({ clothingType, quantity, destination });
  }

  // Validierung: Überprüfen, ob alle Felder ausgefüllt sind
 function validateForm() {
  // Alle erforderlichen Felder in einem Array speichern
  const requiredFields = [
    'inputVorname',
    'inputNachname',
    'inputAddress',
    'inputStadt',
    'inputState',
  ];

  // Überprüfen, ob alle Felder einen Wert haben
  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      // Feld ist leer, zeige eine Fehlermeldung (z.B. in einem modalen Fenster)
      alert('Bitte füllen Sie alle erforderlichen Felder aus.');
      return false; // Abbruch der Funktion
    }
  }

  return true; // Alle Felder sind ausgefüllt
}

  // Hole die zusätzlichen Daten
  const vorname = document.getElementById('inputVorname').value;
  const nachname = document.getElementById('inputNachname').value;
  const adresse = document.getElementById('inputAddress').value;
  const stadt = document.getElementById('inputStadt').value;
  const bundesland = document.getElementById('inputState').value;

  // Erstelle den Datenstring, inklusive der zusätzlichen Daten
  const dataString = `Vorname: ${vorname}\nNachname: ${nachname}\nAdresse: ${adresse}\nStadt: ${stadt}\nBundesland: ${bundesland}\n\n${donations.map(donation => `
    Kleidungsart: ${donation.clothingType}, Anzahl: ${donation.quantity}, Zielort: ${donation.destination}
  `).join('\n')}`;

  // Erstelle einen URL mit den Daten als Parameter
const urlParams = new URLSearchParams();
 urlParams.append('data', encodeURIComponent(dataString));
 const url = 'bestaetigung1.html?' + urlParams.toString();

 //Mit einem Delay wird der Nutzer auf die Bestaetigung1.html geleitet
 if (validateForm()) {
 await new Promise(resolve => setTimeout(resolve, 1000));
  window.location.href = url;
 }
 
 // Zeige die Bestätigung an und leite zur externen Seite weiter
 document.getElementById('donationDetails1').innerHTML = dataString.replace(/\n/g, '<br>');

}


/*Formularlogik an der Geschäftsstelle */

  async function submitForm1() {

    const message = document.getElementById('message1');
    message.style.display = 'block';

  // Hole die Daten aus dem Formular
  const rows = document.getElementById('vorOFormBody').rows;
  const donations = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const clothingType = row.cells[0].querySelector('select').value;
    const quantity = row.cells[1].querySelector('input').value;
    const destination = row.cells[2].querySelector('select').value;
    donations.push({ clothingType, quantity, destination });
  }

  const dataString = donations.map(donation => `
    Kleidungsart: ${donation.clothingType}, Anzahl: ${donation.quantity}, Zielort: ${donation.destination}
    `).join('\n');

  
 // Erstelle einen URL mit den Daten als Parameter
 const urlParams = new URLSearchParams();
 urlParams.append('data', encodeURIComponent(dataString));
 const url = 'bestaetigung.html?' + urlParams.toString();

 //Mit einem Delay wird der Nutzer auf die Bestaetigung.html geleitet
 await new Promise(resolve => setTimeout(resolve, 5000));
  window.location.href = url;
 
 // Zeige die Bestätigung an und leite zur externen Seite weiter
 document.getElementById('message1').style.display = 'block';
 document.getElementById('donationDetails').innerHTML = dataString.replace(/\n/g, '<br>');

}

