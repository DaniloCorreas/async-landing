//Movemos la url de la API a una variable:

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCxOpZVan2nABg8GLv74N-xg&part=snippet%2Cid&order=date&maxResults=9';

//al <div> donde irá a parar la info, debemos colocarle el id="content" y luego aqui lo importamos asi:

const content = null || document.getElementById("content");

//La variable options la dejamos tal cual:

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '854e9c611cmsh334d0533e593a85p11bf0djsn80f69659dd30',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Creamos la funcion fetchData que usaremos mas adelante:

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

//Hacemos la peticion usando fetchData() PERO, Usando una funcion que se llama a si misma, para ello cambia la sintaxis:
//Toda la funcion va dentro de () y al final van nuevamente (), de esta manera la funcion se declara y se llama al mismo tiempo cuando se carga en memoria.

//A continuacion, en la variable "view" creamos un "template string" dentro de la cual se pueden ejecutar funciones y metodos, completando los espacios que deseemos con info obtenida en la Api.

(async () => {
    try {
        const videos = await fetchData(API) //aqui se guarda el objeto completo con toda la info de la Api
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
                </h3>
            </div>
            </div>
        `).slice(0,4).join("")}
        `;
        content.innerHTML = view; //Inyectamos el resultado en nuestro html
    } catch (error){
        console.log(error);
    }
})();


//El metodo .map() me va a devolver un nuevo Array llamado "view" con los elementos del original pero modificados por medio del template, es decir ya no va a entregar un objeto por cada elemento sino un string. Cada elemento del nuevo array "view" se llamara "video".

//El metodo .slice() va seleccionar para mostrar solo del elemento 0 al 4.
//El metodo .join() va a unir los elementos del array sin agregar nada entre ellos, por eso le pasamos "" (separador vacio).

//Todos estos metodos van a ir modificando y creando un nuevo array en la variable "view" hasta que cuando se termine de aplicar el ultimo, en esa variable solo va a quedar un string con codigo html. cuando esto sucede entra en juego "innerHTML" para inyectar todo eso en un div del index.html

//NO OLVIDAR: enlazar el .html con el .js por medio de la etiqueta <string>
//Ya se puede ejecutar directo al navegador, por liveServer.