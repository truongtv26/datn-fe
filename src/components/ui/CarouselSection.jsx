import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Image } from 'antd';
import React, { useRef } from 'react'

const previousButton = {
     position: 'absolute',
     zIndex: 1,
     left: '0',
     top: '50%',
     transForm: 'translate-Y(-50%)',
     backgroundColor: 'transparent',
     border: 0,
     color: 'white',
}
const nextButton = {
     position: 'absolute',
     zIndex: 1,
     right: '0',
     top: '50%',
     transForm: 'translate-Y(-50%)',
     backgroundColor: 'transparent',
     border: 0,
     color: 'white',
}

const CarouselSection = () => {
     const ref = useRef()

     const onChange = (currentSlide) => {
          // console.log(currentSlide);
     };
     return (
          <div className='flex md:flex-row gap-4 w-full h-[180px] sm:h-[280px] md:h-[360px]'>
               <div className='slide-img w-full  relative'>
                    <Button style={previousButton} onClick={() => { ref.current.prev() }} icon={<LeftOutlined />} />
                    <Carousel
                         afterChange={onChange}
                         autoplay={true}
                         autoplaySpeed={3000}
                         draggable
                         ref={ref}
                    >
                         <div className=''>
                              <div>
                                   <Image
                                        preview={false}
                                        className='w-full h-[180px] sm:h-[280px] md:h-[360px]'
                                        src={'https://supersports.com.vn/cdn/shop/files/MIZUNO_1545x500_8a897078-58bb-4754-a92f-755529bcfd61.jpg?v=1711073894&width=1500'} />
                              </div>
                         </div>
                         <div>
                              <div>
                                   <Image
                                        preview={false}
                                        className='w-full h-[180px] sm:h-[280px] md:h-[360px]'
                                        src={'https://supersports.com.vn/cdn/shop/files/PUMA_ONEPIECE_1545x500_2c9199d7-acc0-4722-af9c-3635cd38404b.jpg?v=1711594468&width=1500'} />
                              </div>
                         </div>
                         <div>
                              <div>
                                   <Image
                                        preview={false}
                                        className='w-full h-[180px] sm:h-[280px] md:h-[360px]'
                                        src={'https://supersports.com.vn/cdn/shop/files/PAYDAY_25-30.04_1545_500_V.jpg?v=1714041328&width=1500'} />
                              </div>
                         </div>
                    </Carousel>
                    <Button style={nextButton} onClick={() => { ref.current.next() }} icon={<RightOutlined />} />
               </div>
               {/* <div className='w-full md:w-[30%] md:h-[360px] hidden md:flex flex-col gap-1'>
                    <div className='slide-img'>
                         <Carousel
                              afterChange={onChange}
                              autoplay={true}
                              autoplaySpeed={3000}
                              draggable
                         >
                              <div>
                                   <div>
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             src={'https://supersports.com.vn/cdn/shop/files/Columbia_BOTW_23-30.04_581_574_V.jpg?v=1713757653&width=1024'} />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             src={'https://supersports.com.vn/cdn/shop/files/Swim_BOTW_23-30.04_581_574_V.jpg?v=1713757646&width=1024'} />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             src={'https://supersports.com.vn/cdn/shop/files/Holiday_26-30.04_581x574_V.jpg?v=1714041228&width=1024'} />
                                   </div>
                              </div>
                         </Carousel>
                    </div>
                    <div className='slide-img'>
                         <Carousel
                              afterChange={onChange}
                              autoplay={true}
                              autoplaySpeed={3000}
                              draggable
                         >
                              <div>
                                   <div >
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             src={'https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg'} />
                                   </div>
                              </div>
                              <div>
                                   <div >
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             src={'https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg'} />
                                   </div>
                              </div>
                              <div>
                                   <div >
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             src={'https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg'} />
                                   </div>
                              </div>
                         </Carousel>
                    </div>
               </div> */}
          </div>
     )
}

export default CarouselSection