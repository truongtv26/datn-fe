import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Row, Col, Flex, Space, Button, Radio, InputNumber } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import { CarouselImgs } from "./CarouselImgs";
import { Description } from "./ProductDescription";
import { SimilarProduct } from "./SimilarProduct";
import { Tips } from "./Tips";
import instance from "../../core/api";
import { number } from "joi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ProductDetailPage = () => {

	const { slug } = useParams();

	const [product, setProduct] = useState({});
	const [variant, setVariant] = useState({});
	const [attributes, setAttributes] = useState([]);

	const [optionSelected, setOptionSelected] = useState({});

	const [isLoading, setIsLoading] = useState(true);

	// lấy chi tiết sản phẩm
	useEffect(() => {
		instance.get(`/product-detail/${slug}`).then(({ data }) => {
			setProduct(data);
			setIsLoading(false);
		})
	}, [])

	// lấy thuộc tính sản phẩm
	useEffect(() => {
		instance.get(`/product-attributes/${slug}`).then(({ data }) => {
			const attributes = {
				colors: [...new Map(data.colors.map(color => [color.id, color])).values()],
				sizes: [...new Map(data.sizes.map(color => [color.id, color])).values()]
			}
			setAttributes(attributes)
			setIsLoading(false);
		})
	}, [])

	// sự kiện khi chọn option của sản phẩm
	const onChangeOption = ({ target }) => {
		setOptionSelected({
			...optionSelected,
			[target.name]: target.value
		})
	};

	// lấy biến thể khi chọn thuộc tính
	useEffect(() => {
		if (optionSelected && optionSelected.size && optionSelected.color) {
			const variant = product.variants.filter((variant) =>
				variant.size_id === Number(optionSelected.size) && variant.color_id === Number(optionSelected.color));

			variant.length > 0 ? setVariant(...variant) : setVariant({})
		}
	}, [optionSelected])

	// xử lý giỏ hàng
	const hanldeCart = () => {
		const cartItem = {
			product_id: product.id,
			variant_id: variant.id,
			color_id: variant.color_id,
			size_id: variant.size_id,
			quantity: optionSelected.quantity ?? 0,
		}

		const oldCart = JSON.parse(localStorage.getItem('cart')) ?? [];

		if (cartItem.quantity >= 1) {
			if (oldCart.some(item =>
				item.product_id === cartItem.product_id &&
				item.variant_id === cartItem.variant_id
			)) {
				toast.error('Sản phẩm đã có trong giỏ hàng!')
			} else {
				const updatedCart = [...oldCart, cartItem];
				localStorage.setItem("cart", JSON.stringify(updatedCart));
				toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
			}
		} else {
			toast.error('Vui lòng chọn số lượng sản phẩm!')
		}

	}

	return isLoading
		? <div className={styles["loading"]}></div>
		: <div className="container mx-auto">
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
						<CarouselImgs listVariant={product.variants} current={variant?.images} />
					</Col>

					<Col xs={24} lg={11}>
						<h3 className="text-3xl font-normal">
							{product.name}
						</h3>
						<Flex align="flex-end" gap={8} className={styles["price"]}>
							<p className={styles["new-price"]}>
								{Object.keys(variant).length ?
									new Intl.NumberFormat("vi-VN", {
										style: "currency",
										currency: "VND",
									}).format(variant.price)
									:
									<>
										{new Intl.NumberFormat("vi-VN", {
											style: "currency",
											currency: "VND",
										}).format(Math.min(...product.variants.map(variant => variant.price)))}
										-
										{new Intl.NumberFormat("vi-VN", {
											style: "currency",
											currency: "VND",
										}).format(Math.max(...product.variants.map(variant => variant.price)))}
									</>
								}
							</p>
							<p className={styles["old-price"]}>
								{new Intl.NumberFormat("vi-VN", {
									style: "currency",
									currency: "VND",
								}).format(300000)}
							</p>
						</Flex>
						<Flex gap={40} className={styles["size-box"]}>
							<p className={styles["label"]}>Size</p>
							<Flex gap={12}>
								<Radio.Group options={
									attributes?.sizes?.map(size => ({
										label: size.name,
										value: size.id,
									}))
								}
									name="size"
									onChange={onChangeOption}
									optionType="button" />
							</Flex>
						</Flex>
						<Flex gap={40} className={styles["size-box"]}>
							<p className={styles["label"]}>Colors</p>
							<Flex gap={12}>
								<Radio.Group options={
									attributes?.colors?.map(color => ({
										label: color.name,
										value: color.id,
									}))
								}
									name="color"
									onChange={onChangeOption}
									optionType="button" />
							</Flex>
						</Flex>
						<Flex gap={40} className={styles["size-box"]} style={{ border: "none", alignItems: 'center' }}>
							<p className={styles["label"]}>Quantity</p>
							<InputNumber min={1} max={variant.quantity} defaultValue={0}
								disabled={variant.id && variant.quantity > 0 ? false : true}
								onChange={(number) => {
									setOptionSelected({
										...optionSelected,
										quantity: number
									})
								}} />

							{Object.keys(variant).length > 0 ?
								<>
									<span style={{ fontSize: '16px' }}>{variant.quantity} Sản phẩm có sẵn</span>
								</>
								: ''}
						</Flex>
						<Flex gap={5}>
							<button onClick={Object.keys(variant).length > 0 ? hanldeCart : null}
								className={`${styles["action-btn"]} ${styles["add-btn"]} ${Object.keys(variant).length > 0 ? styles["active"] : ''}`}
							>
								Thêm vào giỏ hàng
							</button>
							<button
								className={`${styles["action-btn"]} ${styles["buy-btn"]} ${Object.keys(variant).length > 0 ? styles["active"] : ''}`}
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
};

export default ProductDetailPage;
