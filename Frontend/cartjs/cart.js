//
const list = document.getElementById("listOfArticles");

//Declaration CART
let cart = JSON.parse(localStorage.getItem("panier"));
console.log(cart);

// IF CART IS EMPTY
if (cart === null || cart.length === 0) {
	cart = [];

	const emptyCart = "<div> Votre panier est vide</div>";
	list.innerHTML = emptyCart;
}
//NOT EMPTY
let notEmpty = [];
for (let i = 0; i < cart.length; i++) {
	notEmpty =
		notEmpty +
		`<tr >
	<td>${cart[i].quantity}</td>
    <td>${cart[i].name}</td>
    <td>${(cart[i].price / 100).toFixed(2).replace(".", ",")} €</td>
    <td>${cart[i].color} </td>
    <td><a href="#" class="btn btn-danger btn-sm float-end button1">X</a></td>
    </tr>`;
}

list.innerHTML = notEmpty;

//DELETE BUTTON1
const deleteCart = el => {
	if (el.classList.contains("button1")) {
		el.parentElement.parentElement.remove();
	}
};

//DELETE BUTTON IN LOCALSTORAGE
const deleteCartOfStorage = name => {
	cart.forEach((product, index) => {
		if ((product.name = name)) {
			cart.splice(index, 1);
		}
	});
	localStorage.setItem("panier", JSON.stringify(cart));
};

//💖👌 AEL DELETE
list.addEventListener("click", e => {
	deleteCart(e.target);
	deleteCartOfStorage(e.target.parentElement.previousElementSibling.textContent);
	window.location.href = "cart.html";
});

//CLEAR BUTTON
const clearCart = document.createElement("button");
clearCart.className = "button2 btn text-white btn-warning mt-2 ";
clearCart.textContent = "Vider le panier";

list.appendChild(clearCart);

document.querySelector(".button2").addEventListener("click", e => {
	if (confirm("Souhaitez-vous vider votre panier?")) {
		deleteCartOfStorage(e.target.parentElement.previousElementSibling.textContent);
		localStorage.removeItem("panier");
		showAlert(" Votre panier a été vidé", "success text-center");
		window.location.href = "cart.html";
	} else {
		window.location.href = "#";
		showAlert("Vos produits n'ont pas été vidés", "success text-center");
	}
});

//FUNCTION SHOW ALERT
const showAlert = (message, color) => {
	const div = document.createElement("div");
	div.className = `alert alert-${color}`;
	div.appendChild(document.createTextNode(message));

	const btnShowAlert = document.getElementById("btnShowAlert");
	btnShowAlert.appendChild(div);

	setTimeout(() => document.querySelector(".alert").remove(), 3000);
};
