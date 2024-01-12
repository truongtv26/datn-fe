import React, { useEffect, useState } from 'react';
import {
    ExclamationCircleOutlined,
    PictureFilled
} from '@ant-design/icons';
import { Button, Empty, Modal, Row, Col, Typography, Spin, Checkbox } from 'antd';
import instance from '../../../core/api';
import { toast } from 'react-toastify';
const { Title } = Typography;
const { confirm } = Modal;
const AddImageModal = ({ colorName, handleChange}) => {
    // trạng thái ảnh được chọn
    const [selectedImages, setSelectedImages] = useState([]);

    // trạng thái danh sách ảnh của thư viện
    const [listImage, setListImage] = useState([]);

    // trạng thái loading với server
    const [loading, setLoading] = useState(true);

    // trạng thái đóng mở của modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // xử lí đóng mở và ok với modal
    const showModal = () => {
        /* đoạn này quan trọng nè đối với render lại bảng tồn tại giá trị cũ và có giá trị 
        mới những vẫ cònt tồn tại giá trị cũ khi mở modal sẽ set state lần 1 lại
        */
        if (selectedImages.length > 0) {
            setSelectedImages((prev) => [...prev]);
        }
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // xử lí upload ảnh nhanh
    const handleUploadImage = (event) => {
        const fileList = event.target.files;
        const formData = new FormData();
        let validImages = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file.type.startsWith("image/")) {
                formData.append("images[]", file);
                validImages.push(file);
            } else {
                toast.error(`Tệp ${file.name} không phải là ảnh và sẽ không được thêm.`);
            }
        }
        if (validImages.length > 0) {
            confirm({
                title: `Xác nhận thêm ${validImages.length} ảnh ?`,
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    setLoading(true);
                    formData.append("folder", colorName);
                    instance.post('/image-gallery', formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then(response => {
                        toast.success(response.data);
                        loadImage(colorName);
                        setLoading(false);
                    }).catch(error => {
                        console.error(error);
                    });
                },
                style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
                onCancel() {
                },
            });
        } else {
            message.error("Không tìm thấy ảnh hợp lệ!");
        }
    }

    // xử lí loading lần đầu vào modal
    useEffect(() => {
        loadImage(colorName);
        setLoading(false);
    }, [colorName]);

    const loadImage = (colorFolder) => {
        instance.get(`/image-gallery/${colorFolder}`).then(({ data }) => {
            setListImage(data);
        })
    }

    // xử lí chọn ảnh
    const handleImageSelect = (event) => {
        const imageUrl = event.target.value;
        if (event.target.checked) {
            if (selectedImages.length >= 3) {
                toast.error("Chỉ được chọn tối đa 3 hình ảnh!");
                event.target.checked = false;
            }
            else {
                setSelectedImages((prevSelectedImages) => [
                    ...prevSelectedImages,
                    imageUrl,
                ]);
            }
        } else {
            setSelectedImages((prevSelectedImages) =>
                prevSelectedImages.filter((url) => url !== imageUrl)
            );
        }
    };

    // đẩy dữ liệu lên table prodct để hiển thị ra dưới table
    useEffect(() => {
        handleChange(colorName, selectedImages);
    }, [selectedImages]);

    return (
        <>
            <Button onClick={showModal}>
                <  PictureFilled />
            </Button>
            <Modal title="Chọn hình ảnh" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="70%" footer={null} style={{position: 'relative'}}>
                <div>
                    <Title level={5}>Danh sách ảnh của sản phẩm</Title>
                    {selectedImages.length === 0 ? (
                        <Empty description={"Không có ảnh"} />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {selectedImages.map((image, index) => (
                                <Col key={index} span={6}>
                                    <img
                                        src={image}
                                        alt="img"
                                        width={"100%"}
                                        height={150}
                                        style={{ objectFit: 'contain', border: '1px solid #d9d9d9', marginBottom: '12px' }}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
                <div>
                    <Row justify="space-between" align="middle" style={{ margin: '8px' }}>
                        <Col>
                            <Title style={{ margin: '0' }} level={5}>Danh sách ảnh của sản phẩm màu {colorName.toLowerCase()}</Title>
                        </Col>
                        <Col>
                            <Button type="primary" style={{ position: 'relative' }}>Thêm ảnh vào hệ thống
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(event) => handleUploadImage(event)}
                                    style={{ position: 'absolute', right: '0', top: '0', width: '100%', height: '100%', opacity: '0' }}
                                /></Button>
                        </Col>
                    </Row>
                    <Spin spinning={loading}>
                        <Row gutter={[16, 16]}>
                            {listImage && listImage.map((image, index) => (
                                <Col key={index} span={6}>
                                    <div style={{ position: 'relative' }}>
                                        <label htmlFor={`check${image.url}Img${index}`}>
                                            <img
                                                src={image.url}
                                                alt="img"
                                                width={"100%"}
                                                height={150}
                                                style={{ objectFit: 'contain', border: '1px solid #d9d9d9', marginBottom: '12px' }}
                                            />
                                        </label>
                                        <div style={{ position: 'absolute', top: '0' }}>
                                            <Checkbox
                                                id={`check${image.url}Img${index}`}
                                                name="imageSelect"
                                                value={image.url}
                                                onChange={handleImageSelect}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Spin>
                </div>
            </Modal >
        </>
    );
};
export default AddImageModal