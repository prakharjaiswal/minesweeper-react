

function getDB(db, version) {
    return new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(db, version);
        openRequest.onsuccess = () => {
            resolve(openRequest.result);
        };

        openRequest.onerror = () => {
            reject(openRequest.error);
        };
    });
    
}

export function recordWin(rows, cols, bombs, time) {
    return getDB('game-wins', 1)
    .then(result => {
        console.log(time);
    });
}