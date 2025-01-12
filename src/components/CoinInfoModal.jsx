import {Divider, Flex, Tag, Typography} from "antd";
import CoinInfo from "./CoinInfo.jsx";

export default function CoinInfoModal({coin}){
    return (
        <>
        <CoinInfo coin={coin} withSymbol/>
        <Divider />
            <Typography.Paragraph>
                <Typography.Text strong>H</Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {coin.priceChange1h}%
                </Tag>
                <Typography.Text strong>D</Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                    {coin.priceChange1d}%
                </Tag>
                <Typography.Text strong>W</Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                    {coin.priceChange1w}%
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                {coin.priceBtc}BTC
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                {coin.marketCap}$
            </Typography.Paragraph>
        </>
    )
}