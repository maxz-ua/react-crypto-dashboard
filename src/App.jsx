import { Flex, Layout } from 'antd';

import {CryptoContextProvider} from "./context/crypto-context.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import {useContext} from "react";
const { Header, Sider, Content } = Layout;



export default function App() {

  return (
      <CryptoContextProvider>
        <AppLayout />
      </CryptoContextProvider>
  )
}
