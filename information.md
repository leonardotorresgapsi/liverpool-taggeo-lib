#Instalando babel-cli global
npm install -g babel-cli
babel --version

npm install --save-dev @babel/core @babel/cli
npm install @babel/preset-env --save-dev
npm run build
# el resultado de esto me genera en el directorio lib en version babel

## Instalando WebPack
npm install webpack webpack-cli --save-dev

npm install --save-dev @babel/register babel-loader
npm install --save  @babel/polyfill

# Me base aqui para utilizar webpack y babel
https://www.thebasement.be/working-with-babel-7-and-webpack/
# Generara en la directorio dist el bundle.js
npm run dev

**Procedimiento para probar la libreria antes de publicar**

    node
    Welcome to Node.js v13.11.0.
    Type ".help" for more information.
    > taggeo = require('./index')
    { Analytics: [Function: LiverpoolAnalytics] }
    > taggeo =  new taggeo.Analytics();
    LiverpoolAnalytics {}
    > taggeo.healthCheck();
    '3/16/2020, 7:34:59 PM'

taggeo = require('./index')
taggeo = new taggeo.Analytics('bf6c0c4a-7693-4b1b-9f3f-c7d7cc3b38d2');
taggeo.init()
taggeo.publish(liverpoolLayer)



**Para publicar**
npm adduser

npm publish --access public

npm access restricted liverpool-taggeo-lib

http://localhost:2021/cdn/jsons/applications.json

EsLint:

#Instalando
npm install eslint -g

# instalando localmente
npm install eslint --save-dev

#Para configurar
npm run lint -- --init

#Creando un link module local
#Estando en el directorio del proyecto npm
cd /Users/leonardo/DevSource/gapsi/libraryliverpool/liverpool-taggeo-lib
sudo npm link
output...
/usr/local/lib/node_modules/liverpool-taggeo-lib -> /Users/leonardo/DevSource/gapsi/libraryliverpool/liverpool-taggeo-lib

#Help Links
https://medium.com/@maheshkumawat_83392/node-js-design-patterns-singleton-pattern-series-1-1e0ab71e3edf
https://derickbailey.com/2016/03/09/creating-a-true-singleton-in-node-js-with-es6-symbols/
https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae

#prototype interpolation
https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string

#Async - Await
https://javascript.info/async-await
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona

#Fetch
https://www.valentinog.com/blog/http-js/












      /*
      http.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            global[TAGGING_KEY] = JSON.parse(body);
            console.log('ConfigurationAnalytics get data for Application OK!');
          } catch (error) {
            console.error('Error in assign to object {}', error.message);
          }
        });
      }).on('error', (error) => {
        console.error('Error request failed {}', error.message);
      });
      */

