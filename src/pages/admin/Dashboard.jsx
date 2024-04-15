import React, { useEffect, useState } from "react";
import { Flex, Row, Col, Select } from "antd";
import {
  DropboxOutlined,
  InboxOutlined,
  UsergroupAddOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import OrderStatistic from "../../components/statistic/OrderStatistic";
import instance from "../../core/api";
import FormatCurrency from "../../utils/FormatCurrency";
import DefaultRenderEmpty from "antd/es/config-provider/defaultRenderEmpty";

const statisticOptions = [
  {
    value: "day",
    label: "Hôm nay",
  },
  {
    value: "week",
    label: "Tuần này",
  },
  {
    value: "month",
    label: "Tháng này",
  },
  {
    value: "year",
    label: "Năm nay",
  },
];
const Dashboard = () => {
  const [orderData, setOrderData] = useState({
    labels: [],
    datasets: [],
    orderToday: 0,
    totalVariants: 0,
    users: 0,
    sales: 0,
  });
  const [selectOption, setSelectOption] = useState(statisticOptions[0].value);

  useEffect(() => {
    instance
      .post("/statistic", {
        by: selectOption,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = {
            labels: Object.keys(res.data),
            datasets: [
              {
                label: "Số lượng đơn hàng",
                data: Object.keys(res.data).map((key) => res.data[key]),
                backgroundColor: "#2643b5",
              },
            ],
          };
          setOrderData({ ...orderData, ...data });
        }
      })
      .catch((err) => {});
  }, [selectOption]);
  useEffect(() => {
    instance.post("dashboard-statistic").then((res) => {
      if (res.status === 200) {
        setOrderData((prev) => ({
          ...prev,
          orderToday: res.data.order_today,
          totalVariants: res.data.products,
          users: res.data.users,
          sales: res.data.sales,
        }));
      }
    });
  }, []);
  const handleChange = (option) => {
    setSelectOption(option);
  };
  return (
    <Flex vertical>
      <Row gutter={24}>
        <Col span={6}>
          <Flex
            gap={10}
            align="center"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "40px", color: "#2643b5" }}>
              <DropboxOutlined />
            </div>
            <div>
              <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                {orderData.orderToday}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#878686",
                }}
              >
                Đơn hàng hôm nay
              </p>
            </div>
          </Flex>
        </Col>
        <Col span={6}>
          <Flex
            gap={10}
            align="center"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "40px", color: "#2643b5" }}>
              <InboxOutlined />
            </div>
            <div>
              <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                {orderData.totalVariants}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#878686",
                }}
              >
                Sản phẩm
              </p>
            </div>
          </Flex>
        </Col>
        <Col span={6}>
          <Flex
            gap={10}
            align="center"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "40px", color: "#2643b5" }}>
              <UsergroupAddOutlined />
            </div>
            <div>
              <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                {orderData.users}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#878686",
                }}
              >
                Khách hàng
              </p>
            </div>
          </Flex>
        </Col>
        <Col span={6}>
          <Flex
            gap={10}
            align="center"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "40px", color: "#2643b5" }}>
              <TransactionOutlined />
            </div>
            <div>
              <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                <FormatCurrency props={orderData.sales} />
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#878686",
                }}
              >
                Doanh thu hôm nay
              </p>
            </div>
          </Flex>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Flex vertical style={{ width: "100%" }}>
          <p style={{ fontSize: "30px", fontStyle: "italic" }}>
            Thống kê đơn hàng
          </p>
          <Select
            defaultValue="Hôm nay"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={statisticOptions}
          />
          {orderData && <OrderStatistic chartData={orderData} />}
        </Flex>
      </Row>
    </Flex>
  );
};
export default Dashboard;
