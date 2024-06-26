import { Card, Pagination, Rate } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import WishListIcon from '../wishlist/WishListIcon';

const ProductList = ({ data, setProductPage, totalpage, pagination = true }) => {
	const VITE_URL = import.meta.env.VITE_URL;

	// trạng thái sản phẩm
	const onShowSizeChange = (current, pageSize) => {
		setProductPage(`page=${current}` + `&pageSize=${pageSize}`)
	};

	return (
		<div className='product-wrapper'>
			<div className="flex flex-wrap justify-start">
				{data && Object.keys(data).length > 0 ? data?.map((product, index) => {
					const promotion = product.variants.filter((variant) => variant?.promotions.length > 0).filter((variant) => variant?.promotions[0].status === 'happenning')[0]?.promotions[0]
					const priceRange = product.variants.map(variant => variant.price);
					const image = product.variants.map(variant => variant.images[0])[0]
					const productImage = VITE_URL + 'storage/' + image?.folder + '/' + image?.url;
					return <div key={index} className='product-items'>
						<WishListIcon product_id={product.id}/>
						{promotion ? <div className="product-badges">{promotion?.value}%</div> : null}

						<Link to={`/product/${product.slug}`} onClick={() => window.scrollTo(0, 0)}>
							<Card
								size='small'
								hoverable
								cover={<img alt="example" src={productImage} />}
								bordered={false}
								style={{ boxShadow: 'none' }}
							>
								{/* <Rate disabled allowHalf defaultValue={product.rate} className='rate' /> */}
								<p className='product-name'>{product.name}</p>
								<div className='price'>
									<p className="new-price">
										{
											Math.min(...priceRange) === Math.max(...priceRange)
												? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.min(...priceRange))
												: <>
													{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.min(...priceRange))}
													-
													{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.max(...priceRange))}
												</>
										}
									</p>
									<p className="old-price">
										{/* {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)} */}
									</p>
								</div>
								<p className='product-detail'>
									{product.detail}
								</p>

							</Card>
						</Link>
					</div>
				})
					:
					<>
						Không có sản phẩm nào
					</>}

				<div style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}>
					{pagination && <Pagination defaultCurrent={1} total={totalpage} showSizeChanger={false} pageSize={8} onChange={onShowSizeChange} />}
				</div>
			</div >
		</div>
	)
}

export default ProductList