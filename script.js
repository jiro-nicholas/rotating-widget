'use strict';

const tableBody = document.getElementById('table-body');

let flights = [
  {
    time: '08:11',
    destination: 'OMAN',
    flight: '0X 203',
    gate: ' A 01',
    remarks: 'ON TIME',
  },
  {
    time: '12:39',
    destination: 'LONDON',
    flight: 'CL 320',
    gate: ' C 31',
    remarks: 'CANCELLED',
  },
  {
    time: '13:21',
    destination: 'DUBAI',
    flight: 'DXB 201',
    gate: ' A 19',
    remarks: 'CANCELLED',
  },
  {
    time: '14:01',
    destination: 'FRANKFURT',
    flight: 'FR 402',
    gate: ' B 02',
    remarks: 'ON TIME',
  },
  {
    time: '04:19',
    destination: 'LAGOS',
    flight: 'LG 419',
    gate: ' D 19',
    remarks: 'DEY-PRAY',
  },
  {
    time: '15:22',
    destination: 'TOKYO',
    flight: 'TK 211',
    gate: ' A 32',
    remarks: 'DELAYED',
  },
];

const destinations = [
  'TOKYO',
  'FRANKFURT',
  'DUBAI',
  'LAGOS',
  'LONDON',
  'OMAN',
  'BEIRUT',
];
const remarks = ['ON TIME', 'DELAYED', 'CANCELLED', 'DEY-PRAY'];
let hour = 15;

function populateTable() {
  for (const flight of flights) {
    const tableRow = document.createElement('tr');

    //since these are objects, we are goin to use for in, to loop inside the object  - we are going to get the flight detail, each property in the object is a flight detail
    for (const flightDetail in flight) {
      const tableCell = document.createElement('td');
      //   console.log('flight: ', flight);
      //   console.log('flightDetail: ', flightDetail);
      //   console.log('flight[flightDetail]: ', flight[flightDetail]); //this is important to know, so the flight[flightDetail] is basiically getting the flight property values.
      //   tableCell.innerText = flight[flightDetail];
      const word = Array.from(flight[flightDetail]); //This is an array of the letters of each key and value
      console.log(word);

      //   for (const letter of word) {
      for (const [index, letter] of word.entries()) {
        //using entrie, so that we can enable the timeout function
        const letterElement = document.createElement('div');

        setTimeout(() => {
          letterElement.classList.add('flip');
          letterElement.textContent = letter;
          tableCell.append(letterElement);
        }, 100 * index);
        // letterElement.classList.add('flip');
        // letterElement.textContent = letter;
        // tableCell.append(letterElement);
      }

      tableRow.append(tableCell);
    }

    tableBody.append(tableRow); //this appends the tableRow into our tableBody, so each time flignt of flights loops, it takes the current flight and inserts it into the table Body
  }
}

populateTable();

function generateRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generateRandomNumber(maxNumber) {
  const numbers = '0123456789';
  if (maxNumber) {
    const newNumbers = numbers.slice(0, maxNumber + 1);
    return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length));
  }
  return numbers.charAt(Math.floor(Math.random() * numbers.length));
}

function generateTime() {
  let displayHour = hour;

  if (hour < 24) {
    hour++;
  }
  if (hour >= 24) {
    hour = 1;
    displayHour = hour;
  }
  if (hour < 10) {
    displayHour = '0' + hour;
  }

  return displayHour + ':' + generateRandomNumber(5) + generateRandomNumber();
}

function shuffleUp() {
  flights.shift();
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight:
      generateRandomLetter() +
      generateRandomLetter() +
      ' ' +
      generateRandomNumber() +
      generateRandomNumber(),
    gate:
      generateRandomLetter() +
      ' ' +
      generateRandomNumber() +
      generateRandomNumber(),
    remarks: remarks[Math.floor(Math.random() * remarks.length)],
  });

  tableBody.textContent = '';
  populateTable();
}

setInterval(shuffleUp, 2000);
