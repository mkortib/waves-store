const orderDetails = (data) => {
    const getItems = () => {
        let template = '';

        data.product.forEach((item) => {
            template += `
			<div style="font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px ; text-transform: uppercase;">
				<h3>
					${item.brand} ${item.name} 
				</h3>
				<p>Price paid: ${item.price}</p>
				<p>Purchase order: ${item.porder ? item.porder : '-'}</p>
			</div>
			`;
        });

        return template;
    };

    return `   <!DOCTYPE html>
	<html style="margin: 0; padding: 0;">
	
		<head>
			<title>One | Email template!</title>
		</head>
	
			<body style="margin: 0; padding: 0;">
				<table class="table" cellpadding="0" cellspacing="0" style="background-color: #000; color: #fff; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
					<tr>
						<td style="background-color: #000; margin: 0 auto;">
							<h1 style="box-sizing: border-box; color: #ffd32c; background: #000; border-bottom: 1px solid #fff; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Thank you for buying!</h1></td>
					</tr>
					<tr>
						<td style="margin: 0 auto;">
							 <h2 style="box-sizing: border-box; color: #fff font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Your purchase information</h2>
							${getItems()}
						</td>
					</tr>
					<tr>
						 <td style="background-color: #000; margin: 0 auto;">
								 <p style="box-sizing: border-box; color: #ffd32c; background: #000; border-top: 1px solid #fff; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
										Waves shop 
								 </p></td>
					</tr>
				</table>
			</body>
	
	  </html>`;
};

module.exports = { orderDetails };
