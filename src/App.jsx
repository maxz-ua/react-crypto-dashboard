import { Flex, Layout } from 'antd';
import AppHeader from "./components/layout/AppHeader.jsx";
import AppSider from "./components/layout/AppSider.jsx";
import AppContent from "./components/layout/AppContent.jsx";
const { Header, Sider, Content } = Layout;



export default function App() {
  return (
    <Layout>
      <AppHeader/>
      <Layout>
        <AppSider/>
        <AppContent/>
      </Layout>
    </Layout>
  )
}
