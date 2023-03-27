
/*Requisição HTTP
URL: https://pokeapi.co/api/v2/pokemon${id} o ID é dinamico nesse caso
    ${ Endereço } /${path = caminho de identificação do recurso

    Request Method: GET = BUSCAR RECURSO |
    POST = INSERIR UM NOVO POKEMON |
        PUT =  ATUALIZAR UM POKEMON JA EXISTENTE |
            DELETE =  DELETA O POKEMON |

                Query String

URL: https://pokeapi.co/api/v2/pokemon?type=grass&name=i  depois do "?" 
    para buscar pokemon do tipo grama e que os nomes começam com i

    Request Method:

    Request Body: {
    "name": "Teste"
}

    Status Code: 200 OK "Vai dizer o que deu a requisição"

    Response Headers

    Response Body


*/

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //para trazer o primeiro da lista (tipo principal)

    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat

    // const statsName = pokeDetail.stats.stat.name.map((statSlotName) => statSlotName.stat.name)
    // const [statName] = statsName

    // pokemon.stats.stat.name = statsName
    // pokemon.stat.name = statName

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())                        // recebendo response e transformando em promessa do body
        .then((jsonBody) => jsonBody.results)                       // acessando o body do json e "printando"
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // 
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}