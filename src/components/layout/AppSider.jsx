import {Card, Layout, List, Spin, Statistic, Typography, Tag} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {fakeFetchCrypto, fakeFetchCryptoAssets} from "./api.js";
import {capitalize, percentDiff} from '../../utils';


const siderStyle = {
    paddingLeft: '1rem',
}

export default function AppSider(){
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


    if(loading){
        return <Spin fullscreen/>
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{color: asset.grow ? 'green' : 'red'}}
                        prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        size = 'small'
                        dataSource={[
                            {
                                title: 'Total Profit',
                                value: asset.totalProfit,
                                withTag: true,
                            },
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && (
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}