var aws = require('aws-sdk');
var docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'});

exports.LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: async function(handlerInput){
    // 全ての会話をDynamoから取得して、attributeに保存する
    // 現在の会話の数もattributeに保存

    const userId = handlerInput.requestEnvelope.session.user.userId;
    var params = {
      TableName : process.env["tableName"],
      Key: {
        'userId': userId
      }
    };

    const data = await docClient.get(params).promise();
    console.log(JSON.stringify(data));

    // TODO なかった時の処理
    if(0 === Object.keys(data).length || 0 === Object.keys(data.Item.data).length){
      var msg = "データがありません。Botより会話を入力してください。";
      return handlerInput.responseBuilder.speak(msg).getResponse();
    }

    const count = data.Item.data.count;
    const speech = data.Item.data.speech;

    // attributeに保存
    const attributes = {
      // 現在のセッション回数を保持。speechからの取得に使用
      sessionTime: 0,
      speech: speech
    }
    handlerInput.sessionAttributeManager.setSessionAttributes(attributes);

    var msg = speech[0];
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}
