import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Empty, Modal, Row, Spin, Typography } from 'antd';
const { Title } = Typography;
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import instance from '../../../core/api';
import { toast } from 'react-toastify';
const { confirm } = Modal;

const EditImageModal = ({ colorName, oldImages, handleChange }) => {
  // trạng thái modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // lấy danh sách ảnh lần đầu để checked input
  const [selectedImages, setSelectedImages] = useState(
    oldImages.map((oldImage) => oldImage.imageGallery.url) 
  );

  // trạng thái loading với server
  const [loading, setLoading] = useState(true);

  // trạng thái của hình ảnh tùy vào màu sắc
  const [listImage, setListImage] = useState([]);

  // xử lí lấy ảnh theo màu
  useEffect(() => {
    loadImage(colorName);
    setLoading(false);
  }, [colorName]);

  const loadImage = (colorFolder) => {
    instance.get(`/image-gallery/${colorFolder}`).then(({ data }) => {
      setListImage(data);
    })
  }

  // xử lí chọn lại ảnh và bắn data lên component cha
  const handleImageSelect = (event) => {
    const imageUrl = event.target.value;
    if (event.target.checked) {
      if (selectedImages.length >= 3) {
        toast.error("Chỉ được chọn tối đa 3 hình ảnh!");
        event.target.checked = false;
      } else {
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageUrl]);
        handleChange([...selectedImages, imageUrl]); 
      }
    } else {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((url) => url !== imageUrl)
      );
      handleChange(selectedImages.filter((url) => url !== imageUrl));
    }
  };

  // tải thêm ảnh vào folder màu sắc
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
    }
  }
  
  // mở modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // xử lí gửi dữ liệu ghi thao  tác mới modal xong
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={showModal} type='primary'>
        <PlusOutlined />
      </Button>
      <Modal title="Chọn hình ảnh" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="70%" footer={null} style={{ position: 'relative' }}>
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
              {
                listImage && listImage.map((image, index) => (
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
                          checked={selectedImages.some((oldImage) => (oldImage === image.url))}
                          onChange={handleImageSelect}
                        />
                      </div>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </Spin>
        </div>
      </Modal >
    </div>
  )
}

export default EditImageModal