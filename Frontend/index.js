//
const teddiesContainer = document.getElementById("teddies-container");
console.log(teddiesContainer);

let teddies = [];

//FETCH TEDDIES
const fetchTeddies = async () => {
	await fetch(`http://localhost:3000/api/teddies`)
		.then(res => res.json())
		.then(data => (teddies = data));
	console.log(teddies);
};

//DISPLAY TEDDIES
const displayTeddies = async () => {
	await fetchTeddies();
	teddiesContainer.className = "row g-4 mt-2 text-center ";
	teddiesContainer.innerHTML = teddies
		.map(
			teddy => ` 
            <div class="col-md-5 col-11 mx-auto d-flex justify-content-center align-items-center mt-4">
            <img src=${teddy.imageUrl} class="img-fluid rounded-4" alt=${teddy.name}  />
            </div>
            <div class="col-md-7 col-11 mx-auto px-4">
            <div class='row'>
            <div class='card-title mt-2' >
            <h2 class="mb-2 " > ${teddy.name.toUpperCase()} </h2>
			<div class="display-6 mb-2" > ${(teddy.price / 100).toFixed(2).replace(".", ",")} € </div>
            <p class="mb-2">${teddy.description} </p>
            <button id=${teddy._id} class="btn btn-primary mt-2 buttons">Commander</button>
          
            </div>
            </div>
            </div> 
            <hr class="border border-dark-subtle shadow" />
            `
		)
		.join("");

	//AEL BUTTON
	let buttons = document.querySelectorAll(".buttons");
	// console.log(buttons);

	buttons.forEach(button =>
		button.addEventListener("click", () => {
			console.log(button);

			window.location = `product.html?${button.id}`;
		})
	);

	//DEALS
	const deals = document.getElementById("deal");

	deals.innerHTML = `
	<strong>Deal de la semaine : </strong> <br /> Nous avons concocté, spécialement pour vous, une gamme de <span class="badge bg-danger">${teddies.length} ours</span> en péluche que vous pouvez retrouver dans plusieurs couleurs. Bon shopping et faîtes vous plaisir !!!
	`;
};

displayTeddies();
