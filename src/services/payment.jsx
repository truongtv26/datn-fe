import instance from "../core/api";

export const getPaymentMethod = async () => {
	try {
		const response = await instance.get(`/payment-method`);
           return response.data
	} catch (error) {
		return error.response
	}
}

export const paymentExecution = async (redirect = null) => {
	if (redirect) {
	    const winFeatures = 'scrollbars,width=' + screen.width + ',height=' + screen.height;
	    const winName = 'window';
	    const win = window.open(redirect, winName, winFeatures);
	    return win;
	}
 }