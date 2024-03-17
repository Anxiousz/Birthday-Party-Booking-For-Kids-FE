import React from 'react'

import Header from "./../Header/Header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";

const Layout = () => {
  return (
  <>
 <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <Header/>
  <div style={{ flex: 1 }}>
    <Routers/>
  </div>
  <Footer/>
</div>
  </>
  );
}

export default Layout;
