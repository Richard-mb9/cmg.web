export const asyncLocalStorage = {
    setItem: async function (key: string, value: string) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: async function (key: string) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};