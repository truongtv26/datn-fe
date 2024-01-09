import { Transfer } from 'antd'
import React from 'react'

const mockData = Array.from({
	length: 20,
  }).map((_, i) => ({
	key: i.toString(),
	title: `content${i + 1}`,
	description: `description of content${i + 1}`,
  }));

const ListProduct = () => {
	return (
		<>
			<div className='container mx-auto'>
				<Transfer
					dataSource={mockData}
					titles={['Source', 'Target']}
				/>
			</div>
		</>
	)
}

export default ListProduct