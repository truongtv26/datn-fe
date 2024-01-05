
import React, { useRef } from 'react'
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
	backgroundColor: 'transparent',
	border: 0,
	color: 'gray',
}
const nextButton = {
	position: 'absolute',
	zIndex: 1,
	right: '0',
	top: '50%',
	transForm: 'translate-Y(-50%)',
	backgroundColor: 'transparent',
	border: 0,
	color: 'gray',
}

const productItemStyles = {
	width: 'calc(25% - 20px)',
	margin: '10px'
}

const HomePage = () => {

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
		const itemPerSlide = 4;
		for (let i = 0; i < categories.length; i += itemPerSlide) {
			const slideContent = categories.slice(i, i + itemPerSlide).map((category, index) => (
				<Col key={index} span={6} style={{ padding: '10px', border: '1px solid gray' }}>
					<div
						style={{
							backgroundImage: `url(${category.image})`,
							backgroundSize: 'cover',
							height: '160px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-end',
							textAlign: 'center',
							color: 'white',
						}}
					>
						<h3 style={{ margin: '0', padding: '8px', background: 'rgba(0, 0, 0, 0.5)' }}>
							{category.title}
						</h3>
					</div>
				</Col>
			));
			slides.push(
				<div key={i}>
					<Row gutter={[4, 8]}>{slideContent}</Row>
				</div>
			);
		}
		return slides;
	};

	const productData = [
		{
			id: 1,
			name: 'Product 1',
			price: 10000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 4.5,
			detail: 'detail product',
		},
		{
			id: 2,
			name: 'Product 2',
			price: 20000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'detail product',
		},
		{
			id: 3,
			name: 'Product 3',
			price: 30000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 1,
			detail: 'detail product',
		},
		{
			id: 4,
			name: 'Product 4',
			price: 40000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 1,
			detail: 'detail product',
		},
		{
			id: 5,
			name: 'Product 5',
			price: 50000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 6,
			detail: 'detail product',
		},
		{
			id: 6,
			name: 'Product 6',
			price: 60000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'detail product',
		},
		{
			id: 7,
			name: 'Product 7',
			price: 70000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'detail product',
		},
		{
			id: 8,
			name: 'Product 8',
			price: 80000,
			image: 'https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg',
			rate: 5,
			detail: 'detail product',
		},
	];

	return (
		<>
			<CarouselSection />

			{/* categories */}
			<div className='relative'>
				<Button style={previousButton} onClick={() => { cateRef.current.prev() }} icon={<LeftOutlined />} />
				<Carousel
					dots={false}
					draggable
					ref={cateRef}
					className='mt-3'
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
				margin: '10px 0',
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
			<p style={{fontSize: '24px', fontWeight: 'bold'}}>Don't miss this week's sales</p>
			<div className="flex flex-wrap justify-start">
				{productData.map((product, index) => {
					return <Link key={index} to={`product/${product.id}`} style={productItemStyles}>
						<Card
							hoverable
							cover={<img alt="example" src={product.image} />}
						>
							<Rate disabled allowHalf defaultValue={product.rate} className='rate' />
							<Meta title={product.name} />
							<p>{product.price}</p>
							<p>{product.detail}</p>
						</Card>
					</Link>
				})}

				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',}}>
				<Button type="primary">Show more</Button>
			</div>
		</div >
		</>
	)
}

export default HomePage
