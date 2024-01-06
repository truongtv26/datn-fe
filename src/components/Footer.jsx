import { InstagramFilled, TwitterCircleFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons'
import React from 'react'

const Footer = () => {
	return (
		<>
			<span style={{ margin: '40px 0', border: '1px solid var(--secondary-color)' }}></span>
			<div className='footer container mx-auto'>
				<div className='main-footer'>
					<div className='footer-items'>
						<p className='title'>Do You Need Help ?</p>
						<ul>
							<li>Autoseligen syr. Nek diarask fröbomba. Nör antipol kynoda nynat. Pressa fåmoska.</li>
							<li>Email: info@example.com</li>
							<li>Phone: 0987654321</li>
						</ul>
					</div>
					<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
					<div className='footer-items'>
						<p className='title'>Let Us Help You</p>
						<ul>
							<li>Accessibility Statement</li>
							<li>Your Orders</li>
							<li>Returns & Replacements</li>
							<li>Shipping Rates & Policies</li>
							<li>Refund and Returns Policy</li>
							<li>Privacy Policy</li>
							<li>Terms and Conditions</li>
							<li>Help Center</li>
						</ul>
					</div>
					<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
					<div className='footer-items'>
						<p className='title'>Get to Know Us</p>
						<ul>
							<li>Careers for Blonwe</li>
							<li>About Blonwe</li>
							<li>Inverstor Relations</li>
							<li>Blonwe Devices</li>
							<li>Customer reviews</li>
							<li>Social Responsibility</li>
							<li>Store Locations</li>
						</ul>
					</div>
				</div>
				<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
				<div className='bottom-footer'>
					<ul className='items'>
						<li style={{ fontWeight: 'bold', fontSize: '16px' }}>Follow us: </li>
						<li><TwitterOutlined /></li>
						<li><YoutubeFilled /></li>
						<li><InstagramFilled /></li>
					</ul>
					<ul className='items'>
						<li style={{ fontWeight: 'bold', fontSize: '16px' }}>We accept:</li>
						<li><img width="36" height="12" src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" class="entered lazyloaded" /></li>
						<li><img width="24" height="16" src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3521564-2944982.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" class="entered lazyloaded" /></li>
						<li><img width="36" height="12" src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" class="entered lazyloaded" /></li>
						<li><img width="24" height="16" src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3521564-2944982.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" class="entered lazyloaded" /></li>
					</ul>
				</div>
			</div>
		</>

	)
}

export default Footer