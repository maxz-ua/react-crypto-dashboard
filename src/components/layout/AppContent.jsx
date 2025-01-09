import { Flex, Layout } from 'antd';
import {Content} from "antd/es/layout/layout.js";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
};

export default function AppContent() {
    return <Content style={contentStyle}>Content</Content>
}