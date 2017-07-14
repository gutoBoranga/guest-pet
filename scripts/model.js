// import {UserMode} from "enums";

class User {
	constructor(name, email, senha, city, birthDate, isHostUser, isOwnerUser, isFiscalUser) {
		this.name = name;
		this.email = email;
		this.senha = senha;
		this.city = city;
		this.birthDate = birthDate;
		
		this.isHostUser = isHostUser;
		this.isOwnerUser = isOwnerUser;
		this.isFiscalUser = isFiscalUser;
		
		// owner attributes
		this.pets = [];
		this.ownerHistory = [];
		this.ownerPoints = [];
		
		// host attributes
		this.homes = [];
		this.hostHistory = [];
		this.hostPoints = [];
	}
    
	addPet(pet) {
		this.pets.push(pet);
	}
		
  addHome(home) {
    this.homes.push(home);
  }
}

class Pet {
	constructor(name, species, size, nature, photo, birthDate) {
		this.name = name;
		this.species = species;
		this.size = size;
		this.nature = nature;
        this.state = 0; // 0 É EM CASA
		this.birthDate = birthDate || 0;
		this.photo = photo;
	}
}

class Home {
	constructor(name, adress, photos, capacity, description) {
		this.name = name;
		this.adress = adress;
		this.photos = photos;
		this.capacity = capacity;
		this.currentOccupation = 0;
		this.description = description;
	}
	
	isAvailable() {
		return (this.capacity - this.currentOccupation) > 0;
	}
}

class Adress {
	constructor(street, number, city, state, country) {
		this.street = street;
		this.number = number;
		this.city = city;
		this.state = state;
		this.country = country;
	}
}

var addressLukita = new Adress("Rua Carlos Reverbel", 152, "Canoas", "RS", "Brasil");

var userLukita = new User("Lukita", "lukita@hotmail.com", "123deoliveira4", "Canoas", "17/07/94", false, true, false);
var dogLukita = new Pet("Dog", "Cachorro", "Pequeno", "Alterado", "aaaaa", "2015");
userLukita.addPet(dogLukita);

var userBoranga = new User("Boranga", "boranguinha@yahoo.com", "12345", "Porto Alegre", "18/07/96", 1, 0, 0);
var adressBoranguinhaPoa = new Adress("Av Venancio Aires", 281, "Porto Alegre", "RS", "Brasil");
var adressboranguinhaPraia = new Adress("Av Praia", 999, "Capão da Canoa", "RS", "Brasil");
var homeBorangaPoa = new Home("Baia", adressBoranguinhaPoa, [], 1, "Apê em poa");
var homeBorangaPraia = new Home("Prainha", adressboranguinhaPraia, [], 5, "Só animais marinhos");
userBoranga.addHome(homeBorangaPraia);
userBoranga.addHome(homeBorangaPoa);

// console.log(userBoranga);
// console.log(userLukita);

//var boranga = new User("Baranga", "baranguinha@yahoo", "12345", "porto alegre");
//var pimenta = new User("Little Pepper", "pimentinha@bol", "54321", "porto alegre");
//var flach = new User("Armless John", "mcflachinho@rnf", "roller", "roller city");

var users = [userBoranga, userLukita];
// console.log(users);