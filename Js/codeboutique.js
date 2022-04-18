var monPanier = [];
function chargerArticles() {
	//document.write("<h2>catalogue[0].nom</h2>");
	
	//recuperer l'element <section> ayant id="comtent"
	var articles = document.getElementById("content");
	//om parcour le tableau catalogue qui stocke les articles
	for (var i = 0; i < catalogue.length; i++) {
		/***********Product Div**************/
		//creer un element de type div
		var article = document.createElement("div");
		//associer a l'element "article" la classe de style "article"

		article.className = "article";
		//pour associer a chaque article un identifiant different , nous allons construire cet identifiant en concatenent la position de l'article

		article.id = i + "-article";

		// *********affichage du nom de l'article********/

		//creer un element de type h2
		var articleNom = document.createElement("h2");
		// associer a l'element articleNom LA CLASSE nom_art
		articleNom.className = "nom_art"
		//a l'aide de innerText precisez le contenu texte de l'element articleNom (il doit afficher le nom d'article)

		articleNom.innerText = catalogue[i].nom; // le nom du ieme article

		article.appendChild(articleNom);
		//creer un element de type img
		var articleImg = document.createElement("img");
		//associez a l'element articleImg la classe img_art
		articleImg.className = "img_art";
		// a l'aide de setAttribute , on precise la source de l'image que doit afficher articleImg
		articleImg.setAttribute('src', catalogue[i].image);
		//Inserer articleImg comme enfant de l'element article
		article.appendChild(articleImg);

		/******affichage de la description de l'article*****/
		// creer element de type div
		var articleDesc = document.createElement("div");
		//associer a l'element articleDesc la classe desc_art
		articleDesc.className = "desc_art";
		// precisez  a l'aide de innertext le contenu texte de l'element articleDesc (il doit afficher le prix d'article)
		articleDesc.innerText = catalogue[i].desc;
		// inserer articleDesc comme enfant de l'element article 
		article.appendChild(articleDesc);

		/****afficher  du prix de l'article*******/
		// creer un element de type div
		var articlePrix = document.createElement("div");
		//Associez a l'Element articlePrix la classe prix_art
		articlePrix.className = "prix_art";
		//Precisez a l'aide de innerText le content text de l'Element articlePrix
		articlePrix.innerText = catalogue[i].prix + "Dh";
		// Inserez articlePrix comme enfant de l'Element article
		article.appendChild(articlePrix);

		/**********AFFICHAGE DE LA ZONE DE COMMANDE*************/

		//Creez un element de type div et associez -lui de style "cmd_art"
		var zoneCmd = document.createElement("div");
		zoneCmd.className = "cmd_art";
		//Créez un élément <input> et associez-lui la classe de style input_art
		var inputCmd = document.createElement("input");
		inputCmd.className = "input_art";

		inputCmd.id = i + "-qte";

		inputCmd.type = "number";

		inputCmd.value = 0;

		inputCmd.min = 0;
		inputCmd.max = 5;

		zoneCmd.appendChild(inputCmd);

		var bouton = document.createElement("button");
		bouton.className = "btn_art";

		bouton.id = i + "-cmd";

		bouton.onclick = function () {

			var item = this.getAttribute("id");

			var pos = item.substring(0,1);

			ajouterAuPanier(pos);

		};
		zoneCmd.appendChild(bouton);
		article.appendChild(zoneCmd);
		articles.appendChild(article);
	}
}

function searchDansPanier(nom) 
{
	for (var i = 0; i < monPanier.length; i++) {
		if (monPanier[i].nom == nom)
			return true
		else
			return false
	}
}
function ajouterAuPanier(pos) 
{
	if (searchDansPanier(catalogue[pos].nom))
	{
		alert("deja dans le panier");
	}
	else 
	{
		var ident = pos + "-qte";
		var qte = document.getElementById(ident).value;
		console.log(qte);

		if (qte > 0) 
		{
			var articleCmd = {};

			articleCmd.nom = catalogue[pos].nom;
			articleCmd.prix = catalogue[pos].prix;
			articleCmd.qte = qte;
			articleCmd.prixHt = articleCmd.prix * qte;
			monPanier.push(articleCmd);
		}
		else
		{
			alert("choisissez une quantité > 0");
		}
	}
}




function stockerPanier(data) {

	var panierJSON = {}; // On crée un objet vide

	// On met dans cet objet le tableau qu'on veut stocker

	panierJSON.monpanier = data;

	// On stocke en local à l'aide de l'objet localStorage et la méthode JSON.stringify

	localStorage.setItem("panierLocalStorage", JSON.stringify(panierJSON));
}
