import React from 'react'
import Header from './_components/header';
import Sidebar from './_components/sidebar';

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        {/* <div className='md:w-64 hidden md:block fixed'>
            <Sidebar /> 
        </div> */}
        <div >
            <Header />
            {children}
        </div>
        
    </div>
  )
}

export default layout