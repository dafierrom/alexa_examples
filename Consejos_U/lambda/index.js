const Alexa = require('ask-sdk-core');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
//const languageStrings = require('./localisation');

const languageStrings ={
     es: {
        translation: {
            WELCOME_MSG: 'Bienvenido, a la skill de Consejos Universitarios. Deseas consejos de organización de tus materias o acerca de los clubes?',
            HELLO_MSG: 'Hola Mundo!',
            HELP_MSG: 'Puedes decirme hola. Cómo te puedo ayudar?',
            GOODBYE_MSG: 'Hasta luego!',
            REFLECTOR_MSG: 'Acabas de activar {{intent}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
            ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.',
            MATERIAS: 'Listo. Acerca de que materia necesitas consejos. Matemáticas, Salud, Otros'
            
        }
    },
 }
 
 
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('WELCOME_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const MateriasOrganizarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MateriasOrganizarIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('MATERIAS');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const ClubesConsejoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClubesConsejoIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t(CLUBES);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const MatematicaConsejoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MatematicaConsejoIntent'
             //||handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent' 
    },
    handle(handlerInput) {
        const speechText = getRandomItem(MATEMATICA);

        return handlerInput.responseBuilder
            .speak(speechText) //+ getRandomItem(PREGUNTAS))
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const SaludMateriaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SaludMateriaIntent'
    },
    handle(handlerInput) {
        const speechText = getRandomItem(SALUD);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};
    
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = handlerInput.t('REFLECTOR_MSG', {intent: intentName});

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speechText = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};



// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};
/*
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 */
 

 
 
 
 
 
 function getRandomItem(array) { // <--- necessary to obtain a random element of an array
    return array[Math.floor(Math.random()*array.length)]
}
const MATEMATICA = [
    'Revisa videos en internet acerca de la materia antes de entrar a ella. Julio Profe es un YouTuber muy exitoso en el áre ade matemáticas',
    'Nunca te quedes con una duda. Por mínima que sea, como es el cambio de un signo, un despeje o simplemente una sencilla suma. \
     El preguntar en clase hace que tus demás compañeros se sientan identificados',
     'Utiliza la calculadora. Es una herramienta muy útil para resolver de forma más rápida los problemas. Busca el instructivo del \
     modelo de tu calculadora científica en el buscador de tu preferencia. ',
    'Estudia matemáticas de forma divertida. Escucha la música que más te agrade haciendo las tareas que te deja tu maestro, está \
    comprobado que usar música ayuda a la retención de los conceptos',
    'Las matemáticas son el principal elemento para la toma de decisiones, y no solo en temas que tiene que ver en ingenierías o licenciaturas.'
    ];
    
 const PREGUNTAS = [ // <-- necessary to provide variations on how to ask if the user wants another fact (and not be repetitive)
  'Quiéres otra?',
  'Quiéres otro consejo?',
  'Te gustaría saber más?',
  'Quiéres saber la siguiente?',
  'Quiéres el siguiente consejo?',
  'Te digo otra?',
  'Te digo la siguiente',
  'Te digo otrpo consejo?'
];
 
 const SALUD = [ // <-- necessary to provide variations on how to ask if the user wants another fact (and not be repetitive)
  'Debemos practicar relajación. La meditación es una práctica todavía poco extendida, pero sus ventajas son numerosas.',
  'Debemos preocuparnos menos por las dietas.Cada dos por tres aparecen nuevas dietas mágicas que prometen solucionar los problemas de sobrepeso,',
  'Los beneficios de perder algo de peso. Cuando notamos que hemos engordado un poquito, solemos pensar en grandes soluciones ',
  'El ejercicio puede ser mejor que las medicinas. Esta idea cada vez la defienden más expertos en medicina. El campo de actuación \
  es diferente, puesto que los medicamentos se toman para solucionar problemas, mientras que la práctica de ejercicio sirve para evitarlos',
  'Quiéres el siguiente consejo?',
  ' No hay que pensar solo en los demás.Hijos, familiares con problemas de salud, amigos, compañeros de trabajo… Y nos olvidamos de nosotros mismos. '
];
 
 const CLUBES = [ // <-- necessary to provide variations on how to ask if the user wants another fact (and not be repetitive)
  'La mayoría de los mayores de la universidad tienen clubes correspondientes, que le permiten sumergirse en el trabajo de tipo profesional sin la presión de un trabajo real.',
  'Para los introvertidos, Encontrar un grupo de amigos en la universidad Puede ser difícil. Los clubes te ayudan a encontrar personas con intereses compartidos. Esto es especialmente \
  beneficioso para los estudiantes de primer año que buscan establecer un grupo de amigos. Hay clubes para deportes, política, trabajo voluntario',
  'Si usted se une a un club en un campo familiar, o si está experimentando algo por primera vez, las personas que conoce y las habilidades que aprende fomentarán el crecimiento personal. ',
  'Los clubes académicos están orientados a prepararse para el campo de trabajo. Mientras que usted debe disfrutar de su club, es importante tener en cuenta que no siempre será divertido.',
  ' Los clubes recreativos le dan un momento para alejarse de sus estudios y le permiten pasar tiempo explorando sus aficiones. Los clubes académicos le recompensan con la oportunidad de traducir \
  habilidades y conocimientos adquiridos en las clases a situaciones de la vida real'
];
 
 
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        MateriasOrganizarIntentHandler,
        ClubesConsejoIntentHandler,
        MatematicaConsejoIntentHandler,
        SaludMateriaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/happy-birthday/mod2')
    .lambda();