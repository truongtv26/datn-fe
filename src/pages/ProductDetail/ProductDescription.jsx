import { List } from "antd";
import styles from "./page.module.css";
import { RightOutlined } from "@ant-design/icons";

const texts = [
  {
    title:
      "Cam kết chỉ bán giày chuẩn chất lượng từ Rep 1:1 - Like Auth - Best Quality từ các xưởng Best Trung Quốc",
  },
  {
    title: "Hàng hoá chọn lọc hơn thị trường.",
  },
  {
    title: "Luôn sẵn size, sẵn kho, cần là có tại 2 chi nhánh Bắc Nam",
  },
  {
    title:
      "Hàng có sẵn tại Shop. Không qua bên thứ 3 ---> Chất lượng giày qua kiểm định kỹ càng.",
  },
];

export const Description = () => {
  return (
    <div className={styles["desc-wrapper"]}>
      <h3 className="text-3xl text-center">Mô tả</h3>

      <p>
        Nếu như bạn là một tín đồ nghiện sneakers, lại mê hip-hop thì chắc hẳn
        bạn đã nghe danh anh chàng rapper Travis Scott. Anh là một trong những
        rapper có sức ảnh hưởng vô cùng lớn đến xu hướng sneakers, cộng đồng
        Streetwear và cả giới rap/hip-hop.
      </p>

      <p>
        Nam rapper “HIGHEST IN THE ROOM” và Nike đã bắt tay cho ra khá nhiều sản
        phẩm. Nhưng bản Collab thành công và được chào đón nhiều nhất phải kể
        đến{" "}
        <span className={styles["highlight"]}>
          Nike Jordan 1 High OG Travis Scott
        </span>{" "}
        ra mắt vào năm 2019 thực sự là một quả bom của cộng đồng sneakers thế
        giới. Một phiên bản đã ra mắt gần 2 năm nay mà độ Hot của nó vẫn chưa hề
        dừng lại!
      </p>

      <div>
        <a href="https://www.youtube.com/watch?v=GhhhwtSXIx8" target="_blank">
          <img
            src="https://shopgiayreplica.com/wp-content/uploads/2020/11/video-giay-jordan-1-travis-scott.jpg"
            width="100%"
          />
        </a>
        <figcaption className={`${styles["img-desc"]} text-center`}>
          Video Unboxing Giày Nike Air Jordan 1 Retro High Travis Scott Like
          Auth
        </figcaption>
      </div>

      <h3 className={styles["title"]}>
        Địa chỉ mua giày Nike Air Jordan 1 Retro High Travis Scott uy tín
      </h3>
      <p>
        Với sức hút khủng từ sự kết hợp của Travis Scott và Jordan 1, chắc chắn
        đôi Travis Scott Jordan 1 High này luôn được săn lùng trên toàn thế giới
        với mức giá khủng. Không phải ai cũng có thể rinh về để thêm vào bộ sưu
        tập sneakers của mình. Do vậy, Shopgiayreplica.com là shop giày tin cậy,
        cung cấp cho các bạn trẻ yêu giày những đôi Nike Air Jordan 1 Retro High
        Travis Scott phiên bản Like Auth (phiên bản cao cấp nhất).
      </p>

      <h3 className={"text-3xl"}>
        Lợi ích khi mua Giày Nike Air Jordan 1 High Travis Scott Like Auth
        replica 1:1 tại Shop giày Replica™
      </h3>

      <List
        itemLayout="horizontal"
        dataSource={texts}
        size="small"
        renderItem={(item) => (
          <List.Item style={{ border: "none" }}>
            <List.Item.Meta
              avatar={<RightOutlined style={{ color: "#d33" }} />}
              title={<p style={{ margin: 0 }}>{item.title}</p>}
              style={{ alignItems: "center" }}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
