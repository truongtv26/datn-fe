import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Row, Col, Flex, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import { CarouselImgs } from "./CarouselImgs";
import { Description } from "./ProductDescription";
import { SimilarProduct } from "./SimilarProduct";
import { Tips } from "./Tips";


const ProductDetailPage = () => {
  
  const { slug } = useParams();
  
  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
  return (
    <div className="container mx-auto">
      <Breadcrumb
        items={[
          {
            href: "",
            title: (
              <div style={{ color: "#000" }}>
                <HomeOutlined />
                <span style={{ marginLeft: 8 }}>Trang chủ</span>
              </div>
            ),
          },
          {
            href: "",
            title: `${slug}`,
          },
        ]}
      />

      <div className="w-full mt-5">
        <Row gutter={[40]} justify="space-between">
          <Col xs={24} lg={11}>
            <CarouselImgs />
          </Col>

          <Col xs={24} lg={11}>
            <h3 className="text-3xl font-normal">
              Giày Nike Air Jordan 1 High Travis Scott Like Auth
            </h3>
            <Flex align="flex-end" gap={8} className={styles["price"]}>
              <p className={styles["new-price"]}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(1890000)}
              </p>
              <p className={styles["old-price"]}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(3000000)}
              </p>
            </Flex>
            <Flex gap={40} className={styles["size-box"]}>
              <p className={styles["label"]}>Size</p>
              <Flex gap={12}>
                {sizes.map((size) => (
                  <Flex
                    key={size}
                    justify="center"
                    align="center"
                    className={styles["size-item"]}
                  >
                    <p>{size}</p>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            <Flex gap={5}>
              <button
                className={`${styles["action-btn"]} ${styles["add-btn"]}`}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className={`${styles["action-btn"]} ${styles["buy-btn"]}`}
              >
                Mua ngay
              </button>
            </Flex>

            <Space direction="vertical" size="middle" className="mt-5">
              <p className="font-bold">
                Mã: <span className="font-normal">NAJ60</span>
              </p>
              <p className="font-bold">
                Thương hiệu: <span className="font-normal">Air Jordan</span>
              </p>
              <p className="font-bold">
                Từ khóa: <span className="font-normal">nike travis scott</span>
              </p>
            </Space>
          </Col>
        </Row>
      </div>

      <Description />
      <SimilarProduct />
      <Tips />
    </div>
  );
};

export default ProductDetailPage;
