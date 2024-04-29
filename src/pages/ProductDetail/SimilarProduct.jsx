import { Col, Flex, Row } from "antd";
import styles from "./page.module.css";

const data = [
  {
    id: 1,
    name: "Product 1 Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
    price: 1000000,
    image:
      "https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg",
    rate: 4.5,
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Product 2 Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
    price: 20000,
    image:
      "https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg",
    rate: 5,
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Product 3 Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
    price: 30000,
    image:
      "https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg",
    rate: 1,
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    name: "Product 4 Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
    price: 40000,
    image:
      "https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-1-Low-Alternate-Royal-Toe-553558-140.jpg",
    rate: 1,
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const SimilarProduct = () => {
  return (
    // <div className={styles["similar-wrapper"]}>
    //   <h3 className="text-center text-3xl" style={{ marginBottom: 20 }}>
    //     Sản phẩm tương tự
    //   </h3>

    //   <Row gutter={[16]}>
    //     {data.map(({ id, image, name, price }) => (
    //       <Col key={id} xs={24} lg={6}>
    //         <a href="">
    //           <div className={styles["card"]}>
    //             <img src={image} alt="" width="100%" />
    //             <h4 className={`${styles["card-name"]} text-center`}>{name}</h4>
    //             <Flex justify="center" className="price">
    //               <p className="new-price">
    //                 {new Intl.NumberFormat("vi-VN", {
    //                   style: "currency",
    //                   currency: "VND",
    //                 }).format(price)}
    //               </p>
    //               <p className="old-price">
    //                 {new Intl.NumberFormat("vi-VN", {
    //                   style: "currency",
    //                   currency: "VND",
    //                 }).format(price)}
    //               </p>
    //             </Flex>
    //           </div>
    //         </a>
    //       </Col>
    //     ))}
    //   </Row>
    // </div>
    <></>
  );
};
