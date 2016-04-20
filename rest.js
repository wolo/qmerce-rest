const request = require('request');

module.exports = function (baseUrl, auth, options) {
	
	// private
	const _request = (method, relativeUrl, data, callback) => {
		const url = baseUrl + relativeUrl;
		if(options && options.trace)
			console.log(method + " " + url);

		request({
			method: method,
			url: url, 
			auth: auth,
			json: true,
			body: data
		}, function (error, response, data){
			if(error) {
				callback(error);
			}
			else {
				if(response.statusCode == 200) {
					callback(null, data);
				}
				else if(response.statusCode == 201) {
					callback(null, response.headers["location"], data);
				}
				else if(response.statusCode == 204){
					callback(null);
				}
				else {
					if(options && options.trace)
						console.log(response.statusCode + " " + response.statusMessage, data);
					
					const err  = new Error(method + " " + url + " failed: "
						+ response.statusCode + " " + response.statusMessage
						+ " : " + JSON.stringify(data, null, 2));
					err.response = response;
					err.data = data;
					callback(err);
				}
	  		}
		});
	};

	const _requestAsync = (method, relativeUrl, data) => {
	    return new Promise(function(resolve, reject){
	         _request(method, relativeUrl, data, function(error, data){
	             if(error)
	             	return reject(error);
	             
	             resolve(data);
	         });
	    });
	}

	// public
	return {
		get: (relativeUrl, callback) => _request("GET", relativeUrl, null, callback),
		post: (relativeUrl, data, callback) => _request("POST", relativeUrl, data, callback),
		put: (relativeUrl, data, callback) => _request("PUT", relativeUrl, data, callback),
		delete: (relativeUrl, callback) => _request("DELETE", relativeUrl, null, callback),
		getAsync: (relativeUrl) => _requestAsync("GET", relativeUrl, null),
		postAsync: (relativeUrl, data) => _requestAsync("POST", relativeUrl, data),
		putAsync: (relativeUrl, data) => _requestAsync("PUT", relativeUrl, data),
		deleteAsync: (relativeUrl) => _requestAsync("DELETE", relativeUrl, null),
	};
};
