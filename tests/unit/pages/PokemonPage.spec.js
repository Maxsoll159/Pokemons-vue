import { shallowMount, mount } from "@vue/test-utils"
import PokemonPage from '@/pages/PokemonPage'
import {pokemons} from '../mocks/pokemos.mock'
import getPokemonOptions from "@/helpers/getPokemonOptions"
let wrapper
describe('pokemonPage Component', ()=>{

beforeEach(()=>{
    wrapper = shallowMount(PokemonPage)
})

test('debe de hacer math con el snapshot', () => { 
    expect(wrapper.html()).toMatchSnapshot()
})
test('debe de llamar mixPokemonArray al montar', () => { 
    
    const mixPokemonArray = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
    const wrapper = shallowMount(PokemonPage)
    expect(mixPokemonArray).toHaveBeenCalled()

})
test('debe de hacer march con el snapshot cuando carge los pokemons', () => { 
    const wrapper = shallowMount(PokemonPage, {
        data(){
            return{
                pokemonArr: pokemons,
                pokemon: pokemons[1],
                showPokemon: false,
                showAnswer: false,
                message: '',
                vidas: 3,
                respuestasBuenas: 0
            }
        }
    })
    expect(wrapper.html()).toMatchSnapshot()
 })

 test('debe de monstrar los componentes de pokemonPicture y PokemonOptions', () => { 
    const wrapper = shallowMount(PokemonPage, {
        data(){
            return{
                pokemonArr: pokemons,
                pokemon: pokemons[1],
                showPokemon: false,
                showAnswer: false,
                message: '',
                vidas: 3,
                respuestasBuenas: 0
            }
        }
    })
    const pokemonPicture = wrapper.find('pokemon-picture-stub')
    const PokemonOptions = wrapper.find('pokemon-options-stub')
    expect(pokemonPicture.exists()).toBeTruthy()
    expect(PokemonOptions.exists()).toBeTruthy()
    expect(pokemonPicture.attributes('pokemonid')).toBe("2")
    expect(PokemonOptions.attributes('pokemons')).toBeTruthy()
    //expect(PokemonOptions.attributes('pokemons').length).toBe(4)
})
test(' pruebas con checkAnswer', async() => { 

    const wrapper = shallowMount(PokemonPage, {
        data(){
            return{
                pokemonArr: pokemons,
                pokemon: pokemons[1],
                showPokemon: false,
                showAnswer: false,
                message: '',
                vidas: 3,
                respuestasBuenas: 0
            }
        }
    })

    /*await wrapper.vm.checkAnswer(1)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.vm.showPokemon).toBe(true)
    expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)*/

    await wrapper.vm.checkAnswer(10)
    expect(wrapper.vm.message).toBe(`Fallaste era,  ${pokemons[1].name}`)

 })

})
