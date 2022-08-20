//consumiendo la API de youtube para traer los ultimos 9 videos de un canal de youtube a mi pagina web

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCUhFaUpnq31m6TNX2VKVSVA&part=snippet%2Cid&order=date&maxResults=9';
const content = null || document.getElementById('content'); //tomamos el id content de mi archivo html

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '691b7693d5msh9e0a32ce9087c35p11f1bfjsnfc8ed0115754',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try{
        const videos = await fetchData(API);
        // genero una constante que sera una vista la cual se encargara de iterar los elementos que voy a traer y los va a introducir al HTML que se creo previamente copiando la parte del codigo que se encargaria de mostrar dichos elementos
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
            `).slice(0,4).join('')} 
        `; // accedo al objeto que me devuelve la consulta de la API al elemento items e invoco el metodo map para transformar ese arreglo que tengo de la informacion a la estructura de HTML que esta en las comillas
        //para mostrar por ejemplo solo 4 de mis nueve elementos que llame se puede usar el metodo slice (rebanadas) y como parametros se le pone de 0 a 4 adicionalmente se le agrega el elemento join para unir esos elementos
        content.innerHTML = view; //tomamos la variable content que se trajo del html por medio del id y usamos el metodo innerHTML para introducir el resultado de view en el html
    } catch (error) {
        console.log(error);
    }
})(); //llamamos a una funcion a si misma de esta forma