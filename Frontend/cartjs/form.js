const form = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

// CLASS BOOK
class Product {
	constructor(firstName, lastName, email, address, cp, country) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.address = address;
		this.cp = cp;
		this.country = country;
	}
}

//CLASS UI
class UI {
	static displayProducts() {
		const teddies = Store.getProducts();
		teddies.forEach(teddy => UI.addProductToList(teddy));
	}

	static addProductToList(teddy) {
		const tr = document.createElement("tr");
		tr.innerHTML = `<td>${teddy.firstName} </td>
		<td>${teddy.lastName} </td>
		<td>${teddy.email} </td>
		<td>${teddy.address} </td>
		<td>${teddy.cp} </td>
		<td>${teddy.country} </td>
		<td><a href="#bookList" class="btn btn-danger btn-sm delete float-end ">X </a></td>
        `;
		bookList.appendChild(tr);
	}

	static deleteProduct(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, classN) {
		const div = document.createElement("div");
		div.className = ` alert alert-${classN} `;
		div.appendChild(document.createTextNode(message));
		form.append(div);

		setTimeout(() => document.querySelector(".alert").remove(), 2000);
	}
	static clearFields() {
		document.getElementById("firstName").value = "";
		document.getElementById("lastName").value = "";
		document.getElementById("email").value = "";
		document.getElementById("address").value = "";
		document.getElementById("cp").value = "";
		document.getElementById("country").value = "";
	}
}

//CLASS STORE
class Store {
	static getProducts() {
		let teddies;
		if (localStorage.getItem("teddies") === null) {
			teddies = [];
		} else {
			teddies = JSON.parse(localStorage.getItem("teddies"));
		}
		return teddies;
	}
	static addProduct(teddy) {
		const teddies = Store.getProducts();
		teddies.push(teddy);
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
	static removeProduct(country) {
		const teddies = Store.getProducts();
		teddies.forEach((teddy, index) => {
			if ((teddy.country = country)) {
				teddies.splice(index, 1);
			}
		});
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}

//ADD DOM
document.addEventListener("DOMContentLoaded", UI.displayProducts);

//AEL SUBMIT
form.addEventListener("submit", e => {
	e.preventDefault();
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const email = document.getElementById("email").value;
	const address = document.getElementById("address").value;
	const cp = document.getElementById("cp").value;
	const country = document.getElementById("country").value;

	//THE REGEX
	let regexFirstName = /^[A-Za-z\s]{3,20}$/;
	let regexLastName = /^[A-Za-z\s]{3,20}$/;
	let regexEmail = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}\.[A-Za-z]{2,4}$/;
	let regexAddress = /^[A-Za-z0-9\s]{5,80}$/;
	let regexCp = /^[0-9]{5}$/;
	let regexCountry = /^[A-Za-z\s]{3,20}$/;

	if (
		!regexFirstName.test(firstName) ||
		!regexLastName.test(lastName) ||
		!regexEmail.test(email) ||
		!regexAddress.test(address) ||
		!regexCp.test(cp) ||
		!regexCountry.test(country)
	) {
		//
		if (!regexFirstName.test(firstName)) {
			UI.showAlert("Le prénom ne doit contenir ni chiffre ni symbole", "warning");
		}
		if (!regexLastName.test(lastName)) {
			UI.showAlert("Le nom ne doit contenir ni chiffre ni symbole", "warning");
		}
		if (!regexEmail.test(email)) {
			UI.showAlert("Veuillez saisir un email valide", "warning");
		}
		if (!regexAddress.test(address)) {
			UI.showAlert("veuillez bien saisir votre adresse", "warning");
		}
		if (!regexCp.test(cp)) {
			UI.showAlert("Le code postal ne doit contenir que 5 chiffres", "warning");
		}
		if (!regexCountry.test(country)) {
			UI.showAlert("La ville ne doit pas contenir de symbole", "warning");
		}
		//
		UI.showAlert("Veuillez bien remplir vos coordonnées", "danger");
	} else {
		const product = new Product(firstName, lastName, email, address, cp, country);
		UI.addProductToList(product);
		Store.addProduct(product);
		UI.showAlert("Vos coordonnées sont validées", "success");
		UI.clearFields();

		//TOTAL PRICE IN LOCALSTORAGE
		localStorage.setItem("price", totalPrice);
		const priceFromLocal = localStorage.getItem("price");
		console.log(priceFromLocal);

		//CONTACT FUNCTION
		let contact = {
			firstName,
			lastName,
			address,
			country,
			email
		};

		//ARRAY OF CART ID
		let products = [];
		for (let i = 0; i < cart.length; i++) {
			let id = cart[i].id;
			products.push(id);
		}
		console.log(products);

		//FUNCTION PRICE CONTACT && PRODUCTS
		let pcp = { priceFromLocal, contact, products };

		//Send FUNCTION
		const post = fetch("https://jsonplaceholder.typicode.com/users", {
			method: "POST",
			body: JSON.stringify(pcp),
			headers: { "Content-Type": "application/json" }
		}).then(async res => {
			try {
				const contenu = await res.json();
				// console.log(contenu);
				if (res.ok) {
					console.log(`contenu de response : ${res.ok}`);
					console.log(contenu.products[0]);
					/**mettre l'id dans le localstorage */
					localStorage.setItem("id", contenu.products[0]);
					/**aller vers la page order.html */
					window.location = "order.html";
				} else {
					console.log(` reponse du serveur : ${res.status}`);
				}
			} catch (error) {
				console.log(` Erreur : ${error}`);
				alert(`Erreur qui vient du catch(ERROR): ${error}`);
			}
		});
	}
});

//AEL DELETE
bookList.addEventListener("click", e => {
	UI.deleteProduct(e.target);
	Store.removeProduct(e.target.parentElement.previousElementSibling.textContent);
	UI.showAlert("Vos coordonnées sont supprimées", "info");
});
