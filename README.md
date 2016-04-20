qmerce-rest
===========

A small library providing convenient methods to call a JSON-style REST API.

## Installation

  npm install qmerce-rest --save

## Usage

```javascript
const rest = require('qmerce-rest')
const api = rest(URL, { user: USER, password: PASSWORD });

api.getAsync()
.then((data) {
	data.counter++;
	return api.putAsync(data);
})
.then(() => api.deleteAsync())
.catch((err) => console.log(err));
```
