import {createContext, useContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fakeFetchCryptoAssets} from "../api.js";
import {percentDiff} from "../utils.js";
import AppSider from "../components/layout/AppSider.jsx";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})


export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload(){
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await fakeFetchCryptoAssets()

            setAssets(assets.map(asset => {
                const coin = result.find((c) => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDiff(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset,
                }
            }))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, []);
    return (
        <CryptoContext.Provider value={{loading, crypto, assets}}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext;

export  function useCrypto(){
    return useContext(CryptoContext)
}