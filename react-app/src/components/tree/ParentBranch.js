import React, { useState } from 'react'
import Branch from './Branch';
import useToggle  from '../hooks/useToggle';

/**
 * ParentBranch (node, children)
 * 
 * @param node
 * @param children
 * @desc ParentBranch component
 * displays a hoverable, collapsable link that renders sub-branches
 */
function ParentBranch({
  node, children
}) {
  const [toggle, setToggle] = useToggle(false);
  const [hovered, setHovered] = useState(false);
  const style = {
    margin: '0.5rem 0',
    userSelect: 'none',
    cursor: 'pointer'
  }
  const styleHover = {
    margin: '0.5rem 0',
    userSelect: 'none',
    cursor: 'pointer',
    fontWeight: '900'
  }
  const ulStyle = {
    padding: '0 0 0 1.5rem'
  }
  return (
    <div style={{margin: '0'}}>
      <li
        style={!hovered ? style : styleHover}
        onClick={setToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {node}
      </li>
      {(toggle) ? (
        <ul style={ulStyle}>
          {children.map((child, key) => {
            return <Branch
              key={key}
              title={child.title}
              url={child.url}
            /> 
          })}
        </ul>
      ) : (
        null
      )}
    </div>
  )
}

export default ParentBranch
