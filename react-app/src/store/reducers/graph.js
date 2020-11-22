import { GRAPH } from '../types';

const {
  GET_TREE_ROOT,
  GET_BY_TYPE,
  GET_VERTEX_DATA,
  GET_VERTEX_EDGES,
  UPDATE_COUNT,
  ERROR,
} = GRAPH;

const initialState = {
  error: null,
  treeview: null,
  vertexes: {},
  vertex: null,
  edges: null,
  count: 0,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TREE_ROOT:
      return {
        ...state,
        treeview: payload
      };
    case GET_BY_TYPE:
      let v = state.vertexes
      v[payload.title] = payload.res;
      return {
        ...state,
        vertexes: v,
        count: state.count + v[payload.title]['_items'].length
      };
    case GET_VERTEX_DATA:
      return {
        ...state,
        vertex: state.vertexes[payload.by]['_items'].filter(v => v.id === payload.id),
      };
    case GET_VERTEX_EDGES:
      return {
        ...state,
        edges: payload
      };
    case UPDATE_COUNT:
      let count = state.count
      return {
        ...state,
        count: count + payload
      };
    case ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
