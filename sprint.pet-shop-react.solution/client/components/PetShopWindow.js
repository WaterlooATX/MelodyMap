import React from 'react';


import { fetchShops, fetchPets, likePet } from '../models/shop';
import * as Auth from '../models/auth';


export default class PetShopWindow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      shop: {},

      pets: []
          };
  }

  componentDidMount(){
    fetchShops()
      .then((shopData) => {
        this.setState({shop: shopData});
      });

    fetchPets()
      .then((petData) =>{
        this.setState({pets:  petData});
      });
      }


  handleLikePet(petId) {
    likePet(petId)
      .then((newPetData) => {

        alert("You liked the pet!");

        let newPets = this.state.pets.map( pet =>
          (pet.id === newPetData.id)
            ? newPetData
            : pet
        );

        this.setState({pets: newPets});
      })
      .catch(function(err) {
        alert("Something went wrong");
        console.log("Got error:", err);
      })
  }
  
  render(){

    return (
      <div className='pet-shop'>
        <h1> {"Welcome to "  + this.state.shop.name}</h1>
        { this.state.pets.map((pet, index) => {

          if (this.props.user) {
            var hasLiked = (pet.likes.indexOf(this.props.user.id) >= 0)
          }

          return <div key={index} className='pet'>
            <h3> {pet.name + " the " + pet.species}</h3>
            <img src={pet.imageUrl} />
            <label> {pet.likes.length + " votes" } </label>

            { this.props.user && ! hasLiked
              ? <button onClick={() => { this.handleLikePet(pet.id) }}> "Like this pet!" </button>
              : null
            }
          </div>
        })}
      </div>
    );
      }
}
