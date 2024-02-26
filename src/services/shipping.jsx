import axios from "axios"

const token = 'e81513ff-d137-11ee-9414-ce214539f696';

export const getCity = async () => {
	try {

		const response = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, null, {
			headers: {
				'token': token
			}
		});
		return response.data

	} catch (error) {
		return error.response
	}
}

export const getDistrict = async (province_id = null) => {
	try {

		if (province_id !== null) {
			const response = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
				province_id: province_id
			}, {
				headers: {
					'token': token
				}
			});
			return response.data
		}
		return []

	} catch (error) {
		return []
	}
}

export const getWard = async (district_id = null) => {
	try {

		if (district_id !== null) {
			const response = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
				district_id: district_id
			}, {
				headers: {
					'token': token
				}
			});
			return response.data
		}
		return []

	} catch (error) {
		return []
	}
}

export const getOrderServices = async (data) => {
	try {
		if (data && data.from_district && data.to_district) {
			const response = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`, {
				shop_id: 4909460,
				from_district: data.from_district,
				to_district: data.to_district
			}, {
				headers: {
					'token': token
				}
			});
			return response.data
		}
		return []

	} catch (error) {
		return []
	}
}

export const getOrderFee = async (orderServices = null, depositor = null, recipient = null) => {
	try {
		if (orderServices !== null && depositor && depositor.district && recipient && recipient.district && recipient.ward) {
			const response = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
				service_id: orderServices.service_id, // dịch vụ vận chuyển
				service_type_id: orderServices.service_type_id, // phương thức vận chuyển
				insurance_value: null, // giá trị đơn hàng
				coupon: null, // mã giảm giá của ghn nếu có

				to_ward_code: recipient.ward,
				to_district_id: recipient.district,

				from_district_id: depositor.district,

				weight: 1000, // gam
				length: 15, // cm
				width: 15, // cm
				height: 15, // cm

			}, {
				headers: {
					'token': token,
					'shop_id': 4909460,
				}
			});
			return response.data
		}
		return {}

	} catch (error) {
		return {}
	}
}

export const getLeadtime = async (orderServices = null, depositor = null, recipient = null) =>{
	try {

		if (orderServices !== null && depositor && recipient.district && recipient.ward) {
			const response = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`, {
				from_district_id: depositor.district,
				from_ward_code: depositor.ward,

				to_district_id: recipient.district,
				to_ward_code: recipient.ward,

				service_id: orderServices.service_id
			}, {
				headers: {
					'token': token,
					'shop_id': 4909460,
				}
			});
			return response.data
		}
		return []

	} catch (error) {
		return []
	}
}