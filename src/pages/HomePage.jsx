
import React, { useRef, useState } from 'react'
import CarouselSection from '../components/ui/CarouselSection'
import { Badge, Button, Card, Carousel, Col, Rate, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

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

const productItemStyles = {
	width: 'calc(25% - 20px)',
	margin: '10px',
	position: 'relative',
	overflow: 'hidden',
}

const HomePage = () => {
	const [hoveredProduct, setHoveredProduct] = useState(null);

	const handleMouseEnter = (productId) => {
		setHoveredProduct(productId);
	};

	const handleMouseLeave = () => {
		setHoveredProduct(null);
	};

	const cateRef = useRef()

	const categories = [
		{ title: 'Category 1', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Category 2', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
		{ title: 'Category 3', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Category 4', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
		{ title: 'Category 5', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Category 6', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
		{ title: 'Category 7', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/iamge-1-1-450x450.png' },
		{ title: 'Category 8', image: 'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47-450x450.png' },
	];

	const createSlides = () => {
		const slides = [];

		// 4 items per slide
		const itemPerSlide = 5;
		for (let i = 0; i < categories.length; i += itemPerSlide) {
			const slideContent = categories.slice(i, i + itemPerSlide).map((category, index) => (
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

	const productData = [
		{
			id: 1,
			name: 'Product 1 Lorem ipsum dolor sit amet.',
			price: 1000000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 4.5,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 2,
			name: 'Product 2',
			price: 20000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 3,
			name: 'Product 3',
			price: 30000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 1,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 4,
			name: 'Product 4',
			price: 40000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 1,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 5,
			name: 'Product 5',
			price: 50000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 6,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 6,
			name: 'Product 6',
			price: 60000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 7,
			name: 'Product 7',
			price: 70000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			id: 8,
			name: 'Product 8',
			price: 80000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
	];

	return (
		<div className='container mx-auto'>
			<CarouselSection />

			{/* categories */}
			<div className='relative mt-5'>
				<Button style={previousButton} onClick={() => { cateRef.current.prev() }} icon={<LeftOutlined />} />
				<Carousel
					dots={false}
					draggable
					ref={cateRef}
				>
					{createSlides()}
				</Carousel>
				<Button style={nextButton} onClick={() => { cateRef.current.next() }} icon={<RightOutlined />} />
			</div>

			{/* discount */}
			<div style={{
				backgroundColor: '#FFEBEB',
				width: '100%',
				height: '80px',
				borderRadius: '10px',
				margin: '40px 0',
			}}
				className='hidden md:flex justify-center items-center gap-3'
			>
				<h3 style={{
					fontWeight: 'bold',
					fontSize: '1.125rem',
					color: '#E53E3E',
				}}>
					Super discount for your <strong>first purchase</strong></h3>
				<div style={{
					fontSize: '1rem',
					border: '1px dashed #E53E3E',
					borderRadius: '5px',
					padding: '0 10px',
					color: '#E53E3E',
				}}>FREE25CAD</div>
				<p style={{
					fontSize: '1.125rem',
					color: '#E53E3E',
				}}>Use discount code in the checkout!</p>
			</div>

			{/* product */}
			<p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>Don't miss this week's sales</p>
			<div style={{
				boxShadow: '0 0 5px 3px var(--secondary-color)',
				padding: '10px',
				borderRadius: '5px',
			}}>
				<div className="flex flex-wrap justify-start">
					{productData.map((product, index) => {
						return <Link key={index} to={`product/${product.id}`} style={productItemStyles}>
							<Card
								size='small'
								hoverable
								borderRadius={10}
								cover={<img alt="example" src={product.image} />}
								extra={hoveredProduct === product.id ?
									<div className='product-hover'>
										<Button type="primary"> add to card </Button>
									</div>
									: null}
								onMouseEnter={() => handleMouseEnter(product.id)}
								onMouseLeave={handleMouseLeave}
							>
								<Rate disabled allowHalf defaultValue={product.rate} className='rate' />
								<Meta title={product.name} className='product-name' />
								<div className='price'>
									<p className="new-price">
										{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
									</p>
									<p className="old-price">
										{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
									</p>
								</div>
								<p className='product-detail'>
									{product.detail}
								</p>

							</Card>
						</Link>
					})}

					<div style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}>
						<Button type="primary">Show more</Button>
					</div>
				</div >
			</div>
		</div>
	)
}

export default HomePage