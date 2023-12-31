'use strict';

class InsuranceApp {
  constructor(language = 'cs-CZ') {
    this.language = language;
    this.clients = this.loadClientsFromLocalStorage();

    // DOM elements
    this.moon = document.getElementById('change-theme-moon');
    this.sun = document.getElementById('change-theme-sun');
    this.mainTable = document.getElementById('main-table');
    this.nameInput = document.getElementById('name');
    this.surnameInput = document.getElementById('surname');
    this.ageInput = document.getElementById('age');
    this.phoneInput = document.getElementById('phone');
    this.sendNewClientBtn = document.getElementById('sendNewClient');
    this.clientListDiv = document.getElementById('client-list');
    this.formular = document.getElementById('formular');
    this.counter = this.calculateIdCounter();
    this.clientCounterh2 = document.getElementById('clientCounterh2');

    this.loadDataButton = document.getElementById('loadData');
    this.flushButton = document.getElementById('flush');

    this.setEvents();
  }

  setEvents() {
    // Show the client list
    this.formular.addEventListener('submit', e => {
      e.preventDefault();
      this.validateForm();
    });

    // delete table data and localStorage
    this.flushButton.onclick = () => {
      localStorage.clear();
      this.clients = [];
      this.mainTable.innerHTML = '';
      this.counter = this.calculateIdCounter();
      this.listClients();
      // Show the client list
      this.clientListDiv.classList.remove('visible'); //if you want to hide FORM element
    };

    // load default data
    this.loadDataButton.onclick = () => {
      this.loadTestingData();
      this.listClients();
      this.calculateIdCounter();
      location.reload();
    };

    // change theme to dark
    this.moon.onclick = () => {
      this.moon.classList.add('nonvisible');
      this.sun.classList.remove('nonvisible');
      document.body.classList.add('dark');
    };
    this.sun.onclick = () => {
      this.sun.classList.add('nonvisible');
      this.moon.classList.remove('nonvisible');
      document.body.classList.remove('dark');
    };
  }

  validateForm() {
    const nameInput = this.nameInput.value;
    const surnameInput = this.surnameInput.value;
    const ageInput = parseInt(this.ageInput.value);
    const phoneInput = this.phoneInput.value;

    // Reset error messages
    const errorMessages = document.getElementsByClassName('error-message');
    for (let i = 0; i < errorMessages.length; i++) {
      errorMessages[i].style.visibility = 'hidden';
    }

    const inputBorders = document.getElementsByClassName('user-input');
    for (let i = 0; i < inputBorders.length; i++) {
      inputBorders[i].classList.remove('red-border');
    }

    let valid = true;

    // Validate name
    if (nameInput.length < 2) {
      this.showErrorMessage('error-name');
      this.nameInput.classList.add('red-border');
      valid = false;
    }

    // Validate surname
    if (surnameInput.length < 2) {
      this.showErrorMessage('error-surname');
      this.surnameInput.classList.add('red-border');
      valid = false;
    }

    // Validate age
    if (isNaN(ageInput) || ageInput < 0 || ageInput > 169) {
      this.showErrorMessage('error-age');
      this.ageInput.classList.add('red-border');
      valid = false;
    }

    // Validate phone number
    if (
      !/^(\d{3}\s\d{3}\s\d{3}|\d{9}|\+\d{3}\s\d{3}\s\d{3}|\+\d{12})$/.test(
        phoneInput.trim()
      )
    ) {
      this.showErrorMessage('error-phone');
      this.phoneInput.classList.add('red-border');
      valid = false;
    }

    //note to this conditions
    // ^ a $ odpovídají začátku a konci řetězce.
    // \d{3} odpovídá přesně třem číslicím.
    // \s odpovídá jednomu prázdnému znaku.
    // | je operátor alternace, který umožňuje shodu více alternativ.
    // První alternativou je \d{3}\s\d{3}\s\d{3}, který odpovídá formátu "ABC DEF GHI" (tři skupiny po třech číslicích oddělené mezerami).
    // Druhou alternativou je \d{9}, který odpovídá formátu "ABCDEFGHI" (devět číslic bez mezer).
    // Třetí alternativou je \+\d{3}\s\d{3}\s\d{3}, který odpovídá formátu „+420 ABC DEF GHI“ (kód země začínající „+“ následovaný třemi skupinami tři číslice oddělené mezerami).
    // Čtvrtá alternativa je \+\d{12}, která odpovídá formátu „+420ABCDEFGHI“ (kód země začínající „+“ následovaný dvanácti číslicemi bez mezer).

    if (valid) {
      const client = new Client(
        this.counter++,
        nameInput,
        surnameInput,
        ageInput,
        this.parsePhoneNumber()
      );
      this.clients.push(client);
      this.saveClientsToLocalStorage();
      this.listClients();
      this.refreshInputs();
    }
  }

  showErrorMessage(errorId) {
    const errorMessage = document.getElementsByClassName(errorId)[0];
    errorMessage.style.visibility = 'visible';
  }

  // parse phonenumber input
  parsePhoneNumber() {
    let tempNumber = this.phoneInput.value.replace(/\s/g, '').trim();
    if (tempNumber.startsWith('+420')) {
      tempNumber = tempNumber.substring(4);
    }
    const newPhoneNumber = tempNumber.match(/.{1,3}/g).join(' ');
    return newPhoneNumber;
  }

  // SORTING CLIENTS BY NAME  //BIG CHANGES
  sortClientsByName() {
    this.clients.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  // SORTING CLIENTS BY SURNAME   //BIG CHANGES
  sortClientsBySurname() {
    const collator = new Intl.Collator('cs', { sensitivity: 'base' });

    this.clients.sort((a, b) => {
      const surnameA = a.surname;
      const surnameB = b.surname;

      return collator.compare(surnameA, surnameB);
    });
  }

  // SORTING CLIENTS BY ID
  sortClientsById() {
    this.clients.sort((a, b) => {
      return a.id - b.id;
    });
  }

  // SORTING CLIENTS BY AGE
  sortClientsByAge() {
    this.clients.sort((a, b) => {
      return a.age - b.age;
    });
  }

  // SORTING CLIENTS BY PHONE NUMBER
  sortClientsByPhoneNumber() {
    this.clients.sort((a, b) => {
      const phoneNumberA = parseInt(a.phoneNumber.replace(/\s/g, ''));
      const phoneNumberB = parseInt(b.phoneNumber.replace(/\s/g, ''));
      return phoneNumberA - phoneNumberB;
    });
  }

  listClients() {
    this.mainTable.innerHTML = '';
    this.clientCounterh2.value = '0';
    this.mainTable.innerHTML += `
<thead>
<th id="th-id">ID</th>
<th><span id="th-name">Jméno</span> a <span id="th-surname">příjmení</span></th>

<th id="th-phone">Telefon</th>
<th id="th-age">Věk</th>
<th>Smazat</th>
</thead>`; //BIG CHANGES

    if (localStorage.clients == undefined || this.clients.length === 0) {
      this.mainTable.innerHTML += `<p class="empty-message">Zatím tady není žádný pojištěnec <img
src="assets/img/user-unfollow-line.svg"
class="user-icon"
alt="user icon"
/></p>`;
    }

    this.thId = document.getElementById('th-id');
    this.thName = document.getElementById('th-name');
    this.thSurname = document.getElementById('th-surname');
    this.thAge = document.getElementById('th-age');
    this.thPhone = document.getElementById('th-phone');
    this.sortingElements = [
      this.thId,
      this.thName,
      this.thSurname,
      this.thPhone,
      this.thAge,
    ];

    // SORTING CLIENTS BY NAME //BIG CHANGES
    this.thName = document.getElementById('th-name'); //BIG CHANGES
    this.thName.addEventListener('click', () => {
      //BIG CHANGES

      this.sortClientsByName(); //BIG CHANGES
      this.listClients(); //BIG CHANGES
      this.styleReset();
      this.thName.classList.add('oranged');
    });

    // SORTING CLIENTS BY SURNAME //BIG CHANGES
    this.thSurname = document.getElementById('th-surname'); //BIG CHANGES
    this.thSurname.addEventListener('click', () => {
      //BIG CHANGES
      this.sortClientsBySurname(); //BIG CHANGES
      this.listClients(); //BIG CHANGES
      this.styleReset();
      this.thSurname.classList.add('oranged');
    });

    // SORTING CLIENTS BY ID
    this.thId = document.getElementById('th-id');
    this.thId.addEventListener('click', () => {
      this.sortClientsById();
      this.listClients();
      this.styleReset();
      this.thId.classList.add('oranged');
    });

    // SORTING CLIENTS BY AGE
    this.thAge = document.getElementById('th-age');
    this.thAge.addEventListener('click', () => {
      this.sortClientsByAge();
      this.listClients();
      this.styleReset();
      this.thAge.classList.add('oranged');
    });

    // SORTING CLIENTS BY PHONE NUMBER
    this.thPhone = document.getElementById('th-phone');
    this.thPhone.addEventListener('click', () => {
      this.sortClientsByPhoneNumber();
      this.listClients();
      this.styleReset();
      this.thPhone.classList.add('oranged');
    });

    // Add new rows for each client
    this.clients.forEach(client => {
      const row = document.createElement('tr');
      row.innerHTML = client.toString();

      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML =
        '<img src="assets/img/close-circle-line.svg" class="delete-icon" alt="delete image">';
      deleteButton.addEventListener('click', () => {
        this.deleteClient(client);
      });

      // Create a new cell for the delete button
      const deleteCell = document.createElement('td');
      deleteCell.appendChild(deleteButton);

      // Append the delete cell to the row
      row.appendChild(deleteCell);

      // Append the row to the table
      this.mainTable.appendChild(row);
    });

    // Show the client list
    this.clientListDiv.classList.add('visible');

    this.clientCounterh2.innerHTML = this.clients.length;
  }

  styleReset() {
    for (const element of this.sortingElements) {
      element.classList.add('white');
    }
  }

  saveClientsToLocalStorage() {
    localStorage.setItem('clients', JSON.stringify(this.clients));
    localStorage.setItem('counter', this.counter);
  }

  loadClientsFromLocalStorage() {
    const clientsData = JSON.parse(localStorage.getItem('clients'));
    return clientsData
      ? clientsData.map(
          data =>
            new Client(
              data.id,
              data.name,
              data.surname,
              data.age,
              data.phoneNumber
            )
        )
      : [];
  }

  calculateIdCounter() {
    const counter = localStorage.getItem('counter');
    return counter ? parseInt(counter) : 1;
  }

  deleteClient(client) {
    const index = this.clients.findIndex(c => c.id === client.id);
    if (index !== -1) {
      this.clients.splice(index, 1);
      this.saveClientsToLocalStorage();
      this.listClients();
    }
  }

  refreshInputs() {
    this.nameInput.value = '';
    this.surnameInput.value = '';
    this.ageInput.value = '';
    this.phoneInput.value = '';
  }

  loadTestingData() {
    this.clients = [
      {
        id: 1,
        name: 'Jarda',
        surname: 'Čeperka',
        age: '44',
        phoneNumber: '777 848 741',
      },
      {
        id: 2,
        name: 'Andreas',
        surname: 'Novotný',
        age: '31',
        phoneNumber: '731 785 444',
      },
      {
        id: 3,
        name: 'Jarmila',
        surname: 'Koukalovic',
        age: '22',
        phoneNumber: '605 454 777',
      },
      {
        id: 4,

        name: 'Veronika',
        surname: 'Kovářová',
        age: '30',
        phoneNumber: '607 578 646',
      },
      {
        id: 5,
        name: 'Johanes',
        surname: 'Keitl',
        age: '18',
        phoneNumber: '777 484 684',
      },
      {
        id: 6,
        name: 'Karel',
        surname: 'Zámečník',
        age: '44',
        phoneNumber: '605 444 847',
      },
      {
        id: 7,
        name: 'Lucie',
        surname: 'Nováková',
        age: '27',
        phoneNumber: '602 123 456',
      },
      {
        id: 8,
        name: 'Pavel',
        surname: 'Svoboda',
        age: '39',
        phoneNumber: '777 987 654',
      },
      {
        id: 9,
        name: 'Eva',
        surname: 'Křížová',
        age: '33',
        phoneNumber: '604 555 888',
      },
      {
        id: 10,
        name: 'Martin',
        surname: 'Dvořák',
        age: '45',
        phoneNumber: '733 111 222',
      },
      {
        id: 11,
        name: 'Jaroslav',
        surname: 'Novák',
        age: '28',
        phoneNumber: '608 999 333',
      },
    ];
    this.counter = this.clients.length + 1;
    this.saveClientsToLocalStorage();
    this.listClients();
  }
}
