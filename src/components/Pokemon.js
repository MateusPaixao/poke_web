import React, { Component } from 'react'
import serialize from 'form-serialize'
import axios from 'axios'

export default class Pokemon extends Component {

	constructor(props) {
	  super(props)
	  this.state = { ...props }

	  this.edit = this.edit.bind(this)
	  this.closeEdit = this.closeEdit.bind(this)
	}

	openEdit(_id){
		let formEdit = document.getElementById('formEdit'+_id)
		formEdit.classList.add('show')
	}

	closeEdit(_id){
		let formEdit = document.getElementById('formEdit'+_id)
		formEdit.classList.remove('show')
	}

	edit(event){
		event.preventDefault()
		const formEdit = event.target
		const containerFormEdit = document.getElementById(formEdit.parentNode.id)
		const pokemon = serialize(formEdit)

		axios({
      method: 'POST',
      url: 'http://18.220.105.29/poke_api/pokemon/modify/',
      data: pokemon
    })
    .then(res => {
    	const data = serialize(formEdit, { hash: true})
			this.setState({ ...this.state, type1: data.type1, atk: data.atk, def: data.def })
			containerFormEdit.classList.remove('show')
    })
	}

	remove(_id){
		const formEdit = document.getElementById('formEdit'+_id)
		const pokemon = `id=${_id}`

		axios({
      method: 'POST',
      url: 'http://18.220.105.29/poke_api/pokemon/remove/',
      data: pokemon
    })
    .then(res => {
    	formEdit.parentNode.classList.add('hide')
    	setTimeout(() => {
    		formEdit.parentNode.style.display = 'none'
    	}, 700)
    })
	}

	render() {
	  return (
	  		<div className="pokemon_card">
	  			<h3>{this.state.name}</h3>
	  			<button type="button" className="btn_editar" onClick={() => this.openEdit(this.state.id)}>Editar</button>	
	  			<img 
	  			src={`http://pokestadium.com/sprites/xy/${this.state.name.toLowerCase()}.gif`} 
	  			alt={this.state.name}/>
	  			<ul>
	  				<div>
	  					<li>Type: {this.state.type1}</li>
	  					<li>Weather: {this.state.weather1}</li>
	  				</div>

	  				<div>
	  					<li>Atk: {this.state.atk}</li>
	  					<li>Def: {this.state.def}</li>
	  				</div>
	  			</ul>

	  			<div className="formulario_edicao" id={"formEdit"+this.state.id}>
	  				<form onSubmit={this.edit}>
	  					<h4>Bulbasaur</h4>

	  					<input type="hidden"
	  					name="id" 
	  					defaultValue={this.state.id}/>

	  					<label>Type</label>
	  					<input type="text" placeholder="Type"
	  					name="type1" 
	  					defaultValue={this.state.type1}/>

	  					<label>Atk</label>
	  					<input type="text" placeholder="Atk"
	  					name="atk" 
	  					defaultValue={this.state.atk}/>

	  					<label>Def</label>
	  					<input type="text" placeholder="Def" 
	  					name="def" 
	  					defaultValue={this.state.def}/>

	  					<button type="submit" className="btn salvar">Salvar</button>
	  					<button type="button" 
	  					className="btn excluir"
	  					onClick={() => this.remove(this.state.id)}>Excluir</button>
	  					
	  					<button type="button" 
	  					className="btn cancelar" 
	  					onClick={() => this.closeEdit(this.state.id)}>Cancelar</button>
	  				</form>	
	  			</div>
	  		</div>
	  )
	}
}