import getPokemonOptions, {getPokemon, getPokemonNames} from '@/helpers/getPokemonOptions'
describe('getPojemonOptions helpers',()=>{
    test('debe regresar un arreglo de numeros', () => { 
        const pokemons = getPokemon()
        expect(pokemons.length).toBe(650)
        expect(pokemons[0]).toBe(1)
        expect(pokemons[500]).toBe(501)
        expect(pokemons[649]).toBe(650)
     })
     test('debe de retornar un arreglo de 4 elementos con nombres de pókemon', async()=>{
        const pokemons = await getPokemonNames([1,2,3,4])
         expect(pokemons).toStrictEqual([
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
          ])

        /*expect(pokemons[0].name).toBe('bulbasaur')
        expect(pokemons[1].name).toBe('ivysaur')
        expect(pokemons[2].name).toBe('venusaur')
        expect(pokemons[3].name).toBe('charmander')*/

     })
     test('getPokemonOptions debe de retornar un arreglo mezclado', async() => { 
        const pokmons = await getPokemonOptions()
        expect(pokmons.length).toBe(4)
        expect(pokmons).toEqual([
         { 
            name: expect.any(String), 
            id: expect.any(Number)
         },
         { 
            name: expect.any(String), 
            id: expect.any(Number)
         },
         { 
            name: expect.any(String), 
            id: expect.any(Number) 
         },
         { 
            name: expect.any(String), 
            id: expect.any(Number)
          }
       ])
     })
})