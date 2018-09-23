
var clova = require("love-clova");

const { LaunchRequestHandler } = require('./handlers/LaunchRequestHandler.js');
const { SessionEndedRequestHandler } = require('./handlers/SessionEndedRequestHandler.js');
const { ClovaGuideIntentHandler } = require('./handlers/ClovaGuideIntentHandler.js');
const { SampleIntentHandler } = require('./handlers/SampleIntentHandler.js');
const { HogeIntentHandler } = require('./handlers/HogeIntentHandler.js');
const { ErrorHandler } = require('./handlers/ErrorHandler.js');

exports.handler = async function(event, content) {
  clova.extensionBuilders.addRequestHandlers(
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    ClovaGuideIntentHandler,
    HogeIntentHandler,
    SampleIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  
  return clova.extensionBuilders.invoke(event);
};
