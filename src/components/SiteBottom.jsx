import React from 'react'

const SiteBottom = () => {
  return (
     <>
     <div className="klb-mobile-bottom hide-desktop">
		<nav className="mobile-menu">
			<ul>
				<li>
					<a href="shop/index.html" className="store">
						<i className="klb-icon-small-shop-thin"></i>
						<span>Store</span>
					</a>
				</li>


				<li>
					<a href="#" className="search">
						<i className="klb-icon-search-feather-thin"></i>
						<span>Search</span>
					</a>
				</li>


				<li>
					<a href="wishlist/index.html" className="wishlist">
						<i className="klb-icon-heart-outline-thin"></i>
						<span>Wishlist</span>
					</a>
				</li>


				<li>
					<a href="my-account/index.html" className="user">
						<i className="klb-icon-profile-circled-thin"></i>
						<span>Account</span>
					</a>
				</li>

				<li>
					<a href="#" className="categories">
						<i className="klb-icon-view-type-list-thin"></i>
						<span>Categories</span>
					</a>
				</li>

			</ul>
		</nav>
	</div>


	<div id="klbwl_wishlist" className="klbwl-popup"></div>
	<div className="klb-modal-root default-modal location-modal">
		<div className="klb-modal-inner">
			<div className="klb-location-modal">
				<div className="klb-modal-header">
					<h4 className="entry-title">Delivery to you</h4>
					<div className="site-close"><svg role="img" focusable="false" viewBox="0 0 22 22"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M1.705.294.291 1.71l19.997 19.997 1.414-1.415L1.705.294Z"></path>
							<path d="M20.288.294.29 20.291l1.414 1.415L21.702 1.709 20.288.294Z"></path>
						</svg></div>
				</div>
				<div className="klb-location-body">
					<h3 className="entry-title">Where to deliver your purchases?</h3>
					<div className="entry-description">
						<p>Delivery times available depend on where you are ordering from</p>
					</div>
					<div className="location-search-form">
						<form action="#"><i className="klb-ecommerce-icon-location"></i><input type="search" name="s"
								defaultValue="" placeholder="Search your location..." autoComplete="off"
								className="location-input"/></form>
					</div>
					<div className="location-list site-scroll">
						<ul>
							<li className="location-item"><a href="#" data-slug="all">
									<div className="location-detail">
										<div className="location-name">Select a Location</div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index4ede.html?location=alabama"
									data-slug="alabama">
									<div className="location-detail">
										<div className="location-name">Alabama</div>
										<div className="location-address">348 Black Rock Tpke, CT 06825 </div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index047f.html?location=alaska"
									data-slug="alaska">
									<div className="location-detail">
										<div className="location-name">Alaska</div>
										<div className="location-address">348 Black Rock Tpke, CT 06825 </div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index0d46.html?location=arizona"
									data-slug="arizona">
									<div className="location-detail">
										<div className="location-name">Arizona</div>
										<div className="location-address">8915 Gerber Road, Sacramento, CA 95829
										</div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index94ff.html?location=california"
									data-slug="california">
									<div className="location-detail">
										<div className="location-name">California</div>
										<div className="location-address">348 Black Rock Tpke, CT 06825 </div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index3cf8.html?location=colorado"
									data-slug="colorado">
									<div className="location-detail">
										<div className="location-name">Colorado</div>
										<div className="location-address">8915 Gerber Road, Sacramento, CA 95829
										</div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="indexa737.html?location=florida"
									data-slug="florida">
									<div className="location-detail">
										<div className="location-name">Florida</div>
										<div className="location-address">8915 Gerber Road, Sacramento, CA 95829
										</div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index4fd9.html?location=georgia"
									data-slug="georgia">
									<div className="location-detail">
										<div className="location-name">Georgia</div>
										<div className="location-address">348 Black Rock Tpke, CT 06825 </div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="index4976.html?location=kansas"
									data-slug="kansas">
									<div className="location-detail">
										<div className="location-name">Kansas</div>
										<div className="location-address">8915 Gerber Road, Sacramento, CA 95829
										</div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="indexd790.html?location=minnesota"
									data-slug="minnesota">
									<div className="location-detail">
										<div className="location-name">Minnesota</div>
										<div className="location-address">348 Black Rock Tpke, CT 06825 </div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="indexd6b2.html?location=new-york"
									data-slug="new-york">
									<div className="location-detail">
										<div className="location-name">New York</div>
										<div className="location-address">8915 Gerber Road, Sacramento, CA 95829
										</div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
							<li className="location-item "><a href="indexbbee.html?location=washington"
									data-slug="washington">
									<div className="location-detail">
										<div className="location-name">Washington</div>
										<div className="location-address">348 Black Rock Tpke, CT 06825 </div>
									</div>
									<div className="location-checkbox"></div>
								</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div className="klb-modal-overlay"></div>
	</div>
	<div className="klb-mobile-search">
		<div className="site-scroll">
			<div className="mobile-search-header">
				<p>Type a few things below to search</p>
				<form action="https://klbtheme.com/blonwe/grocery/" className="search-form form-style-primary"
					role="search" method="get">
					<input className="form-control search-input" type="search" name="s" defaultValue=""
						placeholder="Search for products..." autoComplete="off"/>
					<button type="submit" className="unset">
						<i className="klb-icon-search-feather"></i>
					</button>
					<input type="hidden" name="post_type" defaultValue="product" />
				</form>
			</div>
			<div className="mobile-search-body">


				<div className="searh-caption">
					<p>Out of a total of 57 products:</p>
				</div>
				<div className="search-results">
					<div className="search-result-keywords">
						<span className="search-results-heading">Trending:</span>
						<ul className="search-keywords tag-style">
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=organic">organic
								</a></li>
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=fresh">fresh
								</a></li>
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=great">great
								</a></li>
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=B5UEO3E8">B5UEO3E8
								</a></li>
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=food">food
								</a></li>
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=alaska">alaska
								</a></li>
							<li><a href="https://klbtheme.com/blonwe/grocery?post_type=product&amp;s=shower">shower
								</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div className="klb-modal-root authentication-modal">
		<div className="klb-modal-inner">
			<div className="authentication-modal-banner min-1024 ">
				<a href="my-account/index.html">
					<img width="768" height="874"
						src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20768%20874'%3E%3C/svg%3E"
						alt="Grocery eCommerce Theme"
						data-lazy-src="754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/07/newsletter-form-image.jpg"/><noscript><img
							width="768" height="874"
							src="754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/07/newsletter-form-image.jpg"
							alt="Grocery eCommerce Theme"/></noscript>
				</a>
			</div>
			<div className="klb-authentication-modal">
				<div className="klb-modal-header">
					<h4 className="entry-title">Log in</h4>
					<div className="site-close">
						<svg role="img" focusable="false" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.705.294.291 1.71l19.997 19.997 1.414-1.415L1.705.294Z"></path>
							<path d="M20.288.294.29 20.291l1.414 1.415L21.702 1.709 20.288.294Z"></path>
						</svg>
					</div>
				</div>
				<div className="klb-authentication-form tab-style">
					<div id="klb-authentication" className="klb-authentication-inner">
						<div className="klb-login-form">
							<div className="woocommerce-notices-wrapper"></div>
							<form className="woocommerce-form woocommerce-form-login login" method="post">


								<p
									className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label htmlFor="username">Username or email address&nbsp;<span
											className="required">*</span></label>
									<input type="text"
										className="woocommerce-Input woocommerce-Input--text input-text"
										name="username" id="username" autoComplete="username" defaultValue="" />
								</p>
								<p
									className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
									<input className="woocommerce-Input woocommerce-Input--text input-text"
										type="password" name="password" id="password"
										autoComplete="current-password" />
								</p>


								<p className="form-row">
									<label
										className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
										<input
											className="woocommerce-form__input woocommerce-form__input-checkbox"
											name="rememberme" type="checkbox" id="rememberme"
											defaultValue="forever" /> <span>Remember me</span>
									</label>

									<input type="hidden" id="woocommerce-login-nonce"
										name="woocommerce-login-nonce" defaultValue="b2c7a959cd" /><input
										type="hidden" name="_wp_http_referer" defaultValue="/blonwe/grocery/" />
									<button type="submit"
										className="woocommerce-button button woocommerce-form-login__submit"
										name="login" defaultValue="Log in">Log in</button>
								</p>

								<div className="lost-password">
									<p className="woocommerce-LostPassword lost_password">
										<a href="my-account/lost-password/index.html">Lost your password?</a>
									</p>
								</div>


							</form>


							<p className="privacy-text">By continuing, you accept the Website Regulations ,
								Regulations for the sale of alcoholic beverages and the <a
									className="privacy-policy-link" href="privacy-policy-2/index.html"
									rel="privacy-policy">Privacy Policy</a></p>

						</div>
					</div>
				</div>
				<div className="klb-authentication-tab">
					<p>You dont have an account yet? <a href="my-account/index.html#register">Register Now</a></p>
				</div>
			</div>
		</div>
		<div className="klb-modal-overlay"></div>
	</div>

     </>

  )
}

export default SiteBottom