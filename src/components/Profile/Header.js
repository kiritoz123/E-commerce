import React from "react";
import "./header.css";
import logo from "../../assets/icons/logo.png";
import profile from "../../assets/image/bear.jpg";
import filter from "../../assets/icons/filter.png";
import cart from "../../assets/icons/cart.png";
import bell from "../../assets/icons/bell.png";
import message from "../../assets/icons/message.png";

export default function HeaderProfile() {
  return (
    <>
      <div className='header'>
        <div className='search-container'>
          <div className='logo-container'>
            <img src={logo} className='logo' alt='' />
            {/* <h6 className='logotext'>Blanja</h6> */}
          </div>
          <div className='search'>
            <input
              id='input'
              placeholder='Search'
              type='search'
              // onChange={(e)=>this.handleSearch(e)}
              // onKeyPress={(e)=>this.handleSearch(e)}
            />
            <i className='fa fa-search' aria-hidden='true'></i>
          </div>
          <div className='filter-container'>
            <img src={filter} alt='' />
            {/* <i className='material-icons'>filter_alt-outline</i> */}
          </div>
        </div>
        <div className='menu'>
          {/* <div className='list-group'> */}
          <a href='#' className='menu-item'>
            <img src={cart} alt='' />
            {/* <i className='fa fa-shopping-cart fa-lg' aria-hidden='true'></i> */}
          </a>
          <a href='#' className='menu-item'>
            <img src={bell} alt='' />
            {/* <i className='fa fa-bell-o fa-lg' aria-hidden='true'></i> */}
          </a>
          <a href='#' className='menu-item'>
            <img src={message} />
            {/* <i className='fa fa-envelope-o fa-lg' aria-hidden='true'></i> */}
          </a>
          <a href='https://www.google.com' className='profile'>
            <img src={profile} alt='' />
          </a>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
