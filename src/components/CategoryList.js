import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom" ;
import axios from "axios";
import Footer from './Footer';

//
const ClothesItem = props => (
    <tr>
        <td>{props.item.itemName}</td>
        <td>{props.item.category}</td>
        <td>{props.item.type}</td>
        <td>{props.item.description}</td>
        
        <td>
        <img src= {props.item.image} width="200" height="200" class="w3-round" alt="Norway"/>
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

class CategoryList extends Component {

    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            items: [],
            filteredCategory :[],
            SearchString:'',
        }
    }

    componentDidMount() {
         axios.get("http://localhost:3000/addItems/")   
            .then( res => {
                this.setState({items: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id) {
        axios.delete("http://localhost:3000/addItems/" + id)
            .then(res => console.log(res.data));
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    categoryList() {
        let listedCategory = (this.state.filteredCategory.length > 0)? this.state.filteredCategory : this.state.items; 

        return listedCategory.map(currentItem => {
            return <ClothesItem item = { currentItem } deleteItem = { this.deleteItem } key = { currentItem._id }/>; 
        })
    } 

    onSearch = e => {
        let { items } = this.state
        let string = e.target.value
        if(string.length > 0){
           let filteredCategory = items.filter(item => item.category.includes(string))
           this.setState({SearchString:string,filteredCategory:filteredCategory})
        }
        else this.setState({SearchString:string,filteredCategory:[]})
    }


    render() {

        return (
            <div>
            <br />
            <div className = "container text-center border border-light p-9">
                <h2>Clothing</h2>
                <input name="search" className="form-control" onChange={e => this.onSearch(e)} value={this.state.SearchString}  placeholder="Search for item Category"/>
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
                    {this.categoryList()}
                </tbody>
                </table>
            </div>
            <Footer />
            </div>
        )
    }
}

export default withRouter(CategoryList)