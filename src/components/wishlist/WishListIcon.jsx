import { HeartFilled } from '@ant-design/icons'
import React from 'react'
import { useAppContext } from '../../provider/AppProvider'
import { toast } from 'react-toastify';
import instance from '../../core/api';

const WishListIcon = ({ product_id = null }) => {

     const { user, wishlistAction, setWishlistAction } = useAppContext();

     const handleAddWishList = () => {
          if (Object.keys(user).length <= 0) {
               toast.error("Vui lòng đăng nhập", { position: toast.POSITION.TOP_CENTER })
          } else {
               if (product_id) {
                    instance.post("/wishlist", { product_id, user_id: user.id })
                    .then((res) => {
                         setWishlistAction(!wishlistAction)
                         toast.success("Thêm thành công!", { position: toast.POSITION.TOP_CENTER});
                    })
                    .catch((err) => {
                         toast.error(err?.response?.data?.message || "Thêm vào yêu thích thất bại", { position: toast.POSITION.TOP_CENTER })
                    })
               }
          }
     };

     return (
          <div style={{position: "absolute", top: 5, right: 5, zIndex: 99}} onClick={handleAddWishList}>
               <div style={{ color: "red", fontSize: 24, opacity: 0.8, cursor: "pointer"}}>
               <HeartFilled />
               </div>
          </div>
     )
}

export default WishListIcon