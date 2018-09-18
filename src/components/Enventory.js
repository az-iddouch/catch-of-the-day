import React from 'react';
import AddFishForm from './AddFishForm';
import Login from './Login';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Enventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updatedFish: PropTypes.func,
    fishes: PropTypes.object ,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSamples: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value 
    }
    this.props.updateFish(key, updatedFish);

  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="fish name" onChange={e => this.handleChange(e, key)}/>
        <input type="text" name="price" value={fish.price} placeholder="fish price" onChange={e => this.handleChange(e, key)} />
        <select type="text" name="status" value={fish.status} placeholder="fish status" onChange={e => this.handleChange(e, key)}>
          <option value="available">Fresh !</option>
          <option value="unavailable">Sold Out !</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="fish description" onChange={e => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="fish image" onChange={e => this.handleChange(e, key)} />
        <button onClick={()=> this.props.removeFish(key) }>Remove Fish</button>
      </div>
    )
  }

  authHandler = async (authData) => {
    // 1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2.claim it if there's no owner
    if(!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3.set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();  
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    console.log('logging out .....');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }


  render() {
    const logoutBtn = <button onClick={this.logout}>Log Out!</button>

    // Chech if they are logged in
    if ( !this.state.uid ){
      return <Login authenticate={this.authenticate} />
    }

    // 2. check if they are not the owner of the store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you're not the owner of this store !!</p>
          { logoutBtn }
        </div>
      )
    }

    // 3. they must be the owner , just render the enventory

    return (
    <div> 
      <h2>Enventory</h2>
      { logoutBtn }
      { Object.keys(this.props.fishes).map(this.renderInventory) }
      <AddFishForm addFish={this.props.addFish} />
      <button onClick={this.props.loadSamples} >Load Sample Fishes</button>
    </div>
    )
  }
}

export default Enventory;