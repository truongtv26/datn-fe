import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
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
               <div className='w-full md:w-[70%] relative'>
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
                                   <img className='w-full h-[180px] sm:h-[280px] md:h-[360px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                              </div>
                         </div>
                         <div>
                              <div>
                                   <img className='w-full h-[180px] sm:h-[280px] md:h-[360px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                              </div>
                         </div>
                         <div>
                              <div>
                                   <img className='w-full h-[180px] sm:h-[280px] md:h-[360px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                              </div>
                         </div>
                    </Carousel>
                    <Button style={nextButton} onClick={() => { ref.current.next() }} icon={<RightOutlined />} />
               </div>
               <div className='w-full md:w-[30%] md:h-[360px] hidden md:flex flex-col gap-1'>
                    <div>
                         <Carousel
                              afterChange={onChange}
                              autoplay={true}
                              autoplaySpeed={3000}
                              draggable
                         >
                              <div>
                                   <div>
                                        <img className='w-full md:h-[178px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <img className='w-full md:h-[178px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <img className='w-full md:h-[178px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                                   </div>
                              </div>
                         </Carousel>
                    </div>
                    <div>
                         <Carousel
                              afterChange={onChange}
                              autoplay={true}
                              autoplaySpeed={3000}
                              draggable
                         >
                              <div>
                                   <div >
                                        <img className='w-full md:h-[178px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                                   </div>
                              </div>
                              <div>
                                   <div >
                                        <img className='w-full md:h-[178px]' src="https://www.shutterstock.com/image-vector/sport-shoes-banner-website-button-260nw-2167767027.jpg" alt="" />
                                   </div>
                              </div>
                              <div>
                                   <div >
                                        <img className='w-full md:h-[178px]' src="https://graphicsfamily.com/wp-content/uploads/2020/07/Shoes-Advertising-Banner-Design-Template-scaled.jpg" alt="" />
                                   </div>
                              </div>
                         </Carousel>
                    </div>
               </div>
          </div>
     )
}

export default CarouselSection