<template>
    <h1 class="titulo">QUE TANTO SABES DE POKEMON</h1>
    <h1  class="respuesta">Respuestas correctas: {{respuestasBuenas}}</h1>
    <h1 class="respuesta">Vidas   </h1>
         <div v-if="vidas === 3">
             <img src="@/img/vida2.png" alt="" width="60"  class="espacio">
             <img src="@/img/vida2.png" alt="" width="60" class="espacio">
             <img src="@/img/vida2.png" alt="" width="60" class="espacio">
         </div>
         <div v-if="vidas === 2"  >
             <img src="@/img/vida2.png" alt="" width="60" class="espacio">
             <img src="@/img/vida2.png" alt="" width="60" class="espacio">
         </div>
         <div v-if="vidas === 1">
             <img src="@/img/vida2.png" alt="" width="60" class="espacio">
         </div>
 
    
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>

        <h1 class="respuesta">¿Quien es este Pokemon?</h1>
        <!-- IMAGEN DEL POKEMON-->
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <!-- OPCIONES-->
        <PokemonOptions :pokemons="pokemonArr" 
        @selection="checkAnswer"
        />
        <template v-if="showAnswer">
            <h2 class="respuesta">{{message}}</h2>
            <button
            v-if="vidas === 0"
            @click="newGame()"
            >Nuevo Juego</button>
        </template>
       

    </div>

    

</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'
//console.log(getPokemonOptions())
export default {
    components: {
    PokemonPicture,
    PokemonOptions
    },
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            vidas: 3,
            respuestasBuenas: 0
        }
    },
    methods: {
        async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions()
            const rndInt = Math.floor(Math.random()*4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(pokemonId){
            this.showPokemon = true
            this.showAnswer = true
            if(this.pokemon.id == pokemonId){     

                this.message = `Felicidades Campeon el nombre es ${this.pokemon.name}`
                this.respuestasBuenas++
                setTimeout(() => {
                    this.showPokemon = false
                    this.showAnswer = false
                    this.pokemonArr = []
                    this.mixPokemonArray()

                }, 2000)
                
            }else{
                this.message = `Fallaste era,  ${this.pokemon.name}`

                this.vidas--
                if(this.vidas !== 0){
                    setTimeout(() => {
                        this.showPokemon = false
                        this.showAnswer = false
                        this.pokemonArr = []
                        this.mixPokemonArray()

                    }, 2000)
                }

            }
            
        }, 

        newGame(){
           this.showPokemon = false
           this.showAnswer = false
            this.pokemonArr = []
            this.mixPokemonArray()
            this.pokemon = null
            this.vidas = 3
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
}
</script>
<style scoped>
  .titulo {
      font-family: cursive;
      color: black;
      font-size: 50px;
  }
  .espacio{
      margin-right: 10px;
  }
.respuesta{
    font-family: cursive;
    color: black;
    font-size: 35px;
}
</style>