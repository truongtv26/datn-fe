import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const BillTemplateBase = ({ data }) => {
	const pdfContent = useRef();

	const onExport = useReactToPrint({
		content: () => pdfContent.current,
	});
	

	return (
		<>
			<Button onClick={onExport}>In hóa đơn</Button>
			<div ref={pdfContent} className="print-content">
				Noi dung hoa don tai day
			</div>
		</>	
	);
}

export default BillTemplateBase;
