import React from 'react';
import Sidebar from '../components/parts/Sidebar';
import MainView from '../components/parts/MainView';

/**
 * GraphDashboard ()
 * 
 * @url /
 * @desc main page
 */
function GraphDashboard() {

  const containerStyle = {
    height: "100vh",
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: '0'
  }
  const wrapperStyle = {
    backgroundColor: '#482880',
    height: "100%",
    width: '100%',
  }
  const container = {
    height: "100%",
    width: '100%',
    display: 'flex',
    flexDirection: 'row', 
  }

  return (
    <div style={containerStyle}>  
      <div style={wrapperStyle}>
        <div style={container}>
          <Sidebar />
          <MainView />
        </div>
      </div>
    </div>
  )
}

export default GraphDashboard
