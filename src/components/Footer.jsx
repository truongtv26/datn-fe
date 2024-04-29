import { InstagramFilled, TwitterCircleFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<>
			<span style={{ margin: '40px 0', border: '1px solid var(--secondary-color)' }}></span>
			<div className='footer container mx-auto'>
				<div className='main-footer'>
					<div className='footer-items'>
						<p className='title'>Bạn cần giúp đỡ ?</p>
						<ul>
							<li>Chúng tôi sẽ giải đáp những thắc mắc và yêu cầu của bạn qua</li>
							<li>Email: info@example.com</li>
							<li>Điện thoại: 0987654321</li>
						</ul>
					</div>
					<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
					<div className='footer-items'>
						<p className='title'>Hãy để chúng tôi giúp bạn</p>
						<ul>
							<li>Về khả năng truy cập</li>
							<li>Đơn đặt hàng của bạn</li>
							<li>Trả lại & Thay thế</li>
							<li>Giá & Chính sách vận chuyển</li>
							<li>Chính sách hoàn tiền và trả lại</li>
							<li>Chính sách bảo mật</li>
							<li>Các điều khoản và điều kiện</li>
							<li>Trung tâm trợ giúp</li>
						</ul>
					</div>
					<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
					<div className='footer-items'>
						<p className='title'>Làm sao để hiểu F Shoes</p>
						<ul>
							<li>Sự nghiệp cho F Shoes</li>
							<li>Giới thiệu về F Shoes</li>
							<li>Quan hệ đầu tư</li>
							<li>Phản hồi khách hàng</li>
							<li>Trách nhiệm xã hội</li>
							<li>Địa điểm cửa hàng</li>
						</ul>
					</div>
				</div>
				<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
				<div className='bottom-footer'>
					<ul className='items'>
						<li style={{ fontWeight: 'bold', fontSize: '16px' }}>Theo dõi chúng tôi: </li>
						<li><TwitterOutlined /></li>
						<li><YoutubeFilled /></li>
						<li><InstagramFilled /></li> */}
					</ul>
					{/* <ul className='items'>
						<li style={{ fontWeight: 'bold', fontSize: '16px' }}>We accept:</li>
						<li><img width="36" height="12" src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" className="entered lazyloaded" /></li>
						<li><img width="24" height="16" src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3521564-2944982.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" className="entered lazyloaded" /></li>
						<li><img width="36" height="12" src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" className="entered lazyloaded" /></li>
						<li><img width="24" height="16" src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3521564-2944982.png" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" className="entered lazyloaded" /></li>
					</ul> */}
				</div>
			</div>
		</>

	)
}

export default Footer