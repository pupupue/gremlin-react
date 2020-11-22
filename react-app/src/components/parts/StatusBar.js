import React from 'react'
import { useSelector } from 'react-redux';

/**
 * StatusBar ()
 * 
 * @desc StatusBar component
 * Displays count
 */
function StatusBar() {
  const container = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ff9800',
    height: '10%',
    margin: '0 -1.5em',
  }
  const style = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '1.5em 9em',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
  const { count } = useSelector(state => ({
    count: state.graph.count
  }))

  return (
    <div style={container}>
      <div style={style}>
        <span style={{fontSize:"1.5em", textTransform: 'uppercase'}}>Selected:</span>
        <span style={{fontSize:"1.5em", marginLeft: 'auto'}}>{count}</span>
      </div>
    </div>
  )
}

export default StatusBar
