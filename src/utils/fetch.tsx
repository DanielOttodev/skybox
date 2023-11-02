// Global fetch utility which handles typical headers and errors
export function secureFetch(url: string, method: string, data: object) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method || "GET",
            body: JSON.stringify(data),
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(response => {
            // response only can be ok in range of 2XX
            if (response.ok) {
                // you can call response.json() here too if you want to return json
                resolve(response);
            } else {
                //handle errors in the way you want to
                switch (response.status) {
                    case 404:
                        console.log('Object not found');
                        break;
                    case 500:
                        console.log('Internal server error');
                        break;
                    default:
                        console.log('Some error occured');
                        break;
                }

                //here you also can thorow custom error too
                reject(response);
            }
        })
            .catch(error => {
                //it will be invoked mostly for network errors
                //do what ever you want to do with error here
                console.log(error);
                reject(error);
            });
    });
}
