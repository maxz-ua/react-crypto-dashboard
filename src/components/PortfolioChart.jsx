import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useCrypto} from "../context/crypto-context.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
    const { assets } = useCrypto();

    // Function to generate random color for pie chart segments
    const generateRandomColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    const backgroundColors = assets.map(() => generateRandomColor());
    const data = {
        labels: assets.map((asset) => asset.name),
        datasets: [
            {
                label: 'Asset Distribution',
                data: assets.map((asset) => asset.totalAmount || 0),
                backgroundColor: backgroundColors,
            },
        ],
    };
    return (
        <div
            style={{
                display: 'flex',
                marginBottom: '1rem',
                justifyContent:'center',
                height: 300,
            }}
        >
            <Pie data={data}
            />
        </div>
    )
}