
exports.ClovaGuideIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('Clova.GuideIntent');
  },
  handle: function(handlerInput){
    var msg = "このスキルは、Clovaスキル開発者向けのプロトタイプ作成ツールです。"
     + "Botであらかじめ会話を入力することで、簡単にプロトタイプを試すことができます。"
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}
