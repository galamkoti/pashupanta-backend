const i18next=require('i18next');
const Backend=require('i18next-fs-backend');
const i18nextMiddleware=require('i18next-http-middleware');
const path = require('path');

i18next.use(Backend).use(i18nextMiddleware.LanguageDetector).init({
    fallbackLng:'en',
    preload:['en','te','ta','ml','hi','kn','pn'],
    backend:{
        loadPath:path.join(__dirname,'../locales/{{lng}}/translation.json')
    },
    detection:{
        order:['querystring','header'],
        caches:false
    },
})
module.exports=i18next;