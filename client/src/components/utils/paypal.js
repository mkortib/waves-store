import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {
        const onSuccess = (payment) => {
            /**
			 * {
				"paid":true,
				"cancelled":false,
				"payerID":"34B9MV96ZGSSY",
				"paymentID":"PAYID-L2SGMUI476712688J369613Y",
				"paymentToken":"EC-8CU41874079717605",
				"returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2SGMUI476712688J369613Y&token=EC-8CU41874079717605&PayerID=34B9MV96ZGSSY",
				"address":{
					"recipient_name":"John Doe",
					"line1":"1 Main St",
					"city":"San Jose",
					"state":"CA",
					"postal_code":"95131",
					"country_code":"US"
				},
				"email":"sb-ydqrp1564415@personal.example.com"
				}
			 */
            this.props.onSuccess(payment);
        };

        const onCancel = (data) => {
            console.log(JSON.stringify(data));
        };

        const onError = (er) => {
            console.log(JSON.stringify(er));
        };

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;

        const client = {
            sandbox:
                'AQ26trDFwYaj72gVhr9CXojOfpM61Wh7Ottt7pQ3LNDIKrvvkjOIKJXRQJOQZnPoQuLH1Tim_0pjpB5b',
            production: '',
        };

        return (
            <div className="">
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: '',
                    }}
                />
            </div>
        );
    }
}

export default Paypal;
