'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
function get_random(list) {
  return list[Math.floor((Math.random()*list.length))];
} 
const facts = [   'Have the keys with you.',
                  'Make sure you turn off the lights.',
                  'Take the magazine if you feel like.',
                  'Take your Laptop with you if required.',
                  'Check for your Phone.',
                  'Take the Umbrella if it is cloudy or raining. ',
                  'Stay hydrated. Take your bottle with you. ',
                  'Water your plants if you haven\'t.',
                  'Arrange food for your pets.',
                  'Consider turning off all the water.',
                  'Unplug toasters, computers etc.',
                  'Close the windows and curtains',
                  'Safety first. Take your helmet before leaving.'
              ];

var askFacts = [' Do you want some more reminders?',
                ' Interested in some other reminder?',
                ' Want one more?',
               	];
shuffle(facts);
shuffle(askFacts);

app.intent('YesOrNo', (conv, {cons}) => {
  	if(!conv.data.hasOwnProperty('count')){
    	conv.data.count = -1;
      	
    }
  	if(cons.length>1){
      conv.ask("Please say yes or no. Only one please.");console.log("dual response");
    }else if(cons[0]==='yes'){
      conv.data.count++;
      if(conv.data.count === facts.length){
        conv.close("Wooohooo! You are now ready to go! have a nice day. Goodbye");   
      }
      else if(conv.data.count<facts.length){
      var speech = facts[conv.data.count];
      conv.ask(speech);
      conv.ask(get_random(askFacts));}
    }else if(cons[0]==='no'){
      conv.close('Cool. Goodbye');
    }
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
