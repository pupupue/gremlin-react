import api from '../../utils/api';
import { GRAPH } from '../types';

const {
  GET_TREE_ROOT,
  GET_BY_TYPE,
  GET_VERTEX_DATA,
  GET_VERTEX_EDGES,
  UPDATE_COUNT,
  ERROR,
} = GRAPH;

/**
 * @param {*} /get/TreeRoot
 * @param {*} getTreeRoot 
 * 
 * @desc gets and returns json data from api/get/TreeRoot
 */
export const getTreeRoot = () => async dispatch => {
  try {
    const res = await api.get('/get/TreeRoot');
    dispatch({
      type: GET_TREE_ROOT,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ERROR,
    });
  }
};

/**
 * @param {url} /:url
 * @param {url,title} getBy 
 * 
 * @desc gets data and url for sidebar tree view 
 */
export const getBy = (url, title) => async dispatch => {
  try {
    const res = await api.get(`/${url}`);
    dispatch({
      type: GET_BY_TYPE,
      payload: {title: title, res: res.data}
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ERROR,
    });
  }
};

/**
 * @param {*} 
 * @param {id,category} getVertexData 
 * 
 * @desc gets vertex data for displaying info for one vertex
 */
export const getVertexData = (id, category) => async dispatch => {
  try {
    dispatch({
      type: GET_VERTEX_DATA,
      payload: {id: id, by: category}
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ERROR,
    });
  }
};


/**
 * @param {id} getE/:id 
 * @param {id} getE 
 * 
 * @desc gets immediate edges for vertex by id
 */
export const getEdgeData = (id) => async dispatch => {
  try {
    const res = await api.get(`/getE/${id}`);
    dispatch({
      type: GET_VERTEX_EDGES,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ERROR,
    });
  }
};

/**
 * @param {*}
 * @param {count} updateCount 
 * 
 * @desc Updates count
 */
export const updateCount = (count) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COUNT,
      payload: count
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ERROR,
    });
  }
};