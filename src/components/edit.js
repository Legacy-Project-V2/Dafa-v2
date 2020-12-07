import React, { Component } from 'react';
import axios from "axios";



export default class EditItems extends Component {
  constructor(props) {
    super(props);

    //Defining the "this" in the functions using .bind method
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeimg = this.onChangeimg.bind(this);
    this.onChangetype = this.onChangetype.bind(this);

    this.state = {
      itemName: "",
      category : "Women",
      description: "",
      image : "",
      type:"Jacket",
    
    }
  }


  componentDidMount() {
    axios.get('http://localhost:3000/addItems/'+this.props.match.params.id)

    
      .then(response => {
        this.setState({
          itemName: response.data.itemName,
          category: response.data.category,
          description: response.data.description,
          image: response.data.image,
          type: response.data.type,
        })  

      })
      .catch(function (error) {
        console.log(error);
      })
    }

  //List of category
  //Event Handlers:
  onChangeItemName(e) {
    this.setState({
      itemName: e.target.value
    });
  }

  onChangeCategory(e) {
    const { value } = e.target
    this.setState({
      category : value
    });
  }
  onChangetype(e){
    const { value } = e.target
    this.setState({
     type: value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeimg(e) {
    this.setState({
      image : e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const item = {
      itemName: this.state.itemName,
      category: this.state.category,
      description: this.state.description,
      type:this.state.type,
      image:this.state.image
    }

    console.log(item);

    axios.post("http://localhost:3000/addItems/update/"+this.props.match.params.id, item)
      .then(res => console.log(res.data));

    window.location = '/ItemsList'
  }

  render() {
    return (
        <div className = "container">

          <form className="text-center border border-light p-5" action="#!" onSubmit = {this.onSubmit}>

            <h3> "Only by giving are you able to receive more than you already have." -Jim Rohn </h3>

            <p className="h4 mb-4">Edit Your Item</p>

                <div className="col">
                <label>Item Name</label>
                <input 
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.itemName} 
                  onChange = {this.onChangeItemName}
                  text-align = "center"
                  // placeholder = "Insert Item Name"
                  />
                </div>

                <br />

                <div className="col">
                  <label>Select Category  </label>
                  <select
                    ref = "userInput"
                    required
                    className = "form-control"
                    value = {this.state.category}
                    onChange = {this.onChangeCategory}
                    >
                    <option value = "Women">Women</option>
                    <option value = "Men">Men</option>
                    <option value = "Kids">Kids</option>
                  </select>
                </div>

                <br />
                <div className = "type">
            <label>Select Type  </label>
            <select
              ref = "userInput"
              required
              className = "form-control"
              value = {this.state.type}
              onChange = {this.onChangetype}
              >
              <option value = "Shose">Shose</option>
              <option value = "Dress">Dress</option>
              <option value = "Jacket">Jacket</option>
              <option value = "Blouse">Blouse</option>
              <option value = "Gloves">Gloves</option>
              <option value = "Hat">Hat</option>
              <option value = "Scarf">Scarf</option>
            </select>
          </div> 
          <br />

                <div className = "col">
                  <label>Description  </label>
                  <input 
                    type = "text" 
                    className = "form-control" 
                    value = {this.state.description} 
                    onChange = {this.onChangeDescription}
                    placeholder = "Please insert a detailed description of your item and add its current condition"/>
                </div>

                <br />
                
         <div >
         <div className = "addimg">
            <label>Add Image URL</label>
            <input 
              type = "text" 
              className = "form-control"
              value = {this.state.image} 
              onChange = {this.onChangeimg}/>
          </div>
        
</div>   

                <div>
                <button type="submit" value = "Submit" className="btn btn-dark">Edit</button>
                </div>

        </form>
        </div>
        
    )
  }
}