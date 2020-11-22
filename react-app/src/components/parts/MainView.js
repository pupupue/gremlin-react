import React from 'react'
import { useSelector } from 'react-redux';

/**
 * MainView ()
 * 
 * @desc Main view component for displaying
 * vertex and its edge data
 */
function MainView() {
  const componentStyle = {
    padding: '6em 4.5em 4.5em',
    flex: '0 1 70%',
    display: 'flex',
    flexDirection: 'column'
  }
  const splitStyle = {
    flex: '0 1 75%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 .75em 0',
  }
  const splitStyleRigth = {
    flex: '0 1 25%',
    display: 'flex',
    padding: '0 0 0 .75em',
    flexDirection: 'column',
    textAlign: 'right',
    justifyContent:'right'
  }
  const primaryDark = "#9289a3";
  const innerStyle = {
    padding: '3em 1.5em',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: '100%',
    fontSize:"1.2em",
    borderRadius: '1.2em',
    overflow: 'auto'
  }
  const propStyle = {
    display: 'flex',
    padding: '.5em',
    justifyContent: 'space-between'
  }
  const second = {
    backgroundColor: '#eee'
  }
  const spanStyle = {
    fontWeight: '700'
  }
  const { vertex, edges } = useSelector(state => ({
    vertex: state.graph.vertex,
    edges: state.graph.edges,
  }));

  return (
    <div style={componentStyle}>
      <div style={innerStyle}>
        <h2 style={{
          fontSize:"2em",
          textAlign:"center",
          color: primaryDark,
          paddingBottom: '1.5em',
        }}>
          VERTEX DATA
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          {vertex === null || vertex === undefined ? (
            null
          ) : (
          <div style={splitStyle}>
            <div style={{...propStyle, ...second}}><span style={spanStyle}>Label: </span>{vertex[0].label}</div>
            <div style={propStyle}><span style={spanStyle}>ID: #</span>{vertex[0].id}</div>
            {vertex.map((v, key) => {
              let properties = [];
              let i = 1;
              for(const prop in v['properties']) {
                properties.push(<div key={key+i} style={(i%2) ? {...propStyle, ...second} : propStyle}><span style={spanStyle}>{v['properties'][prop][0].label}: </span>{v['properties'][prop][0].value}</div>)
                i = i + 1;
              }
              return properties;
            })}
          </div>
          )}
          {/* EDGES */}
          {edges === null || edges === undefined ? (
            null
          ) : (
          <div style={splitStyleRigth}>
            {edges['_items'].map((e, key) => {
              let properties = [];
              properties.push(<div key={key}style={{...propStyle, ...second}}>
                <span style={{...spanStyle, margin:'auto'}}>#{e.id}: connection</span>
              </div>)
              properties.push(<div key={key+'e'} style={{...propStyle, marginBottom:'.75em'}}>
                <span style={spanStyle}>[{e.inV.id}]</span>
                <span style={spanStyle}>&#10229;</span>
                <span style={spanStyle}>[{e.outV.id}]</span>
              </div>)
              return properties;
            })}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainView
