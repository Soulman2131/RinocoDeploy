const command = document.getElementById("command");
const id = localStorage.getItem("id");
const price = localStorage.getItem("price");

//
if (id === null) {
	window.location.href = "index.html";
} else {
	command.innerHTML = `
    <h1 class="py-4 text-center fw-bold text-secondary mb-3 ">
    Récapitulatif de votre commande
    </h1>
    <div class="border text-center bg-light p-5 h3">
        <p class="text-danger">Merci pour votre commande</p>
        <p> 
            Votre commande numéro <span class="fw-bold"> ${id} </span> a bien été prise en commande. <br />
            Le montant de votre commande est de <span class=" fw-bold">${price} € </span> <br />
            Au plaisir de vous revoir !!! <br />
            <button class ="btn btn-info p-3 m-5 rounded-5"> <a href="index.html" class="text-light text-decoration-none"> Retour à l'accueil </a> </button>
        </p>
    </div>
`;

	// localStorage.clear();
	const removeAll = remov => localStorage.removeItem(remov);

	removeAll("price");
	removeAll("products");
	removeAll("id");
	removeAll("teddies");
	removeAll("panier");
}
