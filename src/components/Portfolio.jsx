import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useCrypto } from "../context/crypto-context.jsx";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        // You can also add sorting logic here if needed
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
];

export default function Portfolio() {
    const { assets } = useCrypto();
    const [selectedSymbol, setSelectedSymbol] = useState(null);  // State for selected symbol

    useEffect(() => {
        if (selectedSymbol) {
            // Dynamically load the TradingView chart script when a symbol is selected
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                // Create the TradingView widget when the script is loaded
                new window.TradingView.widget({
                    width: "100%",
                    height: 500,
                    symbol: selectedSymbol, // Pass the selected symbol
                    interval: "D",
                    timezone: "America/New_York",
                    theme: "light",
                    style: "1",
                    container_id: "tradingview_chart", // The container ID to render the chart
                });
            };

            return () => {
                // Clean up when the component is unmounted
                document.body.removeChild(script);
            };
        }
    }, [selectedSymbol]);  // Re-run the effect when the selected symbol changes

    // Handle the click on a crypto item to update the selected symbol
    const handleClick = (symbol) => {
        setSelectedSymbol(symbol);  // Update selected symbol when clicked
    };

    // Prepare the data for the table
    const data = assets.map((asset) => ({
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount,
        symbol: asset.testPair,  // Assuming symbol is available for each asset
    }));

    return (
        <div>
            {/* Render the Table of Assets */}
            <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                onRow={(record) => ({
                    onClick: () => handleClick(record.symbol),  // On click, update the symbol
                })}
            />

            {/* Render TradingView chart when symbol is selected */}
            {selectedSymbol && (
                <div
                    id="tradingview_chart"
                    style={{ width: "100%", height: "500px", marginTop: "2rem" }}
                />
            )}
        </div>
    );
}
