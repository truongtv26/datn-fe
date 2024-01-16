import React, { useState } from 'react';
import { Checkbox, Breadcrumb, Layout, Menu, theme, Card, Pagination, Input, Slider, Button, Rate, Divider } from 'antd';
//import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
  { image: 'https://klbtheme.com/blonwe/grocery/wp-content/uploads/sites/5/2023/07/grocery-banner.jpg' },
];

const ListProduct = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 
  const [priceRange, setPriceRange] = useState([0, 100]); // Giá trị mặc định cho thanh slider
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

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


      {categories.map((category, index) => (
        <div key={index}>
          <img className="custom-image" src={category.image} alt="Shop" />
        </div>
      ))}

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <h2>Product Categories</h2>
          <Menu> <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          <Divider />
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} /></Menu>
          
         
      
         
          <h2>Filter by price</h2>


          {/* Hai ô input cho giá trị tối thiểu và tối đa */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '16px' }}>
            <div style={{ marginTop: '10px', marginRight: '5px' }} >
              <span style={{ margin: '10px' }}  >Min price</span>
              <Input

                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e) => handleSliderChange([e.target.value, priceRange[1]])}
              />
            </div>
            <div style={{ marginTop: '10px', marginRight: '5px' }} >
              <span style={{ margin: '10px' }} >Max price</span>

              <Input


                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e) => handleSliderChange([priceRange[0], e.target.value])}
              />
            </div>
          </div>
          {/* Thanh slider */}
          <div>

          </div>
          <Slider style={{ marginTop: '4vh', marginRight: '1vh' }}
            range
            defaultValue={priceRange}
            min={0}
            max={100}
            onChange={handleSliderChange}
          />

          {/* brands */}
          <div style={{ marginTop: '20px' }} >


            <h2 >Brands</h2>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Adidas</Checkbox>

            </div>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Filas</Checkbox>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Converse</Checkbox>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Nike</Checkbox>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Fila</Checkbox>
            </div>
          </div>

          {/* status */}
          <div style={{ marginTop: '20px' }}>
            <h2>Product Status</h2>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Instock</Checkbox>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Checkbox style={{ fontSize: '2vh' }} onChange={onChange}>Onsale</Checkbox>
            </div>
          </div>











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
                      style={{
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                      hoverable
                      borderRadius={10}
                      cover={<img alt="example" src={product.image} />}
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
              </div >
            </div>
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
              <Pagination defaultCurrent={1} total={50} />
            </div>

          </Content>

        </Layout>
      </Layout>
      {/* <Pagination current={current} onChangepage={onChangepage} total={50} /> */}
    </div>
  );
};


export default ListProduct;



// import React from 'react';
// import { Checkbox, Breadcrumb, Layout, Menu, theme, Input, Slider } from 'antd';

// const { Sider, Content } = Layout;

// const generateSubnav = (count, total, withChildren) => {
//   return Array.from({ length: count }, (_, index) => {
//     const key = total + index + 1;
//     return {
//       key: `sub${key}`,
//       label: (
//         <div>
//           <Checkbox onChange={onChange} /> {`subnav ${key}`}
//         </div>
//       ),
//       children: withChildren
//         ? Array.from({ length: 4 }, (_, j) => ({
//             key: key * 4 + j + 1,
//             label: (
//               <div>
//                 <Checkbox onChange={onChange} /> {`option${key * 4 + j + 1}`}
//               </div>
//             ),
//           }))
//         : [],
//     };
//   });
// };

// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };



// const initialSubnavs = generateSubnav(5, 0, true);
// const additionalSubnavs = generateSubnav(4, 5, false);

// const priceFilterItem = {
//   key: 'priceFilter',
//   label: (
//     <div>
//       <h3>Price Filter</h3>
//       <Input placeholder="Min Price" style={{ marginBottom: '10px' ,marginTop:'5px'}} />
//       <Input placeholder="Max Price" style={{ marginBottom: '10px',marginTop:'5px' }} />
//       <Slider range defaultValue={[0, 100]} />
//     </div>
//   ),
//   children: [],
// };

// const items2 = [...initialSubnavs, ...additionalSubnavs, priceFilterItem];

// const replaceContent = (key, newLabel, newOptions) => {
//   const subnavIndex = items2.findIndex((item) => item.key === `sub${key}`);
//   if (subnavIndex !== -1) {
//     items2[subnavIndex].label = (
//       <div>
//         <Checkbox onChange={onChange} /> {newLabel}
//       </div>
//     );
//     if (newOptions && newOptions.length > 0) {
//       items2[subnavIndex].children = newOptions.map((option, index) => ({
//         key: subnavIndex * 4 + index + 1,
//         label: (
//           <div>
//             <Checkbox onChange={onChange} /> {option}
//           </div>
//         ),
//       }));
//     }
//   }
// };



// replaceContent('1', 'NIKE', ['Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657', '...', '...']);
// replaceContent('2', 'ADIDAS', ['Giày adidas Multix ‘White Black’ FX5118', '...', '...']);
// replaceContent('3', 'JORDAN', ['Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100', '...', '...']);
// replaceContent('4', 'COCA COLA', ['Option 4-1', 'Option 4-2', 'Option 4-3', 'Option 4-4']);
// replaceContent('5', 'DIOR', ['Option 5-1', 'Option 5-2', 'Option 5-3', 'Option 5-4']);
// replaceContent('6', 'FILA');
// replaceContent('7', 'GIVENCHI');
// replaceContent('8', 'GUCCI');
// replaceContent('9', 'LASCOTE');

// const categories = [
//   { image: 'https://sneakerdaily.vn/wp-content/uploads/2023/07/Thiet-ke-chua-co-ten.png.webp' },
// ];

// const App = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <div className='container mx-auto'>
//       <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>Shop</Breadcrumb.Item>
//       </Breadcrumb>

//       {categories.map((category, index) => (
//         <div key={index}>
//           <img className="custom-image" src={category.image} alt="Shop" />
//         </div>
//       ))}

//       <Layout>
//         <Sider width={200} style={{ background: colorBgContainer }}>
//           <h3>Product Categories</h3>
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             style={{ height: '100%', borderRight: 0 }}
//             items={items2}
//           />
//         </Sider>
//         <Layout style={{ padding: '0 24px 24px' }}>
//           <Content
//             style={{
//               padding: 24,
//               margin: 0,
//               minHeight: 280,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             Content 56789
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default App;

// import React from 'react';
// import { Checkbox, Breadcrumb, Layout, theme, Input, Slider } from 'antd';
// import styled from 'styled-components';

// const { Sider, Content } = Layout;

// const CustomImage = styled.img`
//   width: 100%;
//   height: auto;
//   margin-bottom: 16px;
// `;

// const Sidebar = styled(Sider)`
//   background: ${(props) => props.colorBgContainer};
//   padding: 16px;
// `;

// const CategoryMenu = styled.div`
//   h3 {
//     color: white;
//     margin-bottom: 16px;
//   }
// `;

// const PriceFilterContainer = styled.div`
//   margin-top: 20px;
// `;

// const StyledInput = styled(Input)`
//   width: 100%;
//   margin-bottom: 10px;
//   margin-top: 5px;
// `;

// const StyledSlider = styled(Slider)`
//   width: 100%;
// `;

// const generateSubnav = (count, total, withChildren) => {
//     return Array.from({ length: count }, (_, index) => {
//             const key = total + index + 1;
//             return {
//               key: `sub${key}`,
//               label: (
//                 <div>
//                   <Checkbox onChange={onChange} /> {`subnav ${key}`}
//                 </div>
//               ),
//               children: withChildren
//                 ? Array.from({ length: 4 }, (_, j) => ({
//                     key: key * 4 + j + 1,
//                     label: (
//                       <div>
//                         <Checkbox onChange={onChange} /> {`option${key * 4 + j + 1}`}
//                       </div>
//                     ),
//                   }))
//                 : [],
//             };
//           });
// };

// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };

// const initialSubnavs = generateSubnav(5, 0, true);
// const additionalSubnavs = generateSubnav(4, 5, false);

// const priceFilterItem = {
//   key: 'priceFilter',
//   label: (
//     <PriceFilterContainer>
//       <h3>Price Filter</h3>
//       <StyledInput placeholder="Min Price" />
//       <StyledInput placeholder="Max Price" />
//       <StyledSlider range defaultValue={[0, 100]} />
//     </PriceFilterContainer>
//   ),
//   children: [],
// };

// const items2 = [...initialSubnavs, ...additionalSubnavs, priceFilterItem];

// const replaceContent = (key, newLabel, newOptions) => {
//     const subnavIndex = items2.findIndex((item) => item.key === `sub${key}`);
//       if (subnavIndex !== -1) {
//         items2[subnavIndex].label = (
//           <div>
//             <Checkbox onChange={onChange} /> {newLabel}
//           </div>
//         );
//         if (newOptions && newOptions.length > 0) {
//           items2[subnavIndex].children = newOptions.map((option, index) => ({
//             key: subnavIndex * 4 + index + 1,
//             label: (
//               <div>
//                 <Checkbox onChange={onChange} /> {option}
//               </div>
//             ),
//           }));
//         }
//       }
// };

// replaceContent('1', 'NIKE', ['Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657', '...', '...']);
// replaceContent('2', 'ADIDAS', ['Giày adidas Multix ‘White Black’ FX5118', '...', '...']);
// replaceContent('3', 'JORDAN', ['Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100', '...', '...']);
// replaceContent('4', 'COCA COLA', ['Option 4-1', 'Option 4-2', 'Option 4-3', 'Option 4-4']);
// replaceContent('5', 'DIOR', ['Option 5-1', 'Option 5-2', 'Option 5-3', 'Option 5-4']);
// replaceContent('6', 'FILA');
// replaceContent('7', 'GIVENCHI');
// replaceContent('8', 'GUCCI');
// replaceContent('9', 'LASCOTE');

// const categories = [
//   { image: 'https://sneakerdaily.vn/wp-content/uploads/2023/07/Thiet-ke-chua-co-ten.png.webp' },
// ];

// const App = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <div className='container mx-auto'>
//       <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>Shop</Breadcrumb.Item>
//       </Breadcrumb>

//       {categories.map((category, index) => (
//         <div key={index}>
//           <CustomImage className="custom-image" src={category.image} alt="Shop" />
//         </div>
//       ))}

//       <Layout>
//         <Sidebar width={200} colorBgContainer={colorBgContainer}>
//           <CategoryMenu>
//             <h3>Product Categories</h3>
//             {/* Đưa nút Checkbox và nhãn vào đây nếu cần */}
//             {/* ... */}
//             <Menu
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             style={{ height: '100%', borderRight: 0 }}
//             items={items2}
//           />
//           </CategoryMenu>

//           {items2.map((item) => (
//             <div key={item.key}>{item.label}</div>
//           ))}
//         </Sidebar>

//         <Layout style={{ padding: '0 24px 24px' }}>
//           <Content
//             style={{
//               padding: 24,
//               margin: 0,
//               minHeight: 280,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             Content 56789
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default App;



// import React from 'react';
// import { Checkbox, Breadcrumb, Layout, theme, Input, Slider } from 'antd';
// import styled from 'styled-components';

// const { Sider, Content } = Layout;

// const CustomImage = styled.img`
//   width: 100%;
//   height: auto;
//   margin-bottom: 16px;
// `;

// const Sidebar = styled(Sider)`
//   background: ${(props) => props.colorBgContainer};
//   padding: 16px;
// `;

// const CategoryMenu = styled.div`
//   h3 {
//     color: white;
//     margin-bottom: 16px;
//   }
// `;

// const PriceFilterContainer = styled.div`
//   margin-top: 20px;
// `;

// const StyledInput = styled(Input)`
//   width: 100%;
//   margin-bottom: 10px;
//   margin-top: 5px;
// `;

// const StyledSlider = styled(Slider)`
//   width: 100%;
// `;

// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };

// const generateSubnav = (count, total, withChildren) => {
//   return Array.from({ length: count }, (_, index) => {
//     const key = total + index + 1;
//     return {
//       key: `sub${key}`,
//       label: (
//         <div>
//           <Checkbox onChange={onChange} /> {`subnav ${key}`}
//         </div>
//       ),
//       children: withChildren
//         ? Array.from({ length: 4 }, (_, j) => ({
//             key: key * 4 + j + 1,
//             label: (
//               <div>
//                 <Checkbox onChange={onChange} /> {`option${key * 4 + j + 1}`}
//               </div>
//             ),
//           }))
//         : [],
//     };
//   });
// };

// const initialSubnavs = generateSubnav(5, 0, true);
// const additionalSubnavs = generateSubnav(4, 5, false);

// const priceFilterItem = {
//   key: 'priceFilter',
//   label: (
//     <PriceFilterContainer>
//       <h3>Price Filter</h3>
//       <StyledInput placeholder="Min Price" />
//       <StyledInput placeholder="Max Price" />
//       <StyledSlider range defaultValue={[0, 100]} />
//     </PriceFilterContainer>
//   ),
//   children: [],
// };

// const items2 = [...initialSubnavs, ...additionalSubnavs, priceFilterItem];

// const replaceContent = (key, newLabel, newOptions) => {
//   const subnavIndex = items2.findIndex((item) => item.key === `sub${key}`);
//   if (subnavIndex !== -1) {
//     items2[subnavIndex].label = (
//       <div>
//         <Checkbox onChange={onChange} /> {newLabel}
//       </div>
//     );
//     if (newOptions && newOptions.length > 0) {
//       items2[subnavIndex].children = newOptions.map((option, index) => ({
//         key: subnavIndex * 4 + index + 1,
//         label: (
//           <div>
//             <Checkbox onChange={onChange} /> {option}
//           </div>
//         ),
//       }));
//     }
//   }
// };

// replaceContent('1', 'NIKE', ['Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657', '...', '...']);
// replaceContent('2', 'ADIDAS', ['Giày adidas Multix ‘White Black’ FX5118', '...', '...']);
// replaceContent('3', 'JORDAN', ['Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100', '...', '...']);
// replaceContent('4', 'COCA COLA', ['Option 4-1', 'Option 4-2', 'Option 4-3', 'Option 4-4']);
// replaceContent('5', 'DIOR', ['Option 5-1', 'Option 5-2', 'Option 5-3', 'Option 5-4']);
// replaceContent('6', 'FILA');
// replaceContent('7', 'GIVENCHI');
// replaceContent('8', 'GUCCI');
// replaceContent('9', 'LASCOTE');

// const categories = [
//   { image: 'https://sneakerdaily.vn/wp-content/uploads/2023/07/Thiet-ke-chua-co-ten.png.webp' },
// ];

// const App = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <div className='container mx-auto'>
//       <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>Shop</Breadcrumb.Item>
//       </Breadcrumb>

//       {categories.map((category, index) => (
//         <div key={index}>
//           <CustomImage className="custom-image" src={category.image} alt="Shop" />
//         </div>
//       ))}

//       <Layout>
//         <Sidebar width={200} colorBgContainer={colorBgContainer}>
//           <CategoryMenu>
//             <h3>Product Categories</h3>
//             {/* Đưa nút Checkbox và nhãn vào đây nếu cần */}
//             {/* ... */}
//           </CategoryMenu>

//           {items2.map((item) => (
//             <div key={item.key}>{item.label}</div>
//           ))}
//         </Sidebar>

//         <Layout style={{ padding: '0 24px 24px' }}>
//           <Content
//             style={{
//               padding: 24,
//               margin: 0,
//               minHeight: 280,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             Content 56789
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default App;