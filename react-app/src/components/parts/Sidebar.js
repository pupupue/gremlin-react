import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Branch from '../tree/Branch';
import StatusBar from './StatusBar'; 
import ParentBranch from '../tree/ParentBranch'; 
import { getTreeRoot } from '../../store/actions/graph';

/**
 * Sidebar ()
 * 
 * @desc Sidebar component
 * Displays treeview and StatusBar (count) components
 */
function Sidebar() {
  const dispatch = useDispatch()
  const secondary = "#ffc400";
  const componentStyle = {
    padding: '3em 1.5em 0',
    flex: '0 1 30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: secondary,
  }

  useEffect(() => {
    dispatch(getTreeRoot())
  }, [dispatch]);

  const { treeview } = useSelector(state => ({
    treeview: state.graph.treeview
  }))

  return (
    <div style={componentStyle}>
      <div style={{overflow: 'auto'}}>
        {treeview === null || treeview === undefined ? (
          "loading"
        ) : ( 
          <ul>
            {treeview.map((node, key) => {
              for(const parent in node[0]) {
                if(node[0][parent].hasOwnProperty("children")){
                  return <ParentBranch
                    key={key}
                    node={parent}
                    children={node[0][parent].children}
                  />
                }else{
                  return <Branch
                    key={key}
                    title={node[0][parent].title}
                    url={node[0][parent].url}
                  /> 
                }
              }
              return null
            })}
          </ul>
        )}
      </div>
      {/* Status Bar */}
      <StatusBar />
    </div>
  )
}

export default Sidebar
