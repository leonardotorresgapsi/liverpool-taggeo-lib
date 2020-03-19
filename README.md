[![Build Status](https://img.shields.io/travis/alinemorelli/react-gtm/master.svg?style=flat-square)](https://travis-ci.org/alinemorelli/react-gtm)
[![npm version](https://img.shields.io/npm/v/react-gtm-module.svg?style=flat-square)](https://www.npmjs.com/package/react-gtm-module)
[![npm downloads](https://img.shields.io/npm/dm/react-gtm-module.svg?style=flat-square)](https://www.npmjs.com/package/react-gtm-module)

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
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000'
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```

## DataLayer

### Custom dataLayer example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    dataLayer: {
        userId: '001',
        userProject: 'project'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```


### Multiple dataLayer example:

If you need send multiple custom dataLayer you can initialize GTM Module on different components sending different dataLayers

You can initialize it normally:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    dataLayerName: 'PageDataLayer'
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```

And send your data in each page you want

```js
import React from 'react'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    dataLayer: {
        userId: '001',
        userProject: 'project',
        page: 'home'
    },
    dataLayerName: 'PageDataLayer'
}
...

const Home = () => {
    ...
    TagManager.dataLayer(tagManagerArgs)
    ...

    return (
        <div className='home'>
            //your component code
        </div>
    )
}

export default Home

```


## Events

### Example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    events: {
        sendUserInfo: 'userInfo'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)
```

## Environments

Configure how Tag Manager will works between development and production server environments.

### Example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    auth: '6sBOnZx1hqPcO01xPOytLK',
    preview: 'env-2'
}

TagManager.initialize(tagManagerArgs)

```

### Note:

- Disabling javascript in the browser can prevent the correct operation of this library if React is only being rendered on the client side.

- Before implementing GTM in your application ensure that you have at least one published container, otherwise Google Tag Manager snippet will return 404.
