import {Flex, Layout, Typography} from 'antd';
import {Content} from "antd/es/layout/layout.js";
import {useCrypto} from "../../context/crypto-context.jsx";
import PortfolioChart from "../PortfolioChart.jsx";
import AssetsTable from "../AssetsTable.jsx";
import TradingViewChart from "../TradingViewChart.jsx";
import Portfolio from "../Portfolio.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
};

export default function AppContent() {
    const {assets, crypto} = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, cur) => {
        acc[cur.id] = cur.price;
        return acc;
    }, {})

    return (
        <Content style={contentStyle}>
            <Typography.Title level={3} style={{textAlign: 'left', color: 'white'}}>
                Portfolio: {''}
                {assets
                    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
                    .reduce((acc, v) => (acc +=v), 0)
                    .toFixed(2)}
                $
            </Typography.Title>
            <TradingViewChart />
            <AssetsTable />
        </Content>
        )
}