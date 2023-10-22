import React, {useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import $ from 'jquery';	
// import '../../../admin/assets/plugins/metismenu/css/metisMenu.min.css';

const Sidebar = ()=>{

	useEffect(()=>{
		
		// for (var i = window.location, o = $(".metismenu li a").filter(function () {
		// 	return this.href == i;
		// }).addclassName("").parent().addclassName("mm-active");;) {
		// 	if (!o.is("li")) break;
		// 	o = o.parent("").addclassName("mm-show").parent("").addclassName("mm-active");
		// }

		// metismenu
		// $('#menu').metisMenu();

		$('.metismenu > li > a').on('click',function(){
			$(this).closest('li').find('.mm-collapse').slideToggle();
		})

	}, [])

    return(
        <>
        <div className="sidebar-wrapper" data-simplebar="true">
			<div className="sidebar-header">
				<div>
					<img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
				</div>
				<div>
					<h4 className="logo-text">Synadmin</h4>
				</div>
				<div className="toggle-icon ms-auto"><i className='bx bx-first-page'></i>
				</div>
			</div>
			{/* <!--navigation--> */}
			<ul className="metismenu" id="menu">
				<li>
					<NavLink to='/admin'>
						<div className="parent-icon">
							<i className='bx bx-home'></i>	
						</div>
						<div className="menu-title">Dashboard</div>
					</NavLink>
				</li>

				<li className="menu-label">Products</li>
				<li>
					<a href="#" className="has-arrow" aria-expanded="false">
						<div className="parent-icon"><i className='bx bx-cart-alt' ></i>
						</div>
						<div className="menu-title">E-commerce</div>
					</a>
					<ul className='mm-collapse'>
						<li> 
							<NavLink href="ecommerce-products.html">
								<i className="bx bx-right-arrow-alt"></i>
								Products
							</NavLink>
						</li>
						<li> 
							<NavLink href="ecommerce-products-details.html">
								<i className="bx bx-right-arrow-alt"></i>
								Product Details
							</NavLink>
						</li>
						<li>
							<NavLink to="/admin/add-products">
								<i className="bx bx-right-arrow-alt"></i>
								Add New Products
							</NavLink>
						</li>
						<li> 
							<NavLink href="ecommerce-orders.html">
								<i className="bx bx-right-arrow-alt"></i>
								Orders
							</NavLink>
						</li>
					</ul>
				</li>
				<li className="menu-label">Pages</li>
				<li>
					<a className="has-arrow" href="#" aria-expanded="false">
						<div className="parent-icon"><i className='bx bx-lock-open-alt'></i>
						</div>
						<div className="menu-title">Authentication</div>
					</a>
					<ul className='mm-collapse'>
						<li> 
							<NavLink to="/admin/users">
								<i className="bx bx-right-arrow-alt"></i>Users
							</NavLink>
						</li>
						
						<li> <a href="authentication-signin.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Sign In</a>
						</li>
						<li> <a href="authentication-signup.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Sign Up</a>
						</li>
						<li> <a href="authentication-signin-with-header-footer.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Sign In with Header & Footer</a>
						</li>
						<li> <a href="authentication-signup-with-header-footer.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Sign Up with Header & Footer</a>
						</li>
						<li> <a href="authentication-forgot-password.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Forgot Password</a>
						</li>
						<li> <a href="authentication-reset-password.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Reset Password</a>
						</li>
						<li> <a href="authentication-lock-screen.html" target="_blank"><i className="bx bx-right-arrow-alt"></i>Lock Screen</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="user-profile.html">
						<div className="parent-icon"><i className='bx bx-user-pin' ></i>
						</div>
						<div className="menu-title">User Profile</div>
					</a>
				</li>
			</ul>
		</div>
        </>
    )
}

export default Sidebar;
