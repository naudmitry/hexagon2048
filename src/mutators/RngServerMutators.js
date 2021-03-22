export function mutateServer(state, action) {
  let newState = {
    ...state.web,
    rngServer: action.value,
  };

  return Object.assign({}, state, newState);
}

export function mutateRadius(state, action) {
  let newState = {
    ...state.web,
    radius: action.value,
  };

  return Object.assign({}, state, newState);
}

export function mutateHexs(state, action) {
  let newState = {
    ...state.web,
    hexs: action.hexs,
  };

  return Object.assign({}, state, newState);
}