import {cryptoAssets, cryptoData} from "../../data.js";

export function fakeFetchCrypto() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 2)
    })
}

export function fakeFetchCryptoAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2)
    })
}