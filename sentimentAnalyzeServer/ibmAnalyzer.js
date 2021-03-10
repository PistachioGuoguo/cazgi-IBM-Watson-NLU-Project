
const dotenv = require('dotenv');
dotenv.config();

const NatualLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const {IamAuthenticator} = require('ibm-watson/auth');

const axios = require('axios'); // used to get content from html

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const naturalLanguageUnderstanding = new NatualLanguageUnderstandingV1({
        version:'2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    })

    return naturalLanguageUnderstanding;
}

// ----------- original test solution --------------

// const input = {
//     'html':'I am happy! Why are you yelling at me!',
//     'features':{'emotion':{}}
// };

// nlu.analyze(input)
//     .then( analysisResults => {
//         console.log(analysisResults.result.emotion.document.emotion);
//     })
//     .catch(err => {
//         console.log('error:', err);
//     });

// ----------- v1 --------------

// async function analyzeText(text, feature) {  // feature = 'emotion' or 'sentiment'

//     const nlu = getNLUInstance();

//     const input = {
//         'text':text,
//         'features':{ [feature]:{} }  // use feature as key in JSON
//     };

//     try{
//         const response = await nlu.analyze(input);
//         return response.result.emotion.document.emotion;
//     } catch(e){
//         return null;
//     }
   
// }

// async function analyzeURL(url, feature){

//     try{
//         const content = await axios.get(url);
//         return await analyzeText(content.data, feature);
//     } catch(e){
//         return null;
//     }
  
// }


async function emotionAnalyzer(target, type) {   // type = 'text' or 'url'

    const nlu = getNLUInstance();

    const input = {
        [type]:target,                          // use feature as key in JSON
        'features':{'emotion':{} } 
    };

    try{
        const response = await nlu.analyze(input);
        return response.result.emotion.document.emotion;
    } catch(e){
        return null;
    }
   
}


async function sentimentAnalyzer(target, type) {  

    const nlu = getNLUInstance();

    const input = {
        [type]:target,
        'features':{ ['sentiment']:{
        }} 
    };

    try{
        const response = await nlu.analyze(input);
        return response.result.sentiment.document; // returns format: { score: 0.972974, label: 'positive' }
    } catch(e){
        return null;
    }
   
}



// const theText = "I am happy today";
// const theUrl = "http://joyfuldays.com/what-makes-people-happy-the-top-10-list/";

// usage

// ------------------  v1 ------------------
// analyzeText(theText,'emotion').then(data => console.log(data));
// analyzeURL(theUrl, 'emotion').then(data => console.log(data));
// analyzeText(theText,'sentiment').then(data => console.log(data));  // failed
// analyzeURLSentiment(theUrl).then(data => console.log(data));  // failed

// ------------------  v2 ------------------
// emotionAnalyzer(theText,'text').then(data => console.log(data)); // success
// emotionAnalyzer(theUrl,'url').then(data => console.log(data));  // success

// sentimentAnalyzer(theText,'text').then(data => console.log(data)); // success
// sentimentAnalyzer(theUrl,'url').then(data => console.log(data));  // success



module.exports = { emotionAnalyzer,  sentimentAnalyzer};