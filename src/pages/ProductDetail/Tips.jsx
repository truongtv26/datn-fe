import { Col, Flex, Row } from "antd";
import styles from "./page.module.css";

const data = [
  {
    id: 1,
    image:
      "https://shopgiayreplica.com/wp-content/uploads/2023/07/phan-biet-dep-burberry-real-fake-7-350x235.jpg",
    title: "Hướng dẫn cách phân biệt dép Burberry Auth và Like Auth",
    date: "10:27 - 24/07/2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://shopgiayreplica.com/huong-dan-cach-phan-biet-dep-burberry-auth-va-like-auth/",
  },
  {
    id: 2,
    image:
      "https://shopgiayreplica.com/wp-content/uploads/2023/07/phan-biet-dep-burberry-real-fake-7-350x235.jpg",
    title: "Hướng dẫn cách phân biệt dép Burberry Auth và Like Auth",
    date: "10:27 - 24/07/2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://shopgiayreplica.com/huong-dan-cach-phan-biet-dep-burberry-auth-va-like-auth/",
  },
  {
    id: 3,
    image:
      "https://shopgiayreplica.com/wp-content/uploads/2023/07/phan-biet-dep-burberry-real-fake-7-350x235.jpg",
    title: "Hướng dẫn cách phân biệt dép Burberry Auth và Like Auth",
    date: "10:27 - 24/07/2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://shopgiayreplica.com/huong-dan-cach-phan-biet-dep-burberry-auth-va-like-auth/",
  },
  {
    id: 4,
    image:
      "https://shopgiayreplica.com/wp-content/uploads/2023/07/phan-biet-dep-burberry-real-fake-7-350x235.jpg",
    title: "Hướng dẫn cách phân biệt dép Burberry Auth và Like Auth",
    date: "10:27 - 24/07/2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://shopgiayreplica.com/huong-dan-cach-phan-biet-dep-burberry-auth-va-like-auth/",
  },
  {
    id: 5,
    image:
      "https://shopgiayreplica.com/wp-content/uploads/2023/07/phan-biet-dep-burberry-real-fake-7-350x235.jpg",
    title: "Hướng dẫn cách phân biệt dép Burberry Auth và Like Auth",
    date: "10:27 - 24/07/2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://shopgiayreplica.com/huong-dan-cach-phan-biet-dep-burberry-auth-va-like-auth/",
  },
  {
    id: 6,
    image:
      "https://shopgiayreplica.com/wp-content/uploads/2023/07/phan-biet-dep-burberry-real-fake-7-350x235.jpg",
    title: "Hướng dẫn cách phân biệt dép Burberry Auth và Like Auth",
    date: "10:27 - 24/07/2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "https://shopgiayreplica.com/huong-dan-cach-phan-biet-dep-burberry-auth-va-like-auth/",
  },
];

export const Tips = () => {
  return (
    <div className={styles["tips-wrapper"]} style={{ marginTop: 120 }}>
      <h3 className="text-3xl text-center">KIẾN THỨC & MẸO VẶT</h3>

      <Row gutter={[40, 30]} style={{ marginTop: 60 }}>
        {data.map(({ date, id, image, link, title, desc }) => (
          <Col key={id} xs={24} lg={12}>
            <Flex gap={20}>
              <a href={link} target="_blank">
                <img src={image} alt="" width={200} />
              </a>
              <div>
                <a href={link} target="_blank">
                  <h4 className={`${styles["tips-title"]} text-black`}>
                    {title}
                  </h4>
                </a>
                <p className={styles["tips-desc"]}>{desc}</p>
                <p className={styles["tips-date"]}>{date}</p>
              </div>
            </Flex>
          </Col>
        ))}
      </Row>
    </div>
  );
};
