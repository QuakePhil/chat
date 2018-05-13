
const aws = require('aws-sdk');

aws.config.loadFromPath('config/aws.json');

ddb = new aws.DynamoDB();

module.exports = {
  update: (request, message) => {
    console.log(message);
    var params = {
      TableName: 'chat',
      Item: {
        'author':  {S: request.remoteAddress },
        'time':    {S: (new Date()).toISOString() },
        'message': {S: message.utf8Data },
      }
    };

    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(data);
      }
    });
  }
};
