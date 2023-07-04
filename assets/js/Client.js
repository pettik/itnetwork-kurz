'use strict';

class Client {
  constructor(id, name, surname, age, phoneNumber) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.phoneNumber = phoneNumber;
  }

  toString() {
    return `<tr>
<td >${this.id}</td><td>${this.name} ${this.surname}</td> <td>${this.phoneNumber}</td> <td>${this.age}</td></tr>`;
  }
}
