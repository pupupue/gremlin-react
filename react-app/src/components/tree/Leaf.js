import React, { useState } from 'react'
import { getVertexData, getEdgeData } from '../../store/actions/graph';
import { useDispatch } from 'react-redux';

/**
 * Leaf (label, title, url)
 * 
 * @param label
 * @param title
 * @param url
 * @desc Leaf component
 * displays a hoverable, clickable link that updates main vertex view 
 */
function Leaf({
  label, id, category
}) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const style = {
    fontSize: '1em',
    margin: '0.5rem 0',
    userSelect: 'none',
    cursor: 'pointer',
  }
  const styleHover = {
    margin: '0.5rem 0',
    userSelect: 'none',
    cursor: 'pointer',
    fontWeight: '900'
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVertexData(id, category))
    dispatch(getEdgeData(id))
  }

  return (
    <li 
      style={!hovered ? style : styleHover}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {(!hovered) ? ("Vertex #" + id) : ("Label: " + label)}
    </li>
  )
}

export default Leaf
