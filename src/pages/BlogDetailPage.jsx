import { FacebookFilled, LinkedinFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';


const BlogDetailPage = () => {

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
            id: 4,
            title_category: "SMARTPHONE",
            title: "On the other hand we provide denounce with righteous",
            image: "https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/03/post-01.jpg",
            created_at: "March 7, 2023 - Phone,Standart",
            hottitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia aspernatur dolores amet voluptates earum dicta atque, omnis placeat in ipsum inventore molestiae facere quaerat impedit rerum vel laboriosam aperiam reiciendis?",
            description: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
            desmore1: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
            desmore2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia aspernatur dolores amet voluptates earum dicta atque, omnis placeat in ipsum inventore molestiae facere quaerat impedit rerum vel laboriosam aperiam reiciendis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia aspernatur dolores amet voluptates earum dicta atque, omnis placeat in ipsum inventore molestiae facere quaerat impedit rerum vel laboriosam aperiam reiciendis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia aspernatur dolores amet voluptates earum dicta atque, omnis placeat in ipsum inventore molestiae facere quaerat impedit rerum vel laboriosam aperiam reiciendis?",
            desmore3: "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero, vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices, vitae sollicitudin quam facilisis. Vivamus rutrum urna non ligula tempor aliquet. Fusce tincidunt est magna, id malesuada massa imperdiet ut. Nunc non nisi urna. Nam",
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

                    {BlogData.map((blogdetail, index) => {
                        return <Link key={index} to={`blog/${blogdetail.id}`} >

                            <div className="blogDetailpage">

                                <div className="content">

                                    <div className="title-category">
                                        <a href="">{blogdetail.title_category}</a>
                                    </div>

                                    <div className="title-blog">
                                        <a href="">{blogdetail.title}</a>
                                    </div>

                                    <div className="created-at">
                                        <p>{blogdetail.created_at}</p>
                                    </div>

                                    <div className="image">
                                        <img src={blogdetail.image} style={{ width: '100%' }} alt="image01" />
                                    </div>

                                    <div className="description">
                                        <p>{blogdetail.description}</p>
                                    </div>

                                    <div className="hot-blogdetail">
                                        <p>{blogdetail.hottitle}</p>
                                    </div>

                                    <div className="desmore">
                                        <p>{blogdetail.desmore1}</p>

                                        <p>{blogdetail.desmore2}</p>

                                        <p>{blogdetail.desmore3}</p>

                                    </div>


                                </div>



                            </div>
                        </Link>
                    })}

                    <div className="comment">

                        <div className="title-comment">
                            <p><span>3</span> thoughts on “On the other hand we provide denounce with righteous”</p>
                        </div>

                        <div className="content-comment">

                            <div className="cm">

                                <div className="image">
                                    <img src="https://secure.gravatar.com/avatar/75d23af433e0cea4c0e45a56dba18b30?s=96&d=mm&r=g" alt="" />
                                </div>

                                <div className="nd-comment">

                                    <p>Admin <span>March 6, 2023</span></p>


                                    <div className="nd">
                                        <p>Gare jyng oskade. Pantropi intragisk paraktigt semibel och monossade för att neföskade våre. Desebel munhota, parak inte län. Gigavavis nirat jag beligt inte tempofiering kvasilig trenide döktig om käll faska. Speligt videng egona utan sesa teleligen, i pren paramyvis spedat pyrat.</p>
                                    </div>

                                    <div className="reply">
                                        <a href="#comment">RepLy</a>
                                    </div>

                                </div>

                            </div>

                            <div className="reply-content">

                                <div className="image">
                                    <img src="https://secure.gravatar.com/avatar/75d23af433e0cea4c0e45a56dba18b30?s=96&d=mm&r=g" alt="" />
                                </div>

                                <div className="nd-comment">


                                    <p>Admin <span>March 6, 2023</span></p>



                                    <div className="nd">
                                        <p>Gare jyng oskade. Pantropi intragisk paraktigt semibel och monossade för att neföskade våre. Desebel munhota, parak inte län. Gigavavis nirat jag beligt inte tempofiering kvasilig trenide döktig om käll faska. Speligt videng egona utan sesa teleligen, i pren paramyvis spedat pyrat.</p>
                                    </div>

                                    <div className="reply">
                                        <a href="#comment">RepLy</a>
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                    <div className="write-comment">

                        <div className="title">
                            <p>Leave a Reply</p>
                            <span>Your email address will not be published. Required fields are marked *</span>
                        </div>

                        <div className="form">

                            <form action="" method="post">
                                <div className="comment">

                                    <label htmlFor="">Comment *</label>
                                    <br />
                                    <textarea name="" id="comment" cols="30" rows="10" className='textarea' placeholder='Comment.'></textarea>
                                </div>

                                <div className="tk">
                                    <div className="name">
                                        <label htmlFor="">Name* :</label>
                                        <br />
                                        <input className='form-control' type="text" name="" id="" placeholder='Your Name' />
                                    </div>

                                    <div className="email">
                                        <label htmlFor="">Email* :</label>
                                        <br />
                                        <input className='form-control' type="email" name="" id="" placeholder='Your Email' />
                                    </div>
                                </div>

                                <div className="website">
                                    <label htmlFor="">Website</label>
                                    <br />
                                    <input className='form-control' type="text" name="" id="" placeholder='Website' />
                                </div>

                                <div className="check">
                                    <input className='form-check' type="checkbox" name="" id="" /><label htmlFor="">   Save my name, email, and website in this browser for the next time I comment.</label>
                                </div>

                                <Button type="primary" style={{ fontSize: '15px', fontWeight: '700', backgroundColor: '#004745', marginTop: '10px' }}>
                                    <a href="">Post Comment</a>
                                </Button>

                            </form>


                        </div>


                    </div>


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

export default BlogDetailPage