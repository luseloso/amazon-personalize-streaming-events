var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  var userId= 'JHartley';
  var paramsQuery = {
    TableName: process.env.DDB_TABLE,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId }
  };
  console.log(paramsQuery);
  docClient.query(paramsQuery, function(dynamoErr, dynamoData) {
    if (dynamoErr){
           console.log(dynamoErr);
           const dynamoErrResponse = {
                statusCode: 500,
                body: JSON.stringify(dynamoErr),
            };
            callback(null, dynamoErrResponse);
       }
       else {
           console.log(dynamoData);
           const response = {
                statusCode: 200,
                body: JSON.stringify(dynamoData),
            };
            callback(null, response);
       }
  });
};


