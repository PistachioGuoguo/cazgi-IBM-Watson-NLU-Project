
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

// original test solution

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


async function analyzeText(text, feature) {  // feature = 'emotion' or 'sentiment'

    const nlu = getNLUInstance();

    const input = {
        'html':text,
        'features':{ [feature]:{} }  // use feature as key in JSON
    };

    try{
        const response = await nlu.analyze(input);
        return response.result.emotion.document.emotion;
    } catch(e){
        return null;
    }
   
}



async function analyzeHTML(url, feature){

    try{
        const content = await axios.get(url);
        return await analyzeText(content.data, feature);
    } catch(e){
        return null;
    }
  
}


const theText = "I am happy today";
// const theUrl = "http://joyfuldays.com/what-makes-people-happy-the-top-10-list/";

// usage

// analyzeText(theText,'emotion').then(data => console.log(data));
// analyzeText(theText,'sentiment').then(data => console.log(data));
// analyzeHTML(theUrl, 'emotion').then(data => console.log(data));


module.exports = {analyzeText, analyzeHTML};