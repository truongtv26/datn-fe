
import React, { useEffect, useRef, useState } from 'react'
import CarouselSection from '../components/ui/CarouselSection'
import { Badge, Button, Card, Carousel, Col, Image, Pagination, Rate, Row } from 'antd';
import { CreditCardOutlined, LeftOutlined, PercentageOutlined, PhoneOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import instance from '../core/api';
import ProductList from '../components/product/ProductList';

const contentStyle = {
	margin: 0,
	color: '#fff',
	textAlign: 'center',
	background: 'transparent',
};

const previousButton = {
	position: 'absolute',
	zIndex: 1,
	left: '0',
	top: '50%',
	transForm: 'translate-Y(-50%)',
	backgroundColor: 'var(--primary-color)',
	border: 0,
	color: 'white',
}
const nextButton = {
	position: 'absolute',
	zIndex: 1,
	right: '0',
	top: '50%',
	transForm: 'translate-Y(-50%)',
	backgroundColor: 'var(--primary-color)',
	border: 0,
	color: 'white',
}


const HomePage = () => {

	const cateRef = useRef()

	// trạng thái sản phẩm
	const [product, setProduct] = useState([]);
	const [productPage, setProductPage] = useState('');

	useEffect(() => {
		instance.get(`product-list?${productPage}`).then((res) => {
			if (res.status === 200) {
				setProduct(res.data.products)
			}
		})
	}, [productPage])

	const categories = [
		{ title: 'Nike', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Adidas', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
		{ title: 'New Balence', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Puma', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
		{ title: 'Jordan', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Reebok', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
		{ title: 'Converse', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Vans', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
	];

	const createSlides = () => {
		const slides = [];

		// Slide items
		const slideItems = 5;
		for (let i = 0; i < categories.length; i += slideItems) {
			const slideContent = categories.slice(i, i + slideItems).map((category, index) => (
				<Col key={index} style={{ border: '1px solid var(--secondary-color)', borderRadius: '10px', flex: '0 0 19.6%' }}>
					<div style={{
						backgroundImage: `url(${category.image})`,
						backgroundSize: 'cover',
						height: '180px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-end',
						textAlign: 'center',
						color: 'white',
						position: 'relative',
					}}
					>
						<h3 style={{
							position: 'absolute',
							bottom: '5px',
							width: '100%',
							margin: '0 2px',
							padding: '8px',
							background: 'var(--primary-color)',
							borderRadius: '5px',
						}}>
							{category.title}
						</h3>
					</div>
				</Col>
			));
			slides.push(
				<div key={i}>
					<Row style={{
						gap: '5px',
						flexWrap: 'nowrap'
					}}>{slideContent}</Row>
				</div>
			);
		}
		return slides;
	};


	const blogData = [
		{
			id: 1,
			category: "Adidas",
			title: "Tất tần tật thông tin từ A - Z về thương hiệu Adidas",
			image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-04.jpg",
			created_at: "7 Tháng 4, 2024",
			description: "Adidas là tập đoàn đa quốc gia đến từ Đức, được thành lập vào tháng 7 năm 1924 với tên gọi đầu tiên là Gebrüder Dassler Schuhfabrik, nhưng đến 18/08/1949, hãng đổi tên thành Adidas và được sử dụng đến ngày nay. Là một trong những cái tên đắt giá trong ngành thời trang thể thao, Adidas được sáng lập bởi hai anh em nhà Dassler là Adi Dassler và Rudolf. Trụ sở chính của công ty được đặt tại Herzogenaurach, Đức.",
		},
		{
			id: 2,
			category: "Nike",
			title: "TỔNG QUAN VỀ THƯƠNG HIỆU GIÀY NIKE",
			image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-03.jpg",
			created_at: "9 Tháng 4, 2024",
			description: "Khi nhắc đến Nike là người ta nghĩ đến thương hiệu thể thao nổi tiếng trên khắp toàn cầu và không ai có thể phủ nhận sức hấp dẫn của Nike. Nếu như bạn khảo sát có bao nhiêu người đang sở hữu thương hiệu này thì sẽ cho bạn 1 con số đáng kinh ngạc.",
		},

		{
			id: 3,
			category: "Puma",
			title: "Tìm hiểu lịch sử ra đời và phát triển của thương hiệu Puma",
			image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-02.jpg",
			created_at: "10 Tháng 4, 2024",
			description: "Puma SE (thương hiệu chính thức là PUMA) là một công ty đa quốc gia lớn của Đức chuyên sản xuất giày và các dụng cụ thể thao khác có trụ sở tại Herzogenaurach, Bavaria, Đức. Công ty được thành lập năm 1924 bởi Adolf và Rudolf Dassler với tên gọi ban đầu Gebrüder Dassler Schuhfabrik. Quan hệ giữa hai anh em họ rạn nứt và cuối cùng hai người quyết định tách ra vào năm 1948, tạo ra hai thực thể riêng biệt, Adidas và Puma. Cả hai công ty hiện nay đều có trụ sở đóng tại Herzogenaurach, Đức.",
		},

		{
			id: 4,
			category: "Vans",
			title: "8 sự thật thú vị về Vans mà bạn không thể bỏ qua",
			image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-01.jpg",
			created_at: "12 Tháng 4, 2024",
			description: "Chính thức ra đời vào năm 1966, Vans đã trở thành thương hiệu “iconic” trong ngành sản xuất giày sneakers trong hơn 50 năm qua. Những đôi giày Vans đậm chất trẻ và phong cách năng động luôn được các tín đồ Vans yêu thích. Bên cạnh sự phát triển từng ngày, có những sự thật thú vị xung quanh Vans mà bất cứ Vansaholic nào cũng không thể bỏ qua. Hãy cùng Drake VN tìm hiểu những sự thật đáng quan tâm ấy nhé.",
		},
	]



	return (
		<div className='container mx-auto'>
			<CarouselSection />

			{/* categories */}
			{/* <div className='relative mt-5'>
				<Button style={previousButton} onClick={() => { cateRef.current.prev() }} icon={<LeftOutlined />} />
				<Carousel
					dots={false}
					draggable
					ref={cateRef}
				>
					{createSlides()}
				</Carousel>
				<Button style={nextButton} onClick={() => { cateRef.current.next() }} icon={<RightOutlined />} />
			</div> */}

			{/* discount */}
			<div className='discount hidden md:flex justify-center items-center gap-3'>
				<h3 className='title'>
					Siêu giảm giá cho bạn <strong>lần mua đầu tiên</strong></h3>
				<div className='code'>FREE25CAD</div>
				<p className='description'>Sử dụng mã giảm giá khi thanh toán!</p>
			</div>

			{/* product */}
			<p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>Đừng bỏ lỡ đợt sale tuần này</p>
			<ProductList data={product} setProductPage={setProductPage} />


			{/* categories banner */}
			<div className="category-banner-wrapper">
				<div className='category-items'>
					<Image preview={false} src={'https://supersports.com.vn/cdn/shop/files/Running_58b78177-e320-42b9-8e31-32f6973b2acf.png?v=1684147116&width=1200'} />
					<div className="link">
						<button>Mua sắm ngay bây giờ</button>
					</div>
				</div>
				<div className='category-items'>
					<Image preview={false} src={'https://supersports.com.vn/cdn/shop/files/HP_YOGA_FITNESS_VN_b6558058-dbff-4522-9fb4-85eabdcdf50c.png?v=1703067749&width=1024'} />
					<div className="link">
						<button>Mua sắm ngay bây giờ</button>
					</div>
				</div>
				<div className='category-items'>
					<Image preview={false} src={'https://supersports.com.vn/cdn/shop/files/HP_TRAINING_VN_4ea1bb18-1f1a-4d7a-88e2-c33b9b6bb8c9.png?v=1703067797&width=1024'} />
					<div className="link">
						<button>Mua sắm ngay bây giờ</button>
					</div>
				</div>
			</div>

			{/* feature */}
			<div className="feature-wrapper mt-5">
				<div className="items">
					<svg className='icon' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M491.869,477.693c-21.516-2.586-41.805-12.45-57.129-27.774c-3.128-3.128-7.369-4.885-11.793-4.885 s-8.664,1.758-11.792,4.885c-8.266,8.266-17.888,14.735-28.272,19.418l55.541-146.562c3.221-8.501-0.96-18.018-9.401-21.394 l-22.649-9.059v-75.519c0-21.686-13.934-40.187-33.354-47.113v-52.95c0-27.587-22.544-50.031-50.254-50.031h-16.455V50.031 C306.312,22.444,283.768,0,256.059,0c-27.465,0-49.809,22.444-49.809,50.031v16.677H189.35c-27.465,0-49.809,22.444-49.809,50.031 v52.85c-19.401,6.843-33.354,25.417-33.354,47.213v75.34l-23.093,9.237c-8.399,3.36-12.588,12.802-9.443,21.283l54.088,145.846 c-9.718-4.609-18.738-10.789-26.541-18.592c-6.512-6.513-17.072-6.513-23.585,0c-15.403,15.403-35.8,25.28-57.433,27.811 c-9.148,1.071-15.696,9.355-14.626,18.503s9.358,15.704,18.503,14.626c23.84-2.789,46.562-12.221,65.38-26.945 c48.152,37.299,118.504,37.323,166.699,0.006c49.062,38.457,119.69,36.416,166.775-0.01c18.708,14.638,41.29,24.053,64.977,26.9 c9.137,1.101,17.45-5.421,18.548-14.566C507.536,487.097,501.014,478.793,491.869,477.693z M239.604,50.031 c0-9.196,7.381-16.677,16.455-16.677c9.318,0,16.899,7.481,16.899,16.677v16.677h-33.354V50.031z M172.895,116.74 c0-9.196,7.381-16.677,16.455-16.677c14.276,0,119.071,0,133.417,0c9.318,0,16.899,7.481,16.899,16.677v50.031H172.895V116.74z M139.541,216.802c0-9.196,7.381-16.677,16.455-16.677h0.222h199.903c9.318,0,16.899,7.481,16.899,16.677v62.178l-110.456-44.182 c-3.866-1.67-8.405-1.842-12.961-0.021c-0.017,0.008-0.034,0.013-0.051,0.021l-110.011,44.004V216.802z M267.969,449.918 c-6.512-6.513-17.072-6.513-23.585,0c-20.482,20.481-49.259,29.946-77.423,28.43l-56.384-152.037l128.804-51.521v86.978 c0,9.21,7.467,16.677,16.677,16.677c9.21,0,16.677-7.467,16.677-16.677V274.79l108.631,43.453c1.356,0.785,2.833,1.38,4.396,1.759 l15.669,6.267L343.77,478.426C316.127,479.499,288.057,470.006,267.969,449.918z"></path> </g> </g> </g></svg>
					<div className='content'>
						<p className='title'>Free Ship</p>
						<p className='detail'>Free Ship cho đơn hàng từ 500.000</p>
					</div>
				</div>
				<div className="items">
					<svg className='icon' viewBox="0 0 25.00 25.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" strokeWidth="0.525"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="phone"> <path className="cls-1" d="M23,17.11a5.92,5.92,0,0,0-4.63-3.95,1.5,1.5,0,0,0-1.51.66L15.6,15.63a.53.53,0,0,1-.61.2,13.25,13.25,0,0,1-3.6-2.14,13,13,0,0,1-2.94-3.52.5.5,0,0,1,.17-.69l1.63-1.09a1.52,1.52,0,0,0,.61-1.71A10.13,10.13,0,0,0,9.48,3.79a10.36,10.36,0,0,0-2.2-2.33A1.53,1.53,0,0,0,6,1.19a7.31,7.31,0,0,0-1.13.43A7.64,7.64,0,0,0,1.2,6.1a1.48,1.48,0,0,0,0,.93A24.63,24.63,0,0,0,7.73,17.44,24.76,24.76,0,0,0,17.12,23a1.41,1.41,0,0,0,.45.07,1.59,1.59,0,0,0,.48-.07,7.64,7.64,0,0,0,4.47-3.66A6.21,6.21,0,0,0,23,18,1.46,1.46,0,0,0,23,17.11Zm-1.33,1.74A6.61,6.61,0,0,1,17.73,22a.54.54,0,0,1-.31,0,23.61,23.61,0,0,1-9-5.29,23.74,23.74,0,0,1-6.27-10,.47.47,0,0,1,0-.31A6.59,6.59,0,0,1,5.29,2.52a5,5,0,0,1,1-.36h.1a.5.5,0,0,1,.32.11,9.4,9.4,0,0,1,2,2.09A9.07,9.07,0,0,1,9.9,7a.52.52,0,0,1-.21.6L8.06,8.64a1.54,1.54,0,0,0-.47,2,14.09,14.09,0,0,0,7,6.09,1.51,1.51,0,0,0,1.81-.58l1.21-1.81a.51.51,0,0,1,.51-.23A4.94,4.94,0,0,1,22,17.44a.58.58,0,0,1,0,.29A5.35,5.35,0,0,1,21.62,18.85Z"></path> </g> </g></svg>
					<div className='content'>
						<p className='title'>Hỗ trợ trực tuyến 24/7</p>
						<p className='detail'>Hỗ trợ trực tuyến 24 giờ một ngày</p>
					</div>
				</div>
				<div className="items">
					<svg className='icon' fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>credit-card</title> <path d="M0 26.016q0 0.832 0.576 1.408t1.44 0.576h28q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-28q-0.832 0-1.44 0.608t-0.576 1.408v20zM2.016 26.016v-14.016h28v14.016h-28zM2.016 8v-1.984h28v1.984h-28zM4 24h4v-1.984h-4v1.984zM4 20h6.016v-5.984h-6.016v5.984zM10.016 24h4v-1.984h-4v1.984zM16 24h4v-1.984h-4v1.984zM22.016 24h1.984v-1.984h-1.984v1.984zM26.016 24h1.984v-1.984h-1.984v1.984z"></path> </g></svg>
					<div className='content'>
						<p className='title'>Hoàn tiền</p>
						<p className='detail'>Bảo hành trở lại dưới 7 ngày</p>
					</div>
				</div>
				<div className="items">
					<svg className='icon' viewBox="0 0 55.875 55.875" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_2" data-name="Group 2" transform="translate(-361.283 -293.244)"> <rect id="Rectangle_1" data-name="Rectangle 1" width="17.273" height="29.829" transform="translate(363.283 326.026) rotate(-45.001)" fill="#d1d3d4"></rect> <path id="Path_9" data-name="Path 9" d="M384.375,347.118l-21.092-21.092,30.783-30.782,20.689.4.4,20.69Z" fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path> <path id="Path_10" data-name="Path 10" d="M405.107,310.841a4.211,4.211,0,1,1,0-5.955A4.212,4.212,0,0,1,405.107,310.841Z" fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path> </g> </g></svg>
					<div className='content'>
						<p className='title'>Giảm giá thành viên</p>
						<p className='detail'>Mỗi đơn hàng trên 1.000.000</p>
					</div>
				</div>
			</div>
			<div className="line"></div>

			{/* categories */}
			{/* <div className='relative mt-5'>
				<Button style={previousButton} onClick={() => { cateRef.current.prev() }} icon={<LeftOutlined />} />
				<Carousel
					dots={false}
					draggable
					ref={cateRef}
				>
					{createSlides()}
				</Carousel>
				<Button style={nextButton} onClick={() => { cateRef.current.next() }} icon={<RightOutlined />} />
			</div> */}

			{/* discount */}
			{/* <div className='discount hidden md:flex justify-center items-center gap-3'>
				<h3 className='title'>
					Super discount for your <strong>first purchase</strong></h3>
				<div className='code'>FREE25CAD</div>
				<p className='description'>Use discount code in the checkout!</p>
			</div> */}

			{/* product */}
			<p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>Sản phẩm có sẵn!</p>
			<ProductList data={product} setProductPage={setProductPage} />


			{/* categories banner */}
			<div className="category-banner-wrapper">
				<div className='category-items'>
					<Image preview={false} src={'https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-3.webp'} />
					<div className="link">
					<Link to='/list-product' onClick= {() => window.scrollTo(0, 0)}><button>Shop now</button></Link>
					</div>
				</div>
				<div className='category-items'>
					<Image preview={false} src={'https://lambanner.com/wp-content/uploads/2022/10/MNT-DESIGN-BANNER-GIAY-07.jpg'} />
					<div className="link">
					<Link to='/list-product' onClick= {() => window.scrollTo(0, 0)}><button>Shop now</button></Link>
					</div>
				</div>
				<div className='category-items'>
					<Image preview={false} src={'https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-6.webp'} />
					<div className="link">
						<Link to='/list-product' onClick= {() => window.scrollTo(0, 0)}><button>Shop now</button></Link>
					</div>
				</div>
			</div>



			{/* blog */}
			<div className="blog-wrapper">
				<h2>Tin tức của chúng tôi</h2>
				<div className="left-blog">
					<div className="blog-list">
						{blogData.map((blog, index) => (
							<div key={index} className="blog-item">
								<div>
									{/* <div className="image">
										<img src={`${blog.image}`} alt="image01" />
									</div> */}
									<div className="content">
										<div className="title-category">
											<Link to="">{blog.category}</Link>
										</div>
										<div className="title-blog">
											<Link to="">{blog.title}</Link>
										</div>
										<div className="created-at">
											<p>{blog.created_at}</p>
										</div>
										<div className="description">
											<p>{blog.description}</p>
										</div>
										<div className="button">
											<Button>Đọc thêm</Button>
										</div>
									</div>
								</div>
							</div>
						))}

					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage	