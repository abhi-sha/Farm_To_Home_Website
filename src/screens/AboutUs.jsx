import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { appContext } from '../App'
import './AboutUs.css'
const AboutUs = () => {
const {mode}=useContext(appContext)
  return (
    <div  className={`${mode}about`}style={{ minHeight:"100vh"}}>
        <Navbar></Navbar>
        <div style={{textAlign:'center',marginTop:"30px",width:"70%",border:"1px solid gray",marginLeft:'auto',marginRight:"auto",marginTop:'50px'}}>
          <h2 style={{marginTop:"20px"}}>ABOUT ME</h2>
          <div style={{textAlign:"left",padding:'20px'}}>
          HELLO MY NAME IS ABHINAV SHARMA. I HAVE DONE MY BTECH IN CSE BRANCH FROM JAYPEE INSTITUTE OF INFORMATION TECHNOLOGY WITH A CGPA OF 7.9 .THIS IS MY PROJECT .
           IT IS BASICALLY A FOOD ORDERING SITE FOR FARM ITEM .
           </div>
           <h2>CODE FLOW</h2>
           <div  style={{textAlign:"left",padding:'20px'}}>
            <ol> 
              <li> <b>HOME PAGE </b>:<ol type="a"> 
                <li> <b>Carousal </b>: Carousal will be showing images related to Food items. It is having option of manually changing photo as well as automatic images get changed.</li>
                <li><b>Search</b>: In this search you can search for any item you want to order and only that item will be displayed below it (search by item name like Mango,Potato).</li>
                <li><b>Card</b>: This is my self created component i am calling this card for displaying  all data using a map and data is coming from mongoDB backend.</li>
                <li><b>Add to Cart button</b>: This will add that particular item to the cart once you click this button you will se cart size changing in Navbar as well.</li>
                
                </ol>
                </li>
                <li><b>REGISTER PAGE </b><ol type='a'>
                  <li>This is for new user you have to enter your name ,email ID,and set your password. </li>
                  <li>It has a validation using express validator for mail and password . Mail should have a valid domain name and password must be off atleast 5 length. </li>
                  <li>Once user register his details will be stored in mongoDB backend and will be directed to login page.</li>
                  <li>I have also applied a validation that will not allow user to register again with same mail id if he has done it already.</li>
                
                </ol></li>
                
                <li><b>LOGIN PAGE</b> 
                <ol type='a'>
                <li>
                  It will require you to add your mail and password once added you will be directed to home page and then you can buy anything.
                </li>

                </ol>
                </li>
                <li><b>CART PAGE</b>
                <ol type='a'>
                  <li>This will show current cart item , total and a checkout button to place your order. </li>
                  <li>If you have not login and try to place your order than it will show an alert and direct you to login page. </li>
                  <li>Your cart will be stored in local storage so it won't disappear once you refresh the page. </li>
            
                </ol>
                </li>
                <li><b>MY ORDERS PAGE</b>
                <ol type='a'>
                  <li>This page button will only show when you are logged in. </li>
                  <li>This will show all your order segregated based on time when you placed this order. </li>
                </ol>
                </li>
                <li><b>DARK MODE /LIGHT MODE</b>
                <ol type='a'>
                  <li>This button will help you change the theme of page. </li>
                  <li>Your selected mode will be stored in local storage so this mode won't change even if you refresh the page. </li>
            
                </ol>
                </li>
                </ol> 
             </div>
        </div>
        </div>
  )
}

export default AboutUs