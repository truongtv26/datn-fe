import React, { useEffect, useState } from 'react';
import { Checkbox, Breadcrumb, Layout, Menu, theme, Card, Pagination, Input, Slider, Button, Rate, Divider } from 'antd';
//import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import instance from '../core/api';
import useDebounce from '../hook/useDebounce';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];



const { Sider, Content } = Layout;
const { Meta } = Card;
const productItemStyles = {
	width: 'calc(25% - 20px)',
	margin: '10px'
}

// 
const { Search } = Input;
// 
const checkboxStyle = {
	marginTop: '20px',
	fontSize: '16px',
};


const grayStyle = { color: 'gray', fontSize: '16px', };
const redStyle = { color: 'red', fontSize: '22px', };

// 

const onChange = (e) => {
	console.log(`checked = ${e.target.checked}`);
};






// 

// 



const categories = [
	{ image: 'https://supersports.com.vn/cdn/shop/files/PAYDAY_25-30.04_1545_500_V.jpg?v=1714041328&width=1400' },
];

const ListProduct = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	// 

	const [checkedList, setCheckedList] = useState(defaultCheckedList);
	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
	const onChange = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};
	// 

	// trạng thái danh sách sản phẩm
	const [products, setProducts] = useState([])

	// trạng thái lọc
	const [productPage, setProductPage] = useState('page');
	const [priceRange, setPriceRange] = useState([0, 0]);
	const [priceChange, setPriceChange] = useState([]);
	const [totalPage, setTotalPage] = useState(0)
	const [colorSelected, setColorsSelected] = useState([]);
	const [sizeSelected, setSizesSelected] = useState([]);

	//delay input range
	const priceRangeSelected = useDebounce(priceChange, 200)

	const handlePriceRangeChange = (value) => {
		setPriceChange(value);
	};

	// lấy sản phẩm
	useEffect(() => {
		instance.get(`product-list?
		${productPage}
		&min=${priceRangeSelected[0]}&max=${priceRangeSelected[1]}`, {
			params: {
				colors: colorSelected,
				sizes: sizeSelected,
			}
		}
		).then((res) => {
			if (res.status === 200) {
				setProducts(res.data.products)
				setTotalPage(res.total)
			}
		})
		
	}, [productPage, priceRangeSelected, colorSelected, sizeSelected])

	// lấy khoảng giá sản phẩm
	useEffect(() => {
		instance.get('product-range-price').then(({ data }) => {
			setPriceRange([0, data.max]);
		})
	}, [])

	const [colors, setColors] = useState([])
	useEffect(() => {
		instance.get("/colors").then((res) => {
			if (res.status === 200) {
				setColors(res.data)
			}
		})
	}, [])

	const [sizes, setSizes] = useState([])
	useEffect(() => {
		instance.get("/sizes").then((res) => {
			if (res.status === 200) {
				setSizes(res.data)
			}
		})
	}, [])

	const colorOptions = colors.map((color) => ({ label: color.name, value: color.id }))
	const sizesOptions = sizes.map((size) => ({ label: size.name, value: size.id }))

	const onColorsSelected = (value) => {
		setColorsSelected(value)
	}

	const onSizesSelected = (value) => {
		setSizesSelected(value)
	}

	return (
		<div className='container mx-auto'>
			{categories.map((category, index) => (
				<div key={index}>
					<img className="custom-image" src={category.image} alt="Shop" style={{ maxHeight: '250px', width: '100%' }} />
				</div>
			))}

			<Layout>
				<Sider width={200} style={{ background: colorBgContainer }}>
					<h2 style={{ marginTop: '24px' }}>Lọc sản phẩm</h2>
					{/* Tối thiểu và tối đa product price range */}
					<hr style={{ margin: "20px 0" }} />
					<h3>Lọc theo giá</h3>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '16px' }}>
						<div style={{ marginTop: '10px', marginRight: '5px' }} >
							<span style={{ margin: '10px' }}  >Tối thiểu</span>
							<p>{priceRange[0]}</p>
						</div>
						<div style={{ marginTop: '10px', marginRight: '5px' }} >
							<span style={{ margin: '10px' }} >Tối đa</span>
							<p>{priceRange[1]}</p>
						</div>
					</div>
					{/* Thanh slider */}
					<div>

					</div>
					<Slider style={{ marginTop: '4vh', marginRight: '1vh' }}
						range

						min={priceRange[0]}
						max={priceRange[1]}
						onChange={handlePriceRangeChange}
					/>

					<hr style={{ margin: "20px 0" }} />
					<h3>Lọc theo thuộc tính</h3>
					<h4 style={{ marginTop: 5 }}>Màu sắc</h4>
					<Checkbox.Group options={colorOptions} onChange={onColorsSelected} />
					<h4 style={{ marginTop: 5 }}>Kích cỡ</h4>
					<Checkbox.Group options={sizesOptions} onChange={onSizesSelected} />
				</Sider>


				<Layout style={{ padding: '0 24px 24px' }}>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						{/* product list */}
						<ProductList data={products} totalpage={totalPage} setProductPage={setProductPage} />
					</Content>

				</Layout>
			</Layout>
		</div>
	);
};


export default ListProduct;