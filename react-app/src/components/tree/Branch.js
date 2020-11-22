import React, { useState, useEffect } from 'react'
import { getBy, updateCount } from '../../store/actions/graph';
import { useSelector, useDispatch } from 'react-redux';
import Leaf from './Leaf';
import useToggle  from '../hooks/useToggle';

/**
 * Branch (title, url)
 * 
 * @param title
 * @param url
 * @desc Branch component
 * displays a hoverable, colapsable link 
 */
function Branch({
  title, url
}) {
  const [toggle, setToggle] = useToggle(false);
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const { vertexes } = useSelector(state => ({
    vertexes: state.graph.vertexes
  }));

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
  const ulStyle = {
    padding: '0 0 0 1.5rem'
  }

  function handleClick(e) {
    e.preventDefault();
    if(!toggle) dispatch(getBy(url, title))
    setToggle()
  }

  useEffect(() => {
    if(vertexes[title] !== undefined) {
      if(!toggle) {
        let count = vertexes[title]['_items'].length
        let res = -count
        dispatch(updateCount(res))
      }
    }
  }, [vertexes, toggle, dispatch, title])
  return (
    <div style={{margin: '0'}}>
      <li 
        style={!hovered ? style : styleHover}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {title}
      </li>
      {(vertexes !== undefined && vertexes[title] !== undefined && toggle) ? (
        <ul style={ulStyle}>
          {vertexes[title]['_items'].map((v, key) => {
            return <Leaf
              key={key}
              id={v.id}
              label={v.label}
              category={title}
            /> 
          })}
        </ul>
      ) : (
        null
      )}
    </div>
  )
}

export default Branch
