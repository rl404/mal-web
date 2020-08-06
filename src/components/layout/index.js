import React from 'react'
import Header from '../header'
import Sidebar from '../sidebar'
import Content from './Content'

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Content />
    </>
  )
}

export default Layout