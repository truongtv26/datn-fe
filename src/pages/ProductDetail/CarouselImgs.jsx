import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";


export const CarouselImgs = ({ listVariant, current }) => {
	const VITE_URL = import.meta.env.VITE_URL;
	const [swiper, setSwiper] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const currentSwiper = current?.map(image =>  VITE_URL + `storage/${image?.folder}/${image?.url}`)
	const data = ([...new Map(listVariant.map(({images})=> images).flat().map(image => [image.id, image])).values()])
		.map(image => VITE_URL + `storage/${image?.folder}/${image?.url}`);
	console.log(current);
	useEffect(() => {
		const currentIndex = data.findIndex((img) => img === currentSwiper);
		if (swiper && swiper.realIndex != currentIndex) {
			swiper.slideTo(currentIndex)
		}
	}, [currentSwiper])

	return (
		<div>
			<Swiper
				onSwiper={setSwiper}
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				loop={true}
				spaceBetween={10}
				navigation={true}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles["cus-swiper"]}
			>
				{data?.map((img, index) => (
					<SwiperSlide
						key={index}
						className={styles["cus-slide"]}>
						<img src={img} alt="" className={styles["slide-img"]} />
					</SwiperSlide>
				))}
			</Swiper>

			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={10}
				slidesPerView={5}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles["cus-swiper-2"]}
			>
				{data?.map((img, index) => (
					<SwiperSlide key={index} className={styles["cus-slide-2"]}>
						<img src={img} alt="" className={styles["slide-img"]} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
