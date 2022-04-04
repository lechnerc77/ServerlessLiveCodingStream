const { CourierClient } = require("@trycourier/courier");

module.exports = async function (context, req) {
    context.log("Let's call Courier.");

    const apiKey = process.env["CourierApiKey"];

    const courier = CourierClient({ authorizationToken: apiKey });

    const name = (req.body && req.body.name);

    const { requestId } = await courier.send({
        message: {
            to: {
                email: "shreya@courier.com",
            },
            content: {
                title: "Welcome!",
                body: "Thanks for signing up, " + name + "!",
            },
            //data: {
            //    name: name,
            //},
            routing: {
                method: "single",
                channels: ["email"],
            },
        },
    });

    const responseMessage = `Sent message with requestId: ${requestId} to ${name}`;

    context.log(responseMessage);

    context.res = {
        body: responseMessage
    };
}




