
exports.ErrorHandler = {
  canHandle: function(handlerInput){
    return true;
  },
  handle: function(handlerInput){
    var msg = "エラーが発生しました。時間を置いてからもう一度お試しください。";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}
