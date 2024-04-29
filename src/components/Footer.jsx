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
						<p className='title'>Bạn cần giúp đỡ?</p>
						<ul className='mt-2'>
							<li>Email: fshoes@gmail.com</li>
							<li>Phone: 0982968640</li>
						</ul>
					</div>
					<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
					<div className='footer-items'>
						<p className='title'>Trung tâm Trợ giúp</p>
						<ul className='mt-2'>
							<li><Link to={'/order'} style={{color: "black"}}>Đơn hàng của bạn</Link></li>
							<li>Đổi trả & Thay thế</li>
							<li>Chính sách vận chuyển</li>
							<li>Chính sách hoàn tiền</li>
							<li>Chính sách bảo mật</li>
							<li>Điều khoản và điều kiện</li>
							<li>Trung tâm trợ giúp</li>
						</ul>
					</div>
					<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
					<div className='footer-items'>
						<p className='title'>Về chúng tôi</p>
						<ul className='mt-3'>
							<li>Tìm hiểu về chúng tôi</li>
							<li>Đánh giá từ khách hàng</li>
							<li>Inverstor Relations</li>
							<li>Địa điểm cửa hàng</li>
						</ul>
					</div>
				</div>
				<div style={{ border: '1px solid var(--secondary-color)', margin: '0 40px' }}></div>
				<div className='bottom-footer'>
					<ul className='items'>
						{/* <li style={{ fontWeight: 'bold', fontSize: '16px' }}>Follow us: </li>
						<li><TwitterOutlined /></li>
						<li><YoutubeFilled /></li>
						<li><InstagramFilled /></li> */}
					</ul>
					<ul className='items' style={{display: "flex", gap: "15px"}}>
						<li style={{ fontWeight: 'bold', fontSize: '16px' }}>Phương thức thanh toán </li>
						<li><img width="36" height="12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0pp5uI4G0zmb28iTUKMClIPx-rCY65GfS2wiol-f6&s" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" className="entered lazyloaded" /></li>
						<li><img width="24" height="16" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgptLtdy8VJK58ew45RdsyjUUltFG4zYl0_SuUPTSLxw&s" alt="payment" data-lazy-src="../../../754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/11/visa.png" data-ll-status="loaded" className="entered lazyloaded" /></li>
					</ul>
				</div>
			</div>
		</>

	)
}

export default Footer