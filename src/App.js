import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Pokemon from './components/Pokemon'

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      pokemons: [],
      page: 1
    }

    this.filter = this.filter.bind(this)
    this.list()
  }

  filter(event){
    const word = event.target.value

    if(word.length === 0) {
      this.list()
      return
    }

    if(word.length > 2){
      axios({
        method: 'POST',
        url: 'http://18.220.105.29/poke_api/pokemon/filter/',
        data: `word=${word}`
      })
      .then(res => {
        this.setState({ pokemons: res.data})
      })
    }
  }

  list(){
    axios({
      method: 'GET',
      url: `http://18.220.105.29/poke_api/pokemon/list/${this.state.page}`,
    })
    .then(res => this.setState({ pokemons: res.data}))
  }

  prev(){
    if(this.state.page > 1)
      this.setState({ page: this.state.page-1 }, () => {this.list()})
    else if(this.state.page === 1)
      this.setState({ page: 1 }, this.list())
  }

  next(){
    this.setState({ page: this.state.page+1 }, () => {this.list()})
  }

  render() {
    return (
      <div>
        <img src={process.env.PUBLIC_URL + '/pokemon_logo.png'} className="poke_logo" alt="Pokémon"/>
        <div className="pokemon_filtro">
          <form action="">
            <input type="text" placeholder="Digite o nome do Pokémon" 
            onChange={this.filter}/>
          </form>
        </div>
        
        <div className="pokemon_pager">
          <button type="button" onClick={() => this.prev()}>Anterior</button>
          <button type="button" onClick={() => this.next()}>Próximo</button>
        </div>

        <div className="pokemon_container">
          { this.state.pokemons.map((pokemon) => <Pokemon key={pokemon.id} { ...pokemon }/> )}
        </div>
      </div>
    )
  }
}