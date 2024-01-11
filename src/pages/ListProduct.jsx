import React, { useState } from 'react';
import { Checkbox, Breadcrumb, Layout, Menu, theme, Card, Pagination, Input, Slider } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const { Sider, Content } = Layout;
const { Meta } = Card;


// 
const { Search } = Input;
// 
const checkboxStyle = {
  marginTop: '20px',
  fontSize: '16px',
};


const grayStyle = { color: 'gray', fontSize: '16px', };
const redStyle = { color: 'red', fontSize: '22px', };

const generateSubnav = (count, total, withChildren) => {
  return Array.from({ length: count }, (_, index) => {
    const key = total + index + 1;
    return {
      key: `sub${key}`,
      label: (
        <div>
          <Checkbox onChange={onChange} /> {`subnav ${key}`}
        </div>
      ),
      children: withChildren
        ? Array.from({ length: 4 }, (_, j) => ({
          key: key * 4 + j + 1,
          label: (
            <div>
              <Checkbox onChange={onChange} /> {`option${key * 4 + j + 1}`}
            </div>
          ),
        }))
        : [],
    };
  });
};

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const initialSubnavs = generateSubnav(5, 0, true); // Tạo 5 subnav có chứa con
const additionalSubnavs = generateSubnav(4, 5, false); // Tạo thêm 4 subnav không chứa con

const items2 = [...initialSubnavs, ...additionalSubnavs]; // Tổng cộng 9 subnav

const replaceContent = (key, newLabel, newOptions) => {
  const subnavIndex = items2.findIndex((item) => item.key === `sub${key}`);
  if (subnavIndex !== -1) {
    items2[subnavIndex].label = (
      <div>
        <Checkbox onChange={onChange} /> {newLabel}
      </div>
    );
    if (newOptions && newOptions.length > 0) {
      items2[subnavIndex].children = newOptions.map((option, index) => ({
        key: subnavIndex * 4 + index + 1,
        label: (
          <div style={{ fontSize: '16px' }}>
          <Checkbox onChange={onChange} /> {newLabel}
        </div>
        ),
      }));
    }
  }
};

// 

// 

// Thay đổi nhãn của từng subnav
replaceContent('1', 'NIKE', ['Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657', 'Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657', 'Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657', 'Giày Nike Air Force 1 Low ‘Rubiks Cube’ FN6840-657']);
replaceContent('2', 'ADIDAS', ['Giày adidas Multix ‘White Black’ FX5118', 'Giày adidas Yeezy Boost 700 ‘Utility Black’ FV5304', 'Giày adidas Yeezy 700 V3 ‘Copper Fade’ GY4109', 'Giày adidas Yeezy 700 V3 ‘Copper Fade’ GY4109']);
replaceContent('3', 'JORDAN', ['Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100', 'Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100', 'Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100', 'Giày Air Jordan Series ES ‘White Grey Fog’ DN1857-100']);
replaceContent('4', 'COCA COLA', ['Option 4-1', 'Option 4-2', 'Option 4-3', 'Option 4-4']);
replaceContent('5', 'DIOR', ['Option 5-1', 'Option 5-2', 'Option 5-3', 'Option 5-4']);
replaceContent('6', 'FILA');
replaceContent('7', 'GIVENCHI');
replaceContent('8', 'GUCCI');
replaceContent('9', 'LASCOTE');

const categories = [
  { image: 'https://sneakerdaily.vn/wp-content/uploads/2023/07/Thiet-ke-chua-co-ten.png.webp' },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 
  const [priceRange, setPriceRange] = useState([0, 100]); // Giá trị mặc định cho thanh slider
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };
  // 



  return (
    <div className='container mx-auto'>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Shop</Breadcrumb.Item>
      </Breadcrumb>

      {categories.map((category, index) => (
        <div key={index}>
          <img className="custom-image" src={category.image} alt="Shop" />
        </div>
      ))}

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <h2>Product Categories</h2>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: 'auto', borderRight: 0 }}
            items={items2}
          />
          <h2>Filter by price</h2>


          {/* Hai ô input cho giá trị tối thiểu và tối đa */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',fontSize:'16px' }}>
            <div style={{marginTop:'10px',marginRight:'5px'}} >
              <span style={{margin:'10px'}}  >Min price</span>
              <Input

                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e) => handleSliderChange([e.target.value, priceRange[1]])}
              />
            </div>
            <div style={{marginTop:'10px',marginRight:'5px'}} >
              <span style={{margin:'10px'}} >Max price</span>
          
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
          <Slider style={{marginTop:'4vh',marginRight:'1vh'}}
            range
            defaultValue={priceRange}
            min={0}
            max={100}
            onChange={handleSliderChange}
          />

          {/* brands */}
          <div style={{marginTop:'20px'}} >

       
          <h2 >Brands</h2>
          <div  style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Adidas</Checkbox>
         
          </div>
          <div style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Filas</Checkbox>
          </div>
          <div style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Converse</Checkbox>
          </div>
          <div style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Nike</Checkbox>
          </div>
          <div style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Fila</Checkbox>
          </div>
          </div>

            {/* status */}
            <div style={{marginTop:'20px'}}>
            <h2>Product Status</h2>
          <div style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Instock</Checkbox>
          </div>
          <div style={{marginTop:'20px'}}>
          <Checkbox style={{fontSize:'2vh'}} onChange={onChange}>Onsale</Checkbox>
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
            <div style={{ display: 'flex', textAlign: 'center' }}>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}

                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Retro-High-OG-GS-Chicago-Lost-Found-FD1437-612.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>



                </Card>


              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Mid-Patent-SE-GS-Black-Gold-BQ6931-007.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>

                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2022/09/Giay-Nike-Air-Force-1-Low-Triple-White-315122-111-CW2288-111-DD8959-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2020/11/Giay-nam-Air-Jordan-1-Low-Light-Smoke-Grey-Red-553558-030.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  {/* <Meta title="Giày Air Jordan 1 Retro Low OG
       ‘Year of the Dragon’ FN3727-100" description="www.instagram.com" /> */}
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>

                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-WMNS-Air-Jordan-1-Low-SE-Year-of-the-Dragon-FJ5735-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', width: '16vh', fontSize: '20px', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>

              </div>
            </div>


            {/* test2 */}
            <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px' }}>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}

                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Retro-High-OG-GS-Chicago-Lost-Found-FD1437-612.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>



                </Card>


              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Mid-Patent-SE-GS-Black-Gold-BQ6931-007.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>

                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2022/09/Giay-Nike-Air-Force-1-Low-Triple-White-315122-111-CW2288-111-DD8959-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2020/11/Giay-nam-Air-Jordan-1-Low-Light-Smoke-Grey-Red-553558-030.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  {/* <Meta title="Giày Air Jordan 1 Retro Low OG
       ‘Year of the Dragon’ FN3727-100" description="www.instagram.com" /> */}
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>

                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-WMNS-Air-Jordan-1-Low-SE-Year-of-the-Dragon-FJ5735-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>

              </div>
            </div>
            {/* test2 */}

            {/* test3 */}
            <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px' }}>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}

                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Retro-High-OG-GS-Chicago-Lost-Found-FD1437-612.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>



                </Card>


              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Mid-Patent-SE-GS-Black-Gold-BQ6931-007.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>

                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2022/09/Giay-Nike-Air-Force-1-Low-Triple-White-315122-111-CW2288-111-DD8959-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2020/11/Giay-nam-Air-Jordan-1-Low-Light-Smoke-Grey-Red-553558-030.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  {/* <Meta title="Giày Air Jordan 1 Retro Low OG
       ‘Year of the Dragon’ FN3727-100" description="www.instagram.com" /> */}
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>

                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-WMNS-Air-Jordan-1-Low-SE-Year-of-the-Dragon-FJ5735-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>

              </div>
            </div>

            {/* test3 */}

            {/* test4 */}
            <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px' }}>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}

                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Retro-High-OG-GS-Chicago-Lost-Found-FD1437-612.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>



                </Card>


              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-Air-Jordan-1-Mid-Patent-SE-GS-Black-Gold-BQ6931-007.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>

                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2022/09/Giay-Nike-Air-Force-1-Low-Triple-White-315122-111-CW2288-111-DD8959-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>
                <Card
                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2020/11/Giay-nam-Air-Jordan-1-Low-Light-Smoke-Grey-Red-553558-030.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>
                  {/* <Meta title="Giày Air Jordan 1 Retro Low OG
       ‘Year of the Dragon’ FN3727-100" description="www.instagram.com" /> */}
                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>

                </Card>
              </div>
              <div className='product-card' style={{ margin: '10px' }}>

                <Card

                  hoverable
                  style={{
                    width: 210,
                  }}
                  cover={<img alt="example" src="https://sneakerdaily.vn/wp-content/uploads/2024/01/Giay-WMNS-Air-Jordan-1-Low-SE-Year-of-the-Dragon-FJ5735-100.jpg" />}
                >
                  <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                  <h3>Giày Air Jordan 1 Retro Low OG
                    ‘Year of the Dragon’ FN3727-100</h3>
                  <strong style={grayStyle}><s>$1400</s></strong> - <strong style={redStyle}>$1900</strong>

                  <button style={{ padding: '1vh', fontSize: '20px', width: '16vh', borderRadius: '1vh', backgroundColor: 'black', color: 'white', border: 'none', marginTop: '1vh' }}>Add to Cart</button>
                </Card>

              </div>
            </div>
            {/* test4 */}

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


export default App;



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




