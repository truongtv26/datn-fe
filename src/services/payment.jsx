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
		const winFeatures = 'screenX=0,screenY=0,top=0,left=0,scrollbars,width=100,height=100';
          const winName = 'window';
          const win = window.open(redirect, winName, winFeatures);
          const extraWidth = 1000;
          const extraHeight = 600;
          win.resizeBy(extraWidth, extraHeight);
          return win;
	}
}