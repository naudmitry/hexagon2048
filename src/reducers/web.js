import rngServers from '../resources/rngserver';

const initialState = {
  rngServer: rngServers.localhost,
  radius: 2,
  hexs: {}
};

export const MUTATE_STATE = "MUTATE_STATE_WEB";

const web = (state = initialState, action) => {
  switch (action.type) {
    case MUTATE_STATE : {
      let resultState = state;
      if (action.mutator) {
        let mutator = Array.isArray(action.mutator) ? action.mutator : [action.mutator];
        mutator.forEach(function (func) {
          resultState = func(resultState, action);
        });
      }
      return Object.assign({}, resultState);
    }
    default:
      return state;
  }
};

export default web;