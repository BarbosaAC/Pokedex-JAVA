//Elemento ul recuperado de html
var listaPokemon = document.getElementById("listaPokemon");
var imagenPokemonFront = document.getElementById("img-front");
var imagenPokemonBack = document.getElementById("img-back");
var btnCargar = document.getElementById("cargar");
var urlImg = "https://as.com/meristation/imagenes/2020/02/13/noticias/1581576624_508899_1581576871_noticia_normal.jpg";

var offset=0;

imagenPokemonFront.src = urlImg;
function cargarDatosPokemon() {
	if (offset>0){
		while (listaPokemon.firstChild) {
			  listaPokemon.removeChild(listaPokemon.firstChild);
		}
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		console.log("OnReadyStateChange" + this.readyState);
		//Comprobamos que termino su trabajo y que el sevidor respondio 200
		if(this.readyState == 4 && this.status == 200){
			//Comprobar y visualizar la respuesta
			console.log(this.responseText);
			//Respuesta como objeto js
			var respuesta = JSON.parse(this.responseText);
			
			crearListaPokemon(respuesta);
			offset=offset+20;
			btnCargar.innerText="Siguiente página";
		}
	}
	//configurar metodo http y la url a donde se hará peticion
	request.open('GET', 'https://pokeapi.co/api/v2/pokemon?offset='+offset+'&limit=20', true );
	request.send();
}

function regresarDatosPokemon() {
	offset -= 20;
	console.log(offset);
	cargarDatosPokemon();
}

function mandarDatosPokemon (e) {
	var request = new XMLHttpRequest();
	var pokemon = obtenerDatosElemento(e.target.parentElement);
	request.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200){
			console.log(this.responseText);
		}
	}
	//https://en66nzzcy55h6.x.pipedream.net/
	request.open('POST','https://enai3s4mguod7.x.pipedream.net',true);
	request.send(JSON.stringify(pokemon));
}
function obtenerDatosElemento(elementoLi){
	var nombrePokemon = elementoLi.id;
	var elementoImg = imagenPokemonFront;
	var pokemonImg =elementoImg.src;
	var pokemon ={
			maestro: "Alejandro",
			nombre: nombrePokemon,
			UrlImagen: pokemonImg
	};
	return pokemon
}


function crearListaPokemon (datos){
	var listaPokemones = datos.results;
	for(pokemon of listaPokemones){
		crearElementoPokemon(pokemon);
	}
}

function crearElementoPokemon(pokemon){
	//Creando elemento li
	var elementoLi = document.createElement("li");
	var btnImagen = document.createElement("button");
	//Boton enviar
	var btnEnviar = document.createElement("button");
	//Configurar elemento, poniendo contenido
	elementoLi.innerText = pokemon.name;
	elementoLi.id=pokemon.name;
	elementoLi.style.flexDirection="column";
	// Imagen
	btnImagen.innerText = "Ver imagen";
	//Boton Enviar
	btnEnviar.innerText = "Mandar datos";
	btnImagen.style.flexDirection="column";
	//Boton Enviar
	btnEnviar.onclick = mandarDatosPokemon;
	btnImagen.onclick = function(){
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				console.log(this.responseText);
				var respuesta = JSON.parse(this.responseText);
				console.log(respuesta.sprites.front_default);
				imagenPokemonFront.src = respuesta.sprites.front_default;
				imagenPokemonBack.src = respuesta.sprites.back_default;
			}
		};
		request.open("GET", "https://pokeapi.co/api/v2/pokemon/"+pokemon.name+"/",true)
		request.send();
		console.log(pokemon.name)
	};
	
	
	
	//Mandarlo al DOM
	elementoLi.appendChild(btnImagen);
	elementoLi.appendChild(btnEnviar);
	listaPokemon.appendChild(elementoLi);
	
	
}

