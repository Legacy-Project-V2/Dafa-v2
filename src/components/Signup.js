import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';

//creat a class for the sign up component 
export default class Signup extends Component {
    constructor(props) {
        super(props);
            
        //bind functions, you can use this.function without the need to bind it everytime
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
      
        this.onSubmit = this.onSubmit.bind(this);
      //the keys are the same as the Schema .. see the modle userSchema in user.model.js line 6 or so.
      //this will work as blue prent to our state
        this.state = {
            username: '',
            password:'',
            phone:'',
            address:''
          }

        }
        //onChance function to track the changes and help to set (change) the state .
          onChangeUsername(e) {
            
            this.setState({
             username : e.target.value 

            })
          }
          onChangePassword(e) {
            
            this.setState({
            password : e.target.value
            })
          }
          onChangePhone(e) {
            
            this.setState({
                phone : e.target.value
            })
          }
          onChangeAddress(e) {
            
            this.setState({
                address : e.target.value
            })
          }
          onSubmit(e) {
            e.preventDefault();
        //where we set the state and send it in the post request
            const user = {
              username: this.state.username,
              password: this.state.password,
              phone: this.state.phone,
              address: this.state.address
            }
            //post request tosend the data to the serverwhereitwill be saved
            //this condetion to prevent users from creating short user name for securty
            // if (this.state.username.length < 4 ){
            // alert('please choose another name')
            // }
            //the input should be a number this should give the user an alreat if they type anything not a number
            // if (this.state.phone !== number){
            //   alert('please make sure to fill in phone with numbers only')
            // }
            //add conctions if the user name already taken
            //if(this.state.username )
           
            axios.post("http://localhost:3000/addUser/adduser", user)
            .then(res => {
            // console.log(user);

            window.location = '/login'
           console.log(window.location)

            })  
             
           .catch(err => alert('user name or phone number is used') );
          

            //console.log('user added')   
        }
        
        
          

//where the magic happence
    render(){
        return (

          <div>
            <br />
            <div className = "container text-center">
            <form className="text-center border border-light p-9" onSubmit={this.onSubmit}>
                <h3 className = "mb-3">
                Sign Up
                </h3>
                <br />
                <div className = "col">
                <label > User Name </label>
                <br></br>
                <input required='{true}' type='text'className="form-control col"value= {this.setState.username}onChange={this.onChangeUsername} placeholder='User Name'/>                   
                <br></br>                
                </div>



                <div className = "col">
                <label > Creat Password </label>
                <br></br>
                <input required='{true}'  type="password" name="password" className="form-control col"value= {this.setState.password} onChange={this.onChangePassword} placeholder='Creat Password' />
                <br></br>
                </div>

                <div className = "col">
                <label > Phone Number </label>

                <input required='{true}'  className="form-control col"  value= {this.setState.phone} onChange={this.onChangePhone} placeholder='Phone Number' />
                <br></br>
                </div>

                <div className = "col">
                <label > Address </label>
                <br></br>
                <input required='{true}' type='text' className="form-control col" value= {this.setState.address} onChange={this.onChangeAddress} placeholder='Address' />
                <br></br>
                </div>

                <input type='submit' value='Creat Account' className="btn btn-deep-orange darken-4"/>
                <br></br>
                <br></br>
                <b>If you already have an account<a href='/login'> Log In </a></b>
                <br></br>
            </form>
       
            </div>
            <Footer />
            </div>
          
         
        )
    }
}


