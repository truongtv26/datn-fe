import React from "react";
import { Badge } from 'antd';

const VoucherStatus = ({ status }) => {
  if (status === 'happenning') {
    return <Badge count={'Đang diễn ra'} style={{ backgroundColor: '#52c41a' }}></Badge>;
  } else if (status === 'finished') {
    return <Badge count={'Đã kết thúc'}/>;
  } else {
    return <Badge count={'Sắp diễn ra'}  color="#faad14" />;
  }
};

export default VoucherStatus;
