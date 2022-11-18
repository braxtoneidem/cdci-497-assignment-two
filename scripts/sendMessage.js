/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 */
 
//snippet-sourcedescription:[ses_sendemail.js demonstrates how to compose an Amazon SES email and queue it for sending.]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon Simple Email Service]
//snippet-service:[ses]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]
// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide//ses-examples-sending-email.html
// snippet-start:[ses.JavaScript.email.sendEmail]
// Load the AWS SDK for Node.js
var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-1" });
const sendEmail = async ({ email, message }) => {
  
    
var myMessage = process.env.MESSAGE;
var receiverEmail = process.env.EMAIL;
console.log(JSON.stringify(receiverEmail))
console.log(JSON.stringify(myMessage))
  var params = {
    Destination: {
      ToAddresses: [receiverEmail],
    },
    Message: {
      Body: {
        Text: { Data: myMessage },
      },
      Subject: { Data: "Game Update" },
    },
    Source: "eidemb@wwu.edu",
  };
 
  return ses.sendEmail(params).promise()
};
// snippet-end:[ses.JavaScript.email.sendEmail]
module.exports = sendEmail;
sendEmail({email:'braxtoneidem@gmail.com', message: 'Testing email function'})
