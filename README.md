[![Build Status](https://travis-ci.org/leonardotorresgapsi/liverpool-taggeo-lib.svg?branch=master)](https://travis-ci.org/leonardotorresgapsi/liverpool-taggeo-lib)
[![npm version](https://img.shields.io/npm/v/liverpool-taggeo-lib.svg?style=flat-square)](https://www.npmjs.com/package/liverpool-taggeo-lib)
[![npm downloads](https://img.shields.io/npm/dm/liverpool-taggeo-lib.svg?style=flat-square)](https://www.npmjs.com/package/liverpool-taggeo-lib)

# liverpool-taggeo-lib
### Liverpool Taggeo Module

This is a Javascript module, based apps that implement Google Tag Manager y Adobe Analytics. It is designed to use [GTM](https://developers.google.com/tag-manager/quickstart) snippet.

You can easily use custom dataLayer and additional events.

## Installation

[npm](https://www.npmjs.com/):

```bash
npm install liverpool-taggeo-lib --save
```

## Usage

Initializing GTM Module:

```js
import React from 'react'
import ReactDOM from 'react-dom'
...
import LiverpoolTaggeo from 'liverpool-taggeo-lib'

const ProvidersDataDefault = {
    Providers:
        [
            {
                name: 'google',
                key:'GTM-ZZ7KYXX',
                enviroment:'development',
                active:true
            },
            {
                name: 'adobe',
                key:'NONE',
                enviroment:'development',
                active:true
            }
        ]
};

this.liverpoolAnalytics =  new LiverpoolTaggeo.Analytics(ProvidersDataDefault);
...

```

## DataLayer

### Custom dataLayer example:

```js
...
...
    const liverpoolLayer = {
      event: 'addToCart',
      ecommerce: {
        add: {
          products: [
            {
              name: 'Chamarra Puma roja',
              id: '1084082111',
              category: 'El',
              variant: 'N/A',
              price: '2379.15',
              brand: 'PUMA',
              quantity: 1,
              dimension27: 'CH',
              dimension28: 'ROJO',
              dimension36: 'liverpool',
              dimension40: '1084082127',
              dimension41: 'Poliéster',
              dimension42: '',
              dimension43: 'N',
              metric2: '2799.0',
              metric3: '2379.15'
            }
          ]
        }
      }
    };
    this.liverpoolAnalytics.publish(liverpoolLayer);       

```

### Note:

- Disabling javascript in the browser can prevent the correct operation of this library if React is only being rendered on the client side.

- Before implementing GTM in your application ensure that you have at least one published container, otherwise Google Tag Manager snippet will return 404.
