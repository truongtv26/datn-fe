import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import WishList from '../components/wishlist/WishList'
import instance from '../core/api';
import { useAppContext } from '../provider/AppProvider';

const WishListPage = () => {

     const { user, wishlistAction } = useAppContext();

     const [wishlist, setWishlist] = useState([])
     
     useEffect(()=> {
          instance.get("wishlist", {
               params: {
                    user_id: user.id
               }
          })
          .then((res) => {
               if (res.status === 200) {
                    setWishlist(res.data)
               }
          })
     }, [wishlistAction])

     return (
          <div className="container mx-auto">
               <div className="top-content">
                    <Link to={'/'}>Trang chủ</Link> {`/`} <Link to={'/wishlist'}>Sản phẩm yêu thích</Link>
               </div>
               <WishList data={wishlist}/>
          </div>
     )
}

export default WishListPage