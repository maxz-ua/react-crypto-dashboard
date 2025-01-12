import React, { useEffect } from "react";

export default function TradingViewChart() {
    useEffect(() => {
        // Dynamically load the TradingView chart script
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Create the TradingView widget once the script has loaded
            new window.TradingView.widget({
                width: "100%", // Full width
                height: 500,  // Chart height
                symbol: "BTCUSD", // symbol
                interval: "D", // Interval (e.g., "D" for daily)
                timezone: "America/New_York", // Time zone
                theme: "light", // Theme for the chart
                style: "1", // Style (e.g., "1" for bar chart)
                container_id: "tradingview_chart", // The container id to render the chart
            });
        };

        return () => {
            // Clean up when the component is unmounted
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            id="tradingview_chart"
            style={{ width: "100%", height: "500px" }}
        ></div>
    );
}
