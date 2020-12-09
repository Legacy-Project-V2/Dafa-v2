import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom" ;
import axios from "axios";
import Footer from './Footer';



const ClothesItem = props => (
    <tr>
        <td>{props.item.itemName}</td>
        <td>{props.item.category}</td>
        <td>{props.item.type}</td>
        <td>{props.item.description}</td>
        
        <td>
        <img src= {props.item.image} width="200" height="200" className="w3-round" alt="Norway"/>
        </td>
        <td>
        <Link to ={"/edit/"+props.item._id} className="btn btn-deep-orange darken-4" >Edit</Link>
        <button type = "button" 
        className="btn btn-deep-orange darken-4"
        onClick = {() => {props.deleteItem(props.item._id)}}>
        Delete
        </button>
        </td>
    </tr>
)


  class ItemsList extends Component {

        constructor(props) {
            super(props);
    
            this.deleteItem = this.deleteItem.bind(this);
    
            this.state = {
                items: [],
                filteredItems :[],
                // SearchString:'',
                category: '',
                type: ''
            }
        }
<<<<<<< HEAD
    }

    componentDidMount() {
=======
    
           componentDidMount() {
>>>>>>> 9019bf55cdfc8d3f97ab71ded4feb90c84948c4b
         axios.get("http://localhost:8000/addItems/")   
            .then( res => {
                this.setState({items: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

<<<<<<< HEAD
    deleteItem(id) {
        axios.delete("http://localhost:8000/addItems/" + id)
            .then(res => console.log(res.data));
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    itemsList() {
        let listedItems = (this.state.filteredItems.length > 0)? this.state.filteredItems : this.state.items; 

        return listedItems.map(currentItem => {
            return <ClothesItem item = { currentItem } deleteItem = { this.deleteItem } key = { currentItem._id }/>; 
        })
    } 

    onSearch = e => {
        let { items } = this.state
        let string = e.target.value
        if(string.length > 0){
           let filteredItems = items.filter(item => item.itemName.includes(string))
           this.setState({SearchString:string,filteredItems:filteredItems})
=======
    
        deleteItem(id) {
            axios.delete("http://localhost:8000/addItems/" + id)
                .then(res => console.log(res.data));
            this.setState({
                items: this.state.items.filter(el => el._id !== id)
            })
            window.location = '/ItemsList'
>>>>>>> 9019bf55cdfc8d3f97ab71ded4feb90c84948c4b
        }
    
        itemsList() {
            let listedItems = (this.state.filteredItems.length > 0)? this.state.filteredItems : this.state.items 
            return listedItems.map(currentItem => {
                return <ClothesItem item = { currentItem } deleteItem = { this.deleteItem } key = { currentItem._id }/>; 
            })
        } 
            
        onChangeCategory(e) {
                let { items } = this.state
                let string = e.target.value
                this.setState(
                {
                  category: e.target.value,
                  type: ""
                }
                ) 
                  
                let filteredItems = items.filter(item => item.category.includes(string))
                this.setState({filteredItems:filteredItems})
                console.log(string)
          }


          onChangeType(e) {
            let { items } = this.state
            let string = e.target.value
            this.setState(
            {
              type: e.target.value

            },
            ) 
            
            let filteredItems = items.filter(item => item.type.includes(string) && item.category.includes(this.state.category))
            if (filteredItems.length > 0) {
               this.setState({filteredItems:filteredItems}) 
            
            console.log(string)
            console.log(filteredItems)
            }
            // else {this.setState({items:[]})
             else {this.setState({filteredItems:[]})
            
          }
        }
        
    
        render() {
    
            return (
                <div>
                <br />
                <div className = "container text-center border border-light p-9">
                    <h2>Clothing</h2>
                    {/* <input name="search" className="form-control" onChange={e => this.onSearch(e)} value={this.state.SearchString}  placeholder="Search for item Name"/> */}
                    <label>
                    Select Category:
                    <select
                    ref = "userInput"
                    required="{true}"
                    className = "form-control"
                    value = {this.state.category}
                    onChange = {this.onChangeCategory.bind(this)}
                    >
                    <option value = "">Select Category</option>
                    <option value = "Women">Women</option>
                    <option value = "Men">Men</option>
                    <option value = "Kids">Kids</option>
                    </select>
                    </label>
                    <label>Select Type:  
                    <select
                    ref = "userInput2"
                    required="{true}"
                    className = "form-control"
                    value = {this.state.type}
                    onChange = {this.onChangeType.bind(this)}
                    >
                    <option value = "">Select Cloth Type</option>
                    <option value = "Shoes">Shoes</option>
                    <option value = "Dress">Dress</option>
                    <option value = "Jacket">Jacket</option>
                    <option value = "Blouse">Blouse</option>
                    <option value = "Gloves">Gloves</option>
                    <option value = "Hat">Hat</option>
                    <option value = "Scarf">Scarf</option>
                  </select>
                  </label>
                    <table className = "table">
                    <thead className = "thead">
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemsList()}
                    </tbody>
                    </table>
                </div>
                <Footer />
                </div>
            )
        }
    }

    export default withRouter(ItemsList) 
    
