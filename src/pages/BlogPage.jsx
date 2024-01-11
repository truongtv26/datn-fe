import { FacebookFilled, LinkedinFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';


const BlogPage = () => {

    const CategoryData = [
        {
            id: 1,
            name: "Tablet",
        },
        {
            id: 2,
            name: "SMARTPHONE",
        },
    ]

    const BlogData = [
        {
            id: 1,
            title_category: "Tablet",
            title: "English Breakfast Tea With Tasty Donut Desserts",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-04.jpg",
            created_at: "March 7, 2023",
            description: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
        },
        {
            id: 2,
            title_category: "SMARTPHONE",
            title: "The Problem With Typefaces on the Web",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-03.jpg",
            created_at: "March 7, 2023",
            description: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
        },

        {
            id: 3,
            title_category: "Tablet",
            title: "But I must explain to you how all this mistaken idea",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-02.jpg",
            created_at: "March 7, 2023",
            description: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
        },

        {
            id: 4,
            title_category: "SMARTPHONE",
            title: "On the other hand we provide denounce with righteous",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-01.jpg",
            created_at: "March 7, 2023 - Phone,Standart",
            description: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
        },
    ]

    const postwidgetData = [
        {
            id: 1,
            title: "On the other hand we provide denounce with righteous",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-01-100x100.jpg",
            created_at: "March 7, 2023",
        },

        {
            id: 2,
            title: "But I must explain to you how all this mistaken idea",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-02-100x100.jpg",
            created_at: "March 7, 2023",
        },

        {
            id: 3,
            title: "The Problem With Typefaces on the Web",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-03-100x100.jpg",
            created_at: "March 7, 2023",
        },

        {
            id: 4,
            title: "English Breakfast Tea With Tasty Donut Desserts",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-04-100x100.jpg",
            created_at: "March 7, 2023",
        },
    ]


    return (
        <div className='container mx-auto'>

            <div className="blog-container">

                {/* left-blog */}

                <div className="left-blog">

                    {BlogData.map((blog, index) => {
                        return <Link key={index} to={`blog/${blog.id}`} >

                            <div className="blog">


                                <div className="image">
                                    <img src={blog.image} alt="image01" />
                                </div>

                                <div className="content">

                                    <div className="title-category">
                                        <a href="">{blog.title_category}</a>
                                    </div>

                                    <div className="title-blog">
                                        <a href="">{blog.title}</a>
                                    </div>

                                    <div className="created-at">
                                        <p>{blog.created_at}</p>
                                    </div>

                                    <div className="description">
                                        <p>{blog.description}</p>
                                    </div>

                                    <div className="button">
                                        <Button>Read More</Button>
                                    </div>

                                </div>



                            </div>
                        </Link>
                    })}


                </div>



                {/* right-blog */}

                <div className="right-blog">

                    <div className="post-widget">

                        <div className="title-post">
                            Post Widget
                        </div>

                        {postwidgetData.map((blog, index) => {
                            return <Link key={index} to={`blog/${blog.id}`}>


                                <div className="content">
                                    <div className="image-post">
                                        <img src={blog.image} alt="" />
                                    </div>

                                    <div className="title-date">
                                        <a href="">{blog.title}</a>
                                        <p className='created-at'>{blog.created_at}</p>
                                    </div>
                                </div>


                            </Link>
                        })}
                    </div>

                    {/* Phần Social Media Widget */}
                    <div className="social">
                        <div className="title-social">
                            Social Media Widget
                        </div>

                        <div className="content">

                            <div className="face">
                                <a href=""><FacebookFilled style={{ paddingLeft: '20px', paddingRight: '25px', paddingTop: '15px', paddingBottom: '15px' }} />Fackebook</a>
                            </div>

                            <div className="twitter">
                                <a href=""><TwitterOutlined style={{ paddingLeft: '20px', paddingRight: '25px', paddingTop: '15px', paddingBottom: '15px' }} />Twitter</a>
                            </div>

                            <div className="linked">
                                <a href=""><LinkedinFilled style={{ paddingLeft: '20px', paddingRight: '25px', paddingTop: '15px', paddingBottom: '15px' }} />Linkedin</a>
                            </div>

                            <div className="you">
                                <a href=""><YoutubeFilled style={{ paddingLeft: '20px', paddingRight: '25px', paddingTop: '15px', paddingBottom: '15px' }} />Youtobe</a>
                            </div>


                        </div>

                    </div>




                </div>

            </div>







        </div>


    )
}

export default BlogPage