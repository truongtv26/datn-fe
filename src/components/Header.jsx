import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../provider/AppProvider';
import Cookies from 'js-cookie';
const Header = () => {
	const [darkMode, setDarkMode] = useState(false);
	const {user,
		 setUser} = useAppContext()
	const handleThemeToggle = () => {
		const bodyElement = document.body;
		if (darkMode === true) {
			bodyElement.setAttribute('data-theme', 'light');
		} else {
			bodyElement.setAttribute('data-theme', 'dark');
		}
		setDarkMode(!darkMode)
	}

	return (
		<header id="masthead" className="site-header  header-type2">
			<div className="header-desktop min-1200">

				<div
					className="header-row header-topbar color-scheme-light color-layout-custom dark-blue bordered-bottom border-light-15">
					<div className="container">
						<div className="header-inner d-flex">

							<div className="col d-inline-flex align-items-center col-auto">
								<nav
									className="klb-menu-nav horizontal color-scheme-white border-gray sub-shadow-md triangle-enable">
									<ul id="menu-top-left" className="klb-menu">
										<li id="menu-item-4295"
											className="klb-icon-box-iso-thin menu-item menu-item-type-post_type menu-item-object-page menu-item-4295">
											<a href="order-tracking/index.html">Track Order</a></li>
										<li id="menu-item-4336"
											className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4336">
											<a href="about-us/index.html">About Us</a></li>
										<li id="menu-item-4337"
											className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4337">
											<a href="contact/index.html">Contact</a></li>
										<li id="menu-item-4338"
											className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4338">
											<a href="faq/index.html">FAQ</a></li>
									</ul>
								</nav>
							</div>

							<div className="col d-inline-flex align-items-center justify-content-end">


								<div className="header-notify link-filled">
									<i className="klb-delivery-icon-motocycle"></i>
									<p>We deliver to you every day from <a href="#"
										className="color-green-light">7:00 to 23:00</a></p>
								</div>


								<nav
									className="klb-menu-nav horizontal color-scheme-white border-gray sub-shadow-md triangle-enable">
									<ul id="menu-top-right" className="klb-menu">
										<li id="menu-item-4240"
											className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4240">
											<a href="#">English</a>
											<ul className="sub-menu">
												<li id="menu-item-4242"
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4242">
													<a href="#">Spanish</a></li>
												<li id="menu-item-4241"
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4241">
													<a href="#">French</a></li>
												<li id="menu-item-4243"
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4243">
													<a href="#">German</a></li>
											</ul>
										</li>
										<li id="menu-item-4258"
											className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4258">
											<a href="#">USD</a>
											<ul className="sub-menu">
												<li id="menu-item-4259"
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4259">
													<a href="#">EUR</a></li>
												<li id="menu-item-4260"
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4260">
													<a href="#">INR</a></li>
												<li id="menu-item-4261"
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4261">
													<a href="#">GBP</a></li>
											</ul>
										</li>
									</ul>
								</nav>

								<div className="theme-toggle">
									<a href="#" className="theme-mode-toggle" onClick={() => { handleThemeToggle() }}>
										<div className="toggle-icon header-light-background"><i
											className="klb-icon-sun-light"></i></div>
										<div className="toggle-text">
											<span className="dark-theme">Dark Theme</span>
											<span className="light-theme">Light Theme</span>
										</div>
									</a>
								</div>

							</div>

						</div>
					</div>
				</div>

				<div className="header-row header-main color-scheme-light color-layout-custom dark-blue">
					<div className="container">
						<div className="header-inner d-flex">

							<div className="col d-inline-flex align-items-center col-auto">
								<div className="site-brand">


									<a href="index.html" title="Grocery eCommerce Theme">
										<img width="535" height="133"
											src="/754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/10/logo-grocery.png"
											alt="Grocery eCommerce Theme"
											data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/10/logo-grocery.png" /><noscript><img
												width="535" height="133"
												src="/754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/10/logo-grocery.png"
												alt="Grocery eCommerce Theme" /></noscript>
									</a>
								</div>
							</div>

							<div className="col d-inline-flex align-items-center center">

								<div className="header-action location-button row-style bordered">
									<a href="#" className="action-link">
										<div className="action-icon">
											<i className="klb-ecommerce-icon-location"></i>
										</div>
										<div className="action-text">
											<span>Deliver to</span>
											<p>Select Location</p>


										</div>
									</a>
								</div>



								<div className="header-search-form header-search-overlay">
									<form action="https://klbtheme.com/blonwe/grocery/"
										className="search-form form-style-primary search-type-2" role="search"
										method="get" id="searchform"><input
											className="form-control search-input variation-filled" type="search"
											name="s" defaultValue="" placeholder="Search for products..."
											autoComplete="off" /><button type="submit" className="unset"><i
												className="klb-icon-search-feather"></i></button><input
											type="hidden" name="post_type" defaultValue="product" /></form>
									<div className="header-search-results"><span
										className="search-results-heading">Trending:</span>
										<ul className="search-keywords tag-style">
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=organic">organic
											</a></li>
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=fresh">fresh
											</a></li>
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=great">great
											</a></li>
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=B5UEO3E8">B5UEO3E8
											</a></li>
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=food">food
											</a></li>
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=alaska">alaska
											</a></li>
											<li><a
												href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=shower">shower
											</a></li>
										</ul>
									</div>
								</div>
							</div>

							<div className="col d-inline-flex align-items-center col-auto">


								<div className="header-action login-button row-style popup">
									{Cookies.get('authToken') ? <>
									<div className="action-icon">
											<i className="klb-icon-user-cut"></i>
										</div>
										<div className="action-text">
											<span>{user.name}</span>
											<button onClick={()=> {
												Cookies.remove('authToken')
												setUser({})
												}}>logout</button>
										</div>
										</>
										: <Link to={'/login'} className="action-link">
										<div className="action-icon">
											<i className="klb-icon-user-cut"></i>
										</div>
										<div className="action-text">
											<span>Login</span>
											<p>Account</p>
										</div>
									</Link>}
									
								</div>





								<div className="header-action wishlist-button row-style">
									<a href="wishlist/index.html" className="action-link">
										<div className="action-icon">
											<i className="klb-icon-heart-outline"></i>
											<div className="action-count klbwl-wishlist-count">1</div>
										</div>
									</a>
								</div>






								<div className="header-action compare-button row-style">
									<a href="compare/index.html" className="action-link">
										<div className="action-icon">
											<i className="klb-icon-compare-product"></i>
											<div className="action-count klbcp-count">0</div>
										</div>
									</a>
								</div>





								<div className="header-action cart-button custom-dropdown row-style default"
									data-placement="right">
									<a href="cart/index.html" className="action-link custom-dropdown-link"
										tabIndex="0" role="button" aria-expanded="false">
										<div className="action-icon">
											<i className="klb-icon-italic-shop"></i>
											<div className="action-count cart-count count">0</div>
										</div>
									</a>
									<div className="dropdown-menu custom-dropdown-menu hide">
										<div className="custom-dropdown-body">

											<div className="cart-not-empty">
												<div className="fl-mini-cart-content">



													<div className="cart-empty">
														<div className="empty-icon">
															<svg version="1.1" id="Layer_1"
																xmlns="http://www.w3.org/2000/svg"
																xmlnsXlink="http://www.w3.org/1999/xlink"
																x="0px" y="0px" viewBox="0 0 56 56"
																enableBackground="new 0 0 56 56"
																xmlSpace="preserve">
																<g>
																	<path d="M0.4,27.6c0.4-0.9,1.2-1.2,2.2-1.2c5.4,0,10.8,0,16.3,0c0.8,0,1.4,0.2,2,0.8c2.2,2.3,4.5,4.5,6.7,6.8
				  c0.1,0.1,0.2,0.3,0.4,0.5c0.2-0.2,0.4-0.4,0.5-0.5c2.3-2.3,4.6-4.5,6.8-6.8c0.5-0.5,1.1-0.7,1.8-0.7c5.6,0,11.1,0,16.7,0
				  c0.8,0,1.5,0.2,1.8,1c0.3,0.8,0,1.4-0.6,2c-2.5,2.5-5,5-7.6,7.5c-0.3,0.3-0.4,0.6-0.4,1c0,5.2,0,10.4,0,15.6c0,1-0.3,1.7-1.3,2.1
				  c-11.8,0-23.6,0-35.4,0c-1-0.4-1.3-1.1-1.3-2.1c0-5.2,0-10.4,0-15.7c0-0.4-0.1-0.7-0.4-0.9c-2.4-2.4-4.8-4.8-7.2-7.2
				  c-0.4-0.4-0.7-0.8-1-1.3C0.4,28.1,0.4,27.9,0.4,27.6z M12.3,38.3c0,4.7,0,9.4,0,14c4.7,0,9.4,0,14,0c0-4.7,0-9.4,0-14
				  C21.7,38.3,17,38.3,12.3,38.3z M43.7,38.3c-4.7,0-9.4,0-14,0c0,4.7,0,9.4,0,14c4.7,0,9.4,0,14,0C43.7,47.6,43.7,43,43.7,38.3z
				  M24.1,35c-1.8-1.8-3.5-3.5-5.3-5.2c-0.1-0.1-0.4-0.2-0.6-0.2c-3.9,0-7.9,0-11.8,0c-0.1,0-0.3,0-0.5,0c1.7,1.7,3.4,3.4,5,5
				  c0.3,0.3,0.5,0.4,0.9,0.4c3.8,0,7.7,0,11.5,0C23.6,35,23.8,35,24.1,35z M32,35c0.2,0,0.3,0,0.4,0c4,0,8,0,12,0
				  c0.2,0,0.4-0.1,0.6-0.3c1.6-1.6,3.2-3.2,4.8-4.8c0.1-0.1,0.2-0.2,0.3-0.3c-0.1,0-0.1,0-0.2,0c-4.1,0-8.1,0-12.2,0
				  c-0.2,0-0.4,0.1-0.5,0.2C35.4,31.5,33.7,33.2,32,35z" />
																	<path d="M29.6,24.9c0,0.4,0,0.8,0,1.1c0,1-0.6,1.8-1.6,1.8c-0.9,0-1.6-0.7-1.7-1.7c-0.1-2.8-0.4-5.6-1.1-8.3
				  c-0.5-2.2-1.3-4.3-2.6-6.2c-1.5-2-3.4-3.1-5.9-2.8c-1.7,0.2-3,0.9-3.5,2.6c-0.5,1.7,0.1,3.1,1.4,4.3c1.4,1.2,3.1,1.7,4.8,1.9
				  c0.5,0.1,1,0.1,1.6,0.1c0.9,0,1.5,0.7,1.6,1.5c0.1,0.8-0.6,1.7-1.4,1.7c-3.8,0-7.3-0.8-9.8-3.9c-1.7-2.2-2.1-4.6-1-7.2
				  c1.1-2.5,3.2-3.8,5.9-4.1c3.9-0.5,6.9,1.1,9.1,4.3c1.7,2.4,2.6,5.1,3.2,7.9C29.1,20.2,29.4,22.6,29.6,24.9
				  C29.7,24.9,29.6,24.9,29.6,24.9z" />
																	<path d="M34.2,21c-0.3,0-0.6,0-0.9,0c-1,0-1.7-0.7-1.7-1.6c0-0.9,0.7-1.6,1.7-1.6c1.9,0,3.8-0.2,5.6-0.9c1.2-0.5,2.2-1.1,3.1-2
				  c3.1-3.2,2.1-7.5-2.2-8.8c-1-0.3-2-0.4-3-0.5c-1-0.1-1.8-0.8-1.7-1.7c0-0.9,0.8-1.6,1.8-1.6c2.1,0,4.2,0.4,6,1.6
				  c4.6,2.8,5.5,8.8,1.9,12.8c-2,2.2-4.5,3.4-7.4,4C36.3,20.8,35.3,20.9,34.2,21C34.2,21,34.2,21,34.2,21z" />
																	<path
																		d="M29.7,1.5C30,1.2,30.2,1,30.5,0.8c0.7-0.5,1.5-0.5,2.1,0.1c0.6,0.6,0.7,1.5,0.2,2.1c-0.6,0.7-1.3,1.4-2,2.1
				  c-0.6,0.5-1.5,0.4-2-0.1c-0.6-0.6-1.2-1.2-1.8-1.8c-0.6-0.7-0.6-1.6,0-2.2c0.6-0.6,1.5-0.7,2.2-0.1C29.3,1,29.5,1.2,29.7,1.5z" />
																</g>
															</svg>
														</div>
														<div className="empty-text">No products in the cart.
														</div>
													</div>


												</div>
											</div>

											<div className="cart-discount">
												<p>Free Shipping on All Orders <strong>Over $100</strong>
												</p>
											</div>


										</div>
									</div>
								</div>


							</div>

						</div>
					</div>

				</div>

				<div className="header-row header-bottom color-scheme-light color-layout-custom dark-blue">
					<div className="container">
						<div className="header-inner d-flex">
							<div className="col d-inline-flex align-items-center">

								<nav
									className="klb-menu-nav horizontal primary-menu color-scheme-white border-gray sub-shadow-md triangle-enable">
									<ul id="menu-menu-2" className="klb-menu">
										<li
											className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-3462 current_page_item menu-item-4278">
											<a href="index.html">Home</a></li>
										<li
											className="mega-menu mega-menu-boxed menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4279">
											<a href="shop/index.html">Shop</a>
											<ul className="sub-menu">
												<li
													className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4280">
													<a href="shop/index.html">Shop Lists</a>
													<ul className="sub-menu">
														<li
															className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4281">
															<a href="shop/index.html">Shop Default</a>
														</li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4233">
															<a
																href="shop/indexa27e.html?opt=right-sidebar">Shop
																Right Sidebar</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4234">
															<a
																href="shop/indexb856.html?column=5&amp;opt=wide">Shop
																Wide</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4235">
															<a
																href="shop/index5e81.html?column=5&amp;opt=full-width">Filters
																Area</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4236">
															<a
																href="shop/index77be.html?shop_view=list_view">List
																Left Sidebar</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4237">
															<a href="shop/index7006.html?ft=load-more">Load
																More Button</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4238">
															<a href="shop/index87c9.html?ft=infinite">Infinite
																Scrolling</a></li>
													</ul>
												</li>
												<li
													className="menu-item menu-item-type-post_type menu-item-object-product menu-item-has-children menu-item-4502">
													<a
														href="product/the-famous-grouse-finest-blended-scotch-whisky/index.html">Product
														Detail</a>
													<ul className="sub-menu">
														<li
															className="menu-item menu-item-type-post_type menu-item-object-product menu-item-4503">
															<a
																href="product/the-famous-grouse-finest-blended-scotch-whisky/index.html">Product
																Default</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-product menu-item-4499">
															<a
																href="product/yellow-fresh-pear-up-to-500g/index.html">Product
																Variable</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-product menu-item-4505">
															<a
																href="product/frozen-beef-cheese-mini-tacos/index.html">Product
																Grouped</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-product menu-item-4506">
															<a
																href="product/persil-color-laundry-gel-1-95l/index.html">Product
																External</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-product menu-item-4507">
															<a
																href="product/milka-mini-cookies-with-pieces-of-chocolate-partially-covered-with-milk-chocolate-100g/index.html">Product
																Downloadable</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-product menu-item-4508">
															<a
																href="product/pasta-barilla-chifferi-rigati-n-41/index.html">Product
																With Video</a></li>
													</ul>
												</li>
												<li
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4239">
													<a href="#">Shop Pages</a>
													<ul className="sub-menu">
														<li
															className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4290">
															<a href="cart/index.html">Cart</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4291">
															<a href="checkout/index.html">Checkout</a>
														</li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4292">
															<a href="my-account/index.html">My
																account</a></li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4293">
															<a href="wishlist/index.html">Wishlist</a>
														</li>
														<li
															className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4294">
															<a href="order-tracking/index.html">Order
																Tracking</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4244">
															<a href="shop/index7014.html?featured=yes">Featured
																Products</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4245">
															<a
																href="shop/index5156.html?orderby=popularity">Best
																Selling Products</a></li>
													</ul>
												</li>
												<li
													className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4246">
													<a href="#">Shop Layouts</a>
													<ul className="sub-menu">
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4247">
															<a href="shop/index3117.html?column=2">Two
																Columns</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4248">
															<a href="shop/index4e28.html?column=3">Three
																Columns</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4249">
															<a
																href="shop/indexfd91.html?column=3&amp;opt=wide">Three
																Columns Wide</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4250">
															<a href="shop/indexe546.html?column=4">Four
																Columns</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4251">
															<a
																href="shop/indexefb6.html?column=4&amp;opt=wide">Four
																Columns Wide</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4252">
															<a
																href="shop/indexb856.html?column=5&amp;opt=wide">Five
																Columns Wide</a></li>
														<li
															className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4253">
															<a
																href="shop/index2e6e.html?column=6&amp;opt=wide">Six
																Columns Wide</a></li>
													</ul>
												</li>
											</ul>
										</li>
										<li
											className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4439">
											<a href="shop/index0b1c.html?filter_cat=150">Frozen Foods</a>
										</li>
										<li
											className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4440">
											<a href="shop/index9f2a.html?filter_cat=123">Beverages</a></li>
										<li
											className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4441">
											<a href="shop/index93de.html?filter_cat=134">Bakery</a></li>
										<li
											className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4399">
											<Link to={'blog/123'}>Blog</Link></li>
									</ul>
								</nav>



								<div className="custom-button custom-button-menu">
									<a href="#" className="has-dropdown"><i
										className="klb-ecommerce-icon-discount-bold"></i>Best Discounts</a>
									<div className="sub-menu mega-menu">
										<div className="container">
											<div className="mega-header">
												<h3 className="entry-title">The best discounts this week</h3>
												<div className="entry-description">
													<p>Every week you can find the best discounts here.</p>
												</div>
											</div>


											<div className="products">



												<div className="product">
													<div className="product-wrapper style-1">
														<div className="product-inner">
															<div className="thumbnail-wrapper entry-media">
																<div
																	className="thumbnail-badges product-badges">
																	<span
																		className="badge style-2 sale">22%</span>
																</div><a className="product-thumbnail"
																	href="product/the-famous-grouse-finest-blended-scotch-whisky/index.html"><img
																		width="300" height="300"
																		src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
																		className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																		alt="" decoding="async"
																		fetchpriority="high"
																		data-lazy-srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1.png 1500w"
																		data-lazy-sizes="(max-width: 300px) 100vw, 300px"
																		data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-300x300.png" /><noscript><img
																			width="300" height="300"
																			src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-300x300.png"
																			className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																			alt="" decoding="async"
																			fetchpriority="high"
																			srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1.png 1500w"
																			sizes="(max-width: 300px) 100vw, 300px" /></noscript></a>
															</div>
															<div className="content-wrapper price-filled">
																<span className="price"><del
																	aria-hidden="true"><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>14.00</bdi></span></del>
																	<ins><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>11.00</bdi></span></ins></span>
																<h2 className="product-title"><a
																	href="product/the-famous-grouse-finest-blended-scotch-whisky/index.html">The
																	Famous Grouse Finest Blended
																	Scotch Whisky</a></h2>
																<div className="product-rating style-2">
																	<div className="product-rating-inner">
																		<i className="klb-icon-star"></i>
																		<div className="review-count">4.67
																		</div>
																	</div>
																	<div className="rating-count"><span
																		className="count-text">3
																		Reviews</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>



												<div className="product">
													<div className="product-wrapper style-1">
														<div className="product-inner">
															<div className="thumbnail-wrapper entry-media">
																<div
																	className="thumbnail-badges product-badges">
																	<span
																		className="badge style-1 sale">14%</span>
																</div><a className="product-thumbnail"
																	href="product/signature-wood-fired-mushroom-and-caramelized-red-onion-frozen-pizza/index.html"><img
																		width="300" height="300"
																		src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
																		className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																		alt="" decoding="async"
																		data-lazy-srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47.png 1500w"
																		data-lazy-sizes="(max-width: 300px) 100vw, 300px"
																		data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-300x300.png" /><noscript><img
																			width="300" height="300"
																			src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-300x300.png"
																			className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																			alt="" decoding="async"
																			srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47.png 1500w"
																			sizes="(max-width: 300px) 100vw, 300px" /></noscript></a>
															</div>
															<div className="content-wrapper price-filled">
																<span className="price"><del
																	aria-hidden="true"><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>7.49</bdi></span></del>
																	<ins><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>6.49</bdi></span></ins></span>
																<h2 className="product-title"><a
																	href="product/signature-wood-fired-mushroom-and-caramelized-red-onion-frozen-pizza/index.html">Signature
																	Wood-Fired Mushroom and
																	Caramelized Red Onion Frozen
																	Pizza</a></h2>
																<div className="product-rating style-2">
																	<div className="product-rating-inner">
																		<i className="klb-icon-star"></i>
																		<div className="review-count">4.33
																		</div>
																	</div>
																	<div className="rating-count"><span
																		className="count-text">3
																		Reviews</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>



												<div className="product">
													<div className="product-wrapper style-1">
														<div className="product-inner">
															<div className="thumbnail-wrapper entry-media">
																<div
																	className="thumbnail-badges product-badges">
																	<span
																		className="badge style-1 sale">47%</span>
																</div><a className="product-thumbnail"
																	href="product/shower-gel-le-petit-marseillais-vanilla-250ml/index.html"><img
																		width="300" height="300"
																		src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
																		className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																		alt="" decoding="async"
																		data-lazy-srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46.png 1500w"
																		data-lazy-sizes="(max-width: 300px) 100vw, 300px"
																		data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-300x300.png" /><noscript><img
																			width="300" height="300"
																			src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-300x300.png"
																			className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																			alt="" decoding="async"
																			srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46.png 1500w"
																			sizes="(max-width: 300px) 100vw, 300px" /></noscript></a>
															</div>
															<div className="content-wrapper price-filled">
																<span className="price"><del
																	aria-hidden="true"><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>4.30</bdi></span></del>
																	<ins><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>2.30</bdi></span></ins></span>
																<h2 className="product-title"><a
																	href="product/shower-gel-le-petit-marseillais-vanilla-250ml/index.html">Shower
																	gel LE PETIT MARSEILLAIS
																	Vanilla, 250ml</a></h2>
																<div className="product-rating style-2">
																	<div className="product-rating-inner">
																		<i className="klb-icon-star"></i>
																		<div className="review-count">4.67
																		</div>
																	</div>
																	<div className="rating-count"><span
																		className="count-text">3
																		Reviews</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>



												<div className="product">
													<div className="product-wrapper style-1">
														<div className="product-inner">
															<div className="thumbnail-wrapper entry-media">
																<div
																	className="thumbnail-badges product-badges">
																	<span
																		className="badge style-1 sale">25%</span>
																</div><a className="product-thumbnail"
																	href="product/pepperidge-farm-farmhouse-hearty-white-bread/index.html"><img
																		width="300" height="300"
																		src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
																		className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																		alt="" decoding="async"
																		data-lazy-srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42.png 1500w"
																		data-lazy-sizes="(max-width: 300px) 100vw, 300px"
																		data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-300x300.png" /><noscript><img
																			width="300" height="300"
																			src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-300x300.png"
																			className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																			alt="" decoding="async"
																			srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-42.png 1500w"
																			sizes="(max-width: 300px) 100vw, 300px" /></noscript></a>
															</div>
															<div className="content-wrapper price-filled">
																<span className="price"><del
																	aria-hidden="true"><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>3.99</bdi></span></del>
																	<ins><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>3.00</bdi></span></ins></span>
																<h2 className="product-title"><a
																	href="product/pepperidge-farm-farmhouse-hearty-white-bread/index.html">Pepperidge
																	Farm Farmhouse Hearty White
																	Bread</a></h2>
																<div className="product-rating style-2">
																	<div className="product-rating-inner">
																		<i className="klb-icon-star"></i>
																		<div className="review-count">4.00
																		</div>
																	</div>
																	<div className="rating-count"><span
																		className="count-text">3
																		Reviews</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className="product">
													<div className="product-wrapper style-1">
														<div className="product-inner">
															<div className="thumbnail-wrapper entry-media">
																<div
																	className="thumbnail-badges product-badges">
																	<span
																		className="badge style-1 sale">22%</span>
																</div><a className="product-thumbnail"
																	href="product/yellow-fresh-pear-up-to-500g/index.html"><img
																		width="300" height="300"
																		src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
																		className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																		alt="" decoding="async"
																		data-lazy-srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41.png 1500w"
																		data-lazy-sizes="(max-width: 300px) 100vw, 300px"
																		data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-300x300.png" /><noscript><img
																			width="300" height="300"
																			src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-300x300.png"
																			className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																			alt="" decoding="async"
																			srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-41.png 1500w"
																			sizes="(max-width: 300px) 100vw, 300px" /></noscript></a>
															</div>
															<div className="content-wrapper price-filled">
																<span className="price"><del
																	aria-hidden="true"><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>4.60</bdi></span></del>
																	<ins><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>3.60</bdi></span></ins></span>
																<h2 className="product-title"><a
																	href="product/yellow-fresh-pear-up-to-500g/index.html">Yellow
																	Fresh Pear up to 500g</a></h2>
																<div className="product-rating style-2">
																	<div className="product-rating-inner">
																		<i className="klb-icon-star"></i>
																		<div className="review-count">4.33
																		</div>
																	</div>
																	<div className="rating-count"><span
																		className="count-text">3
																		Reviews</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>



												<div className="product">
													<div className="product-wrapper style-1">
														<div className="product-inner">
															<div className="thumbnail-wrapper entry-media">
																<div
																	className="thumbnail-badges product-badges">
																	<span
																		className="badge style-1 sale">62%</span>
																</div><a className="product-thumbnail"
																	href="product/pasta-barilla-chifferi-rigati-n-41/index.html"><img
																		width="300" height="300"
																		src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
																		className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																		alt="" decoding="async"
																		data-lazy-srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40.png 1500w"
																		data-lazy-sizes="(max-width: 300px) 100vw, 300px"
																		data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-300x300.png" /><noscript><img
																			width="300" height="300"
																			src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-300x300.png"
																			className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
																			alt="" decoding="async"
																			srcset="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-300x300.png 300w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-54x54.png 54w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-600x600.png 600w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-1024x1024.png 1024w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-150x150.png 150w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-768x768.png 768w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40-450x450.png 450w, https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-40.png 1500w"
																			sizes="(max-width: 300px) 100vw, 300px" /></noscript></a>
															</div>
															<div className="content-wrapper price-filled">
																<span className="price"><del
																	aria-hidden="true"><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>1.93</bdi></span></del>
																	<ins><span
																		className="woocommerce-Price-amount amount"><bdi><span
																			className="woocommerce-Price-currencySymbol">&#36;</span>0.75</bdi></span></ins></span>
																<h2 className="product-title"><a
																	href="product/pasta-barilla-chifferi-rigati-n-41/index.html">Pasta
																	BARILLA Chifferi rigati
																	n.41</a></h2>
																<div className="product-rating style-2">
																	<div className="product-rating-inner">
																		<i className="klb-icon-star"></i>
																		<div className="review-count">4.00
																		</div>
																	</div>
																	<div className="rating-count"><span
																		className="count-text">3
																		Reviews</span></div>
																</div>
															</div>
														</div>
													</div>
												</div>


											</div>
										</div>
									</div>
								</div>


								<div className="custom-link help-center">
									<a href="#" className="help-center-color">
										<i className="klb-icon-zap"></i>
										<span>Buy Theme</span>
									</a>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>
			<div className="header-mobile max-1200">
				<div className="header-row header-mobile-main color-scheme-light color-layout-custom dark-blue">
					<div className="container">
						<div className="header-inner d-flex">

							<div className="col d-inline-flex align-items-center col-auto">
								<div className="header-action toggle-button">
									<a href="#" className="action-link">
										<div className="action-icon">
											<i className="klb-icon-menu"></i>
										</div>
									</a>
								</div>
							</div>

							<div className="col d-inline-flex align-items-center justify-content-center">
								<div className="site-brand">
									<a href="index.html" title="Grocery eCommerce Theme">
										<img width="535" height="133"
											src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20535%20133'%3E%3C/svg%3E"
											alt="Grocery eCommerce Theme"
											data-lazy-src="https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/10/logo-grocery.png" /><noscript><img
												width="535" height="133"
												src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/10/logo-grocery.png"
												alt="Grocery eCommerce Theme" /></noscript>
									</a>
								</div>
							</div>

							<div className="col d-inline-flex align-items-center col-auto">

								<div className="header-action cart-button custom-dropdown row-style default"
									data-placement="right">
									<a href="cart/index.html" className="action-link custom-dropdown-link"
										tabIndex="0" role="button" aria-expanded="false">
										<div className="action-icon">
											<i className="klb-icon-italic-shop"></i>
											<div className="action-count cart-count count">0</div>
										</div>
									</a>
									<div className="dropdown-menu custom-dropdown-menu hide">
										<div className="custom-dropdown-body">

											<div className="cart-not-empty">
												<div className="fl-mini-cart-content">



													<div className="cart-empty">
														<div className="empty-icon">
															<svg version="1.1" id="Layer_1"
																xmlns="http://www.w3.org/2000/svg"
																xmlnsXlink="http://www.w3.org/1999/xlink"
																x="0px" y="0px" viewBox="0 0 56 56"
																enableBackground="new 0 0 56 56"
																xmlSpace="preserve">
																<g>
																	<path d="M0.4,27.6c0.4-0.9,1.2-1.2,2.2-1.2c5.4,0,10.8,0,16.3,0c0.8,0,1.4,0.2,2,0.8c2.2,2.3,4.5,4.5,6.7,6.8
				  c0.1,0.1,0.2,0.3,0.4,0.5c0.2-0.2,0.4-0.4,0.5-0.5c2.3-2.3,4.6-4.5,6.8-6.8c0.5-0.5,1.1-0.7,1.8-0.7c5.6,0,11.1,0,16.7,0
				  c0.8,0,1.5,0.2,1.8,1c0.3,0.8,0,1.4-0.6,2c-2.5,2.5-5,5-7.6,7.5c-0.3,0.3-0.4,0.6-0.4,1c0,5.2,0,10.4,0,15.6c0,1-0.3,1.7-1.3,2.1
				  c-11.8,0-23.6,0-35.4,0c-1-0.4-1.3-1.1-1.3-2.1c0-5.2,0-10.4,0-15.7c0-0.4-0.1-0.7-0.4-0.9c-2.4-2.4-4.8-4.8-7.2-7.2
				  c-0.4-0.4-0.7-0.8-1-1.3C0.4,28.1,0.4,27.9,0.4,27.6z M12.3,38.3c0,4.7,0,9.4,0,14c4.7,0,9.4,0,14,0c0-4.7,0-9.4,0-14
				  C21.7,38.3,17,38.3,12.3,38.3z M43.7,38.3c-4.7,0-9.4,0-14,0c0,4.7,0,9.4,0,14c4.7,0,9.4,0,14,0C43.7,47.6,43.7,43,43.7,38.3z
				  M24.1,35c-1.8-1.8-3.5-3.5-5.3-5.2c-0.1-0.1-0.4-0.2-0.6-0.2c-3.9,0-7.9,0-11.8,0c-0.1,0-0.3,0-0.5,0c1.7,1.7,3.4,3.4,5,5
				  c0.3,0.3,0.5,0.4,0.9,0.4c3.8,0,7.7,0,11.5,0C23.6,35,23.8,35,24.1,35z M32,35c0.2,0,0.3,0,0.4,0c4,0,8,0,12,0
				  c0.2,0,0.4-0.1,0.6-0.3c1.6-1.6,3.2-3.2,4.8-4.8c0.1-0.1,0.2-0.2,0.3-0.3c-0.1,0-0.1,0-0.2,0c-4.1,0-8.1,0-12.2,0
				  c-0.2,0-0.4,0.1-0.5,0.2C35.4,31.5,33.7,33.2,32,35z" />
																	<path d="M29.6,24.9c0,0.4,0,0.8,0,1.1c0,1-0.6,1.8-1.6,1.8c-0.9,0-1.6-0.7-1.7-1.7c-0.1-2.8-0.4-5.6-1.1-8.3
				  c-0.5-2.2-1.3-4.3-2.6-6.2c-1.5-2-3.4-3.1-5.9-2.8c-1.7,0.2-3,0.9-3.5,2.6c-0.5,1.7,0.1,3.1,1.4,4.3c1.4,1.2,3.1,1.7,4.8,1.9
				  c0.5,0.1,1,0.1,1.6,0.1c0.9,0,1.5,0.7,1.6,1.5c0.1,0.8-0.6,1.7-1.4,1.7c-3.8,0-7.3-0.8-9.8-3.9c-1.7-2.2-2.1-4.6-1-7.2
				  c1.1-2.5,3.2-3.8,5.9-4.1c3.9-0.5,6.9,1.1,9.1,4.3c1.7,2.4,2.6,5.1,3.2,7.9C29.1,20.2,29.4,22.6,29.6,24.9
				  C29.7,24.9,29.6,24.9,29.6,24.9z" />
																	<path d="M34.2,21c-0.3,0-0.6,0-0.9,0c-1,0-1.7-0.7-1.7-1.6c0-0.9,0.7-1.6,1.7-1.6c1.9,0,3.8-0.2,5.6-0.9c1.2-0.5,2.2-1.1,3.1-2
				  c3.1-3.2,2.1-7.5-2.2-8.8c-1-0.3-2-0.4-3-0.5c-1-0.1-1.8-0.8-1.7-1.7c0-0.9,0.8-1.6,1.8-1.6c2.1,0,4.2,0.4,6,1.6
				  c4.6,2.8,5.5,8.8,1.9,12.8c-2,2.2-4.5,3.4-7.4,4C36.3,20.8,35.3,20.9,34.2,21C34.2,21,34.2,21,34.2,21z" />
																	<path
																		d="M29.7,1.5C30,1.2,30.2,1,30.5,0.8c0.7-0.5,1.5-0.5,2.1,0.1c0.6,0.6,0.7,1.5,0.2,2.1c-0.6,0.7-1.3,1.4-2,2.1
				  c-0.6,0.5-1.5,0.4-2-0.1c-0.6-0.6-1.2-1.2-1.8-1.8c-0.6-0.7-0.6-1.6,0-2.2c0.6-0.6,1.5-0.7,2.2-0.1C29.3,1,29.5,1.2,29.7,1.5z" />
																</g>
															</svg>
														</div>
														<div className="empty-text">No products in the cart.
														</div>
													</div>


												</div>
											</div>

											<div className="cart-discount">
												<p>Free Shipping on All Orders <strong>Over $100</strong>
												</p>
											</div>


										</div>
									</div>
								</div>


							</div>

						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header