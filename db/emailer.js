const { Pool, Client } = require('pg');

const sgMail = require('@sendgrid/mail');

const sendInquiry = (req, res) => {
	var jsonReq = req.body
    if (!jsonReq.hasOwnProperty('name'))
    {
        jsonReq = req.query
	}

	if (jsonReq.hasOwnProperty('name'))
	{
		var emailaddr = jsonReq.email
		var name = jsonReq.name
		var subject = jsonReq.subject
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: 'edith.cy.chow@gmail.com',
			from: 'edith.cy.chow@gmail.com',
			subject: 'Inquiry Received',
			templateId: 'd-0397e9d9b7a5460fae53f8d542959d0f',
			dynamic_template_data: {
					"name": name,
					"email": emailaddr,
					"subject": subject
			}
		};

		const msg_confirm = {
			to: emailaddr,
			from: 'edith.cy.chow@gmail.com',
			subject: 'Inquiry Confirmation',
			html: `<p>Hi ${name}!<p><p>This is to confirm that we\'ve received your inquiry. We will get back to you within 2-3 business days, thank you for reaching out!<p><p>Edith`
		}

		sgMail.send(msg)
			.then(results => {
				console.log('Inquiry email sent')
				sgMail.send(msg_confirm)
					.then( cres => {
						console.log('Confirmation email sent')
						res.status(201).send('Confirmation email sent')
					})
					.catch( cerr => {
						console.log(cerr)
						res.status(500).send(cerr)
					})
			})
			.catch(err => {
				console.log(err)
				res.status(500).send(err)
			})
	}
	else {
		res.status(400).send('Request data missing.')
	}
}

const sendEmail = (req, res) => {
	var jsonReq = req.body
	if (!jsonReq.hasOwnProperty('name')) {
		jsonReq = req.query
	}
	if (jsonReq.hasOwnProperty('name'))
	{
		var emailaddr = jsonReq.address
		var name = jsonReq.name
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: emailaddr,
			from: 'edith.cy.chow@gmail.com',
			subject: 'Testing Email API',
			templateId: 'd-44c6da0ef2514398a7309cf31058aac8',
			dynamic_template_data: {
				subject: 'Welcome to the test family!',
				preheader: 'You found the secret header!',
				name: name,
			}
		};

		sgMail.send(msg)
			.then(results => {
				res.status(201).send('Email sent')
			})
			.catch(err => {
				console.log(err)
				res.status(500).send(err)
			})
	}
	else {
		res.status(400).send('Request data missing.')
	}
}

module.exports = {
	sendEmail,
	sendInquiry
}