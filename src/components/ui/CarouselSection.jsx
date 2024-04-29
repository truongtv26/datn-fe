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
               <div className='slide-img w-full md:w-[70%] relative'>
                    <Button style={previousButton} onClick={() => { ref.current.prev() }} icon={<LeftOutlined />} />
                    <Carousel
                         afterChange={onChange}
                         autoplay={true}
                         autoplaySpeed={3000}
                         draggable
                         ref={ref}
                    >
                        
                         <div>
                              <div>
                                   <Image
                                        preview={false}
                                        className='w-full h-[180px] sm:h-[280px] md:h-[360px]'
                                        width={'100%'}
                                        height={'360px'}
                                        src={'https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-4.webp'} />
                              </div>
                         </div>
                         <div>
                              <div>
                                   <Image
                                        preview={false}
                                        className='w-full h-[180px] sm:h-[280px] md:h-[360px]'
                                        width={'100%'}
                                        height={'360px'}
                                        src={'https://lambanner.com/wp-content/uploads/2022/10/MNT-DESIGN-BANNER-GIAY-07.jpg'} />
                              </div>
                         </div>
                         <div>
                                   <div>
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             width={'100%'}
                                             height={'360px'}
                                             src={'https://media.licdn.com/dms/image/C5112AQEbrswDJBdyKg/article-inline_image-shrink_1000_1488/0/1520192850086?e=1719446400&v=beta&t=oXx1W0mKCEw0v4IEq0B7NAcD7ABBlnE6BD3XeqoC9Ic'} />
                                   </div>
                              </div>
                    </Carousel>
                    <Button style={nextButton} onClick={() => { ref.current.next() }} icon={<RightOutlined />} />
               </div>
               <div className='w-full md:w-[30%] md:h-[360px] hidden md:flex flex-col gap-1'>
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
                                             width={'100%'}
                                             height={'178px'}
                                             src={'https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-6.webp'} />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             width={'100%'}
                                             height={'178px'}
                                             src={'https://media.licdn.com/dms/image/C5112AQEbrswDJBdyKg/article-inline_image-shrink_1000_1488/0/1520192850086?e=1719446400&v=beta&t=oXx1W0mKCEw0v4IEq0B7NAcD7ABBlnE6BD3XeqoC9Ic'} />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <Image
                                             preview={false}
                                             className='w-full md:h-[178px]'
                                             width={'100%'}
                                             height={'178px'}
                                             src={'https://lambanner.com/wp-content/uploads/2022/10/MNT-DESIGN-BANNER-GIAY-07.jpg'} />
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
               </div>
          </div>
     )
}

export default CarouselSection