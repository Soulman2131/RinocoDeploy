//
const productTotalAmount = document.getElementById("productTotalAmount");
const shippingCharge = document.getElementById("shippingCharge");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const discountCode = document.getElementById("discountCode");
const error = document.getElementById("error");

//SUM TOTAL PRICE
let priceCart = [];
for (let i = 0; i < cart.length; i++) {
	const priceCartTotal = cart[i].price * cart[i].quantity;
	priceCart.push(priceCartTotal);
}

//Sum REDUCER
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const priceCartTotalSum = priceCart.reduce(reducer, 0) / 100;

//CALCUL
productTotalAmount.innerHTML = parseInt(priceCartTotalSum);
shippingCharge.innerHTML = (parseInt(productTotalAmount.innerHTML) * 5) / 100;
cartTotalAmount.innerHTML = (parseInt(productTotalAmount.innerHTML) * 105) / 100;
const totalPrice = cartTotalAmount.innerHTML; /* 🌹👌 */

/***** Discount code ****/
document.getElementById("handleButton").addEventListener("click", () => {
	let totalP = cartTotalAmount.innerHTML;
	if (discountCode.value === "soul31") {
		let newTotalCart = totalP - 15;
		cartTotalAmount.innerHTML = newTotalCart;
		error.innerHTML = "Prise en compte du code soul31";
		showAlert("Bravo, le code est valide", "success");
		discountCode.value = "";
		document.querySelector(".codeis").style.display = "none";
		discountCode.style.boxShadow = "0 0 5px 1px green";
		discountCode.style.display = "none";
		document.getElementById("handleButton").style.display = "none";
	} else {
		error.innerHTML = "Le code n'est pas valide";
		showAlert("Merci d'entrer un code promo valide", "danger");
	}
});
