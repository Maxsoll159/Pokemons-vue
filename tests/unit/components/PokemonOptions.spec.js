import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemos.mock";

describe("Pokemon Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
      },
    });
  });
  test("debe de hacer match con el snapshot", () => {
    //toMatchInlineSnapshot
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('debe de mostrar las 4 opciones correctas', () => { 
    const li = wrapper.findAll('li')
    expect(li.length).toBe(4)
    expect(li[0].text()).toBe('bulbasaur')
    expect(li[1].text()).toBe('ivysaur')
    expect(li[2].text()).toBe('venusaur')
    expect(li[3].text()).toBe('charmander')
  })
  test('debe de emitir "selection" con sus respectivos parametros al hacer click', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li')
        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')
        console.log(wrapper.emitted('selection'))
        expect(wrapper.emitted('selection').length).toBe(4)
        expect(wrapper.emitted('selection')[0]).toEqual([1])
        expect(wrapper.emitted('selection')[1]).toEqual([2])
        expect(wrapper.emitted('selection')[2]).toEqual([3])
        expect(wrapper.emitted('selection')[3]).toEqual([4])
        /*/expect(wrapper.emitted('selectionPokemon').length).toBe(1)
        expect(wrapper.emitted('selectionPokemon')[0]).toEqual([5])*/

   })
});
