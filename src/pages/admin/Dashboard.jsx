import React, { useEffect, useState } from "react";
import { Flex, Row, Col, Select, Typography, Table } from "antd";
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
import { Chart } from "react-google-charts";

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
const { Title } = Typography;

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
  const [revenueOption, setRevenueOption] = useState(statisticOptions[0].value);
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  })
  const [topProduct, setTopProduct] = useState([]);
  const [statusBillToday, setstatusBillToday] = useState([]);

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
      .catch((err) => { });
  }, [selectOption]);

  useEffect(()=>{
    instance.post('/revenue', { by: revenueOption})
    .then((res) => {
      if (res.status === 200) {
        const data = {
          labels: Object.keys(res.data),
          datasets: [
            {
              label: "Doanh thu",
              data: Object.keys(res.data).map((key) => res.data[key]),
              backgroundColor: "#2643b5",
            },
          ],
        };
        setRevenueData({ ...revenueData, ...data });
      }
    })
  }, [revenueOption])

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

  const handleRevenueChange = (option) => {
    setRevenueOption(option);
  }

  useEffect(() => {
    instance.get("/get-top-bill").then(({ data }) => {
      setTopProduct(data);
    });
  }, []);

  useEffect(() => {
    instance.get("/get-status-bill-today").then(({ data }) => {
      const temp = data.map(item => {
        let name = "";
        switch (item.timeline) {
          case '2':
            name = "Chờ xác nhận";
            break;
          case '3':
            name = "Xác nhận thanh toán";
            break;
          case '4':
            name = "Chờ giao";
            break;
          case '5':
            name = "Đang giao";
            break;
          case '6':
            name = "Hoàn thành";
            break;
          case '7':
            name = "Hủy";
            break;
          case '8':
            name = "Hoàn 1 phần";
            break;
          default:
            name = "";
        }
        return {
          name: name,
          total_quantity: item.total_quantity
        };
      });
      setstatusBillToday(temp);
    });
  }, []);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => (
        index + 1
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng bán ra',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
    },
  ];

  const pieChartData = statusBillToday.map(item => [item.name, item.total_quantity]);


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
        <Flex vertical style={{ width: "50%" }}>
          <div>
            <Title level={5}>Thống kê sản phẩm bán chạy</Title>
            <Table
              dataSource={topProduct ? topProduct.map((item, index) => ({
                name: `${item.product.name} [${item.color.name}-${item.size.name}]`,
                total_quantity: item.total_quantity,
              })) : []} // Adding a conditional check here
              columns={columns}
              pagination={false}
            />
          </div>
        </Flex>
        <Flex vertical style={{ width: "50%" }}>
          <Title level={5}>Thống kê trạng thái đơn hàng hôm nay</Title>
          <Chart
            chartType="PieChart"
            data={[
              ['Task', 'Hours per Day'],
              ...pieChartData,
            ]}
            width="100%"
            height="400px"
            legendToggle
          />
        </Flex>
      </Row>
      <Row style={{width: "100%", display: "flex"}} gutter={24}>
        <Col span={12}>
          <div style={{ marginTop: "40px", width: "100% !important" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Title level={5}>Thống kê đơn hàng</Title>
              </div>
              <div>
                <Select
                  defaultValue="Hôm nay"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={statisticOptions}
                />
              </div>
            </div>
            {orderData && <OrderStatistic chartData={orderData} />}
          </div>
        </Col>
        <Col span={12}>
        <div style={{ marginTop: "40px", width: "100% !important" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Title level={5}>Thống kê doanh thu</Title>
              </div>
              <div>
                <Select
                  defaultValue="Hôm nay"
                  style={{
                    width: 120,
                  }}
                  onChange={handleRevenueChange}
                  options={statisticOptions}
                />
              </div>
            </div>
            {revenueData && <OrderStatistic chartData={revenueData} />}
          </div>
        </Col>
      </Row>
    </Flex>
  );
};
export default Dashboard;
