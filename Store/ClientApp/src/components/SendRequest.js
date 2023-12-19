function sendRequest(endPoint, method, bodyObj = null, ...params){
    if (params.length > 0 && params[0] != null) {
        endPoint += "?";
        for (let param of params) {
            if (param == null) continue;
            for (let key in param) {
                if (param[key] == null || param[key].length === 0) continue;
                if (!endPoint.endsWith("?")) endPoint += "&";
                endPoint += key + "=" + param[key];
            }
        }
    }
    let payload = {
        method: method,
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    if (bodyObj) payload["body"] = JSON.stringify(bodyObj);
    return fetch(endPoint, payload)
        .then(function (response) {
            if (!response.ok)
                throw Error(response.statusText);
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}

export default sendRequest;