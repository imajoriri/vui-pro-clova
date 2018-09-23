
exports.HogeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('HogeIntent') ||
      handlerInput.requestEnvelope.isMatch('Clova.NoIntent') ||
      handlerInput.requestEnvelope.isMatch('Clova.YesIntent');
  },
  handle: function(handlerInput){
    // attribute取得。
    // セッション数取得
    // セッションの会話取得
    // 最後のセッションかどうか取得

    const attributes = handlerInput.sessionAttributeManager.getSessionAttributes();
    console.log(JSON.stringify(attributes));
    const sessionTime = attributes.sessionTime + 1;
    const speech = attributes.speech;

    if(sessionTime === speech.length - 1){
      var msg = speech[sessionTime];
      return handlerInput.responseBuilder.speak(msg).getResponse();
    }

    attributes.sessionTime = sessionTime;
    handlerInput.sessionAttributeManager.setSessionAttributes(attributes);

    var msg = speech[sessionTime];
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}
