//
const id = window.location.search.split("?").join("");
console.log(id);

let product = [];

//FETCH
const fetchProduct = async () => {
	await fetch(`http://localhost:3000/api/teddies/${id}`)
		.then(res => res.json())
		.then(data => {
			product = data;
			console.log(product);
		});
};

const displayProduct = async () => {
	await fetchProduct();

	const teddyContainer = document.getElementById("teddy-container");

	teddyContainer.className = "row g-4 mt-2 text-center";
	teddyContainer.id = `card${product._id}`;
	// console.log(teddyContainer);
	teddyContainer.innerHTML = `
    <div class="col-md-5 col-11 mx-auto d-flex   justify-content-center align-items-center mt-4 ">
        <img src=${product.imageUrl} class="img-fluid" alt=${product.name} />
    </div>
    
    <div class="col-md-7 col-11 mx-auto px-4">
	    <div class="row">
			<div class="col-6 card-title mt-2">
				<h2 class="mb-4">${product.name} </h2>
				<div class="display-6 mb-4 " id="teddyPrice" > ${(product.price / 100)
					.toFixed(2)
					.replace(".", ",")} € </div>
				<p class="mb-4"  >${product.description} </p>
				<form action="#" class="pb-5">
				<label htmlFor="choice"> Choisissez votre couleur </label>
				<select  id="choice"></select>
				</form>
						
			</div>
			
			<div class="col-6">
				<ul class="pagination justify-content-end mt-2">
					<li class="page-item">
						<button class="page-link" id="decrement">
							<i class="fas fa-minus"></i>			
					    </button>
					</li>
					<li class="page-item">
						<input type="button" class="page-link" value="1" id="inputNumber"/>
					</li>
					<li class="page-item"> 
                        <button class="page-link" id="increment">
							<i class="fas fa-plus"></i>
						</button>
					</li>
				</ul>
			<div id="addAlert"></div>
			</div>
		</div>

		<div class="row">
			<div class="col-8 d-flex justify-content-between ">
			
				<a href="index.html" class  ="list-unstyled text-decoration-none text-dark">
				   <p><i class="fas fa-undo-alt"> </i> <span class="ms-1">Retour aux produits</span>
				   </p>
				</a> 

				 <a href="#" id="addToCard" class ="list-unstyled text-decoration-none text-dark">
				 	<p><i class="fas fa-heart"></i> <span class="ms-1">Ajouter au panier</span>
					</p>
					
				</a> 	
			</div>
		    <div class="col-4 d-flex justify-content-end price">
				<h3> <span class="valuePrice"> ${(product.price / 100)
					.toFixed(2)
					.replace(".", ",")} &euro;</span></h3>
			</div>
		</div>
	</div>
    `;

	//CHOICE COLOR
	let select = document.getElementById("choice");
	// console.log(choice);
	// console.log(product.colors);
	product.colors.forEach(color => {
		const option = document.createElement("option");
		option.innerHTML = `${color}`;
		option.value = `${color}`;
		select.appendChild(option);
	});

	//SHOW ALERT
	const showAlert = (message, className) => {
		const div = document.createElement("div");
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));

		const addAlert = document.getElementById("addAlert");
		addAlert.appendChild(div);

		setTimeout(() => document.querySelector(".alert").remove(), 3000);
	};

	//BUTTON ADD TO CART
	const addToCard = document.getElementById("addToCard");

	addToCard.addEventListener("click", () => {
		if (
			confirm(
				`Souhaitez-vous ajouter votre produit ${product.name} de couleur ${
					select.options[select.selectedIndex].text
				} `
			)
		) {
			window.location.href = "cart.html";
			storageProduct(); /*🌹👌 */
		} else {
			window.location.href = "#";
			showAlert("Le produit n'a pas été ajouté au panier", "danger text-center");
		}
	});

	//BUTTON MINUS && PLUS
	//
	document.getElementById("decrement").addEventListener("click", () => {
		const inputNumber = document.getElementById("inputNumber");
		const valuePrice = document.querySelector(".valuePrice");

		if (inputNumber.value <= 1) {
			inputNumber.value = 1;
			showAlert("Veuiller commander au minimum un article", "danger text-center");
		} else {
			inputNumber.style.background = "#fff";
			inputNumber.style.color = "#000";
			inputNumber.value = parseInt(inputNumber.value) - 1;
			valuePrice.innerHTML = (product.price * inputNumber.value) / 100;
		}
	});

	//
	document.getElementById("increment").addEventListener("click", () => {
		const inputNumber = document.getElementById("inputNumber");
		const valuePrice = document.querySelector(".valuePrice");

		if (inputNumber.value >= 5) {
			inputNumber.value = 5;
			showAlert("Il ne reste que 5 articles disponibles", "danger text-center");
			inputNumber.style.background = "red";
			inputNumber.style.color = "#fff";
		} else {
			inputNumber.value = parseInt(inputNumber.value) + 1;
			valuePrice.innerHTML = (product.price * inputNumber.value) / 100;
		}
	});
};

displayProduct();

//FUNCTION LOCALSTORAGE
const storageProduct = () => {
	let store;
	let select = document.getElementById("choice");
	const inputNumberValue = document.getElementById("inputNumber").value;

	store = {
		id: product._id,
		image: product.imageUrl,
		name: product.name,
		color: select.options[select.selectedIndex].text,
		price: product.price * parseInt(inputNumberValue),
		quantity: parseInt(inputNumberValue)
	};
	console.log(store.id);

	//Creation user-cart in the Localstorage
	const teddies = JSON.parse(localStorage.getItem("panier")) || [];

	var productAlreadyInCart = false; /*👌*/
	const addProduct = () => {
		for (let i = 0; i < teddies.length; i++) {
			if (teddies[i].id === store.id) {
				// console.log("ok");
				console.log(productAlreadyInCart);

				productAlreadyInCart = true; /*👌*/
				teddies[i].quantity += store.quantity;
			}
		}
		if (productAlreadyInCart === false) {
			teddies.push(store);
		}
		localStorage.setItem("panier", JSON.stringify(teddies));
		console.log(teddies);
	};
	addProduct();
};
