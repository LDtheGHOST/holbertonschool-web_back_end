// 0-promise.js

function getResponseFromAPI() {
    return new Promise((resolve, reject) => {
        // This is where the asynchronous operation would go
        // For now, we'll resolve the promise directly
        resolve();
    });
}

export default getResponseFromAPI;
