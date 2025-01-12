import {Table} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        sortDirections: ['ascend', 'descend'],
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    // Implement sorting/filtering logic if needed
};

export default function AssetsTable() {
    const {assets} = useCrypto()
    const data = assets.map((asset) => ({
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount,
    }))
    return (
        <Table
            pagination={false}
            columns={columns}
            dataSource={data}
            onChange={onChange}
        />
    )
}