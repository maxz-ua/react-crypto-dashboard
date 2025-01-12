import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useState} from "react";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 64,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader(){
    const {crypto} = useCrypto();
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer, setDrawer] = useState(false);

    function handleSelect(value){
        console.log(value);
        setModal(true);
        setCoin(crypto.find(c => c.id === value));
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: 250
                }}
                onSelect={handleSelect}
                value="press / to open"
                defaultValue={['china']}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon}  alt={option.data.label}/> {''}
                        {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={() => setDrawer(true)}>
                Add
            </Button>

            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer = {null}>
                <CoinInfoModal coin = {coin} />
            </Modal>
            <Drawer
                width = {400}
                title= "Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}>
                <AddAssetForm />
            </Drawer>
        </Layout.Header>
    )
}