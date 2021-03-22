import {MUTATE_STATE} from "../reducers/web";
import RequestServices from "../services/RequestServices";
import {mutateHexs, mutateRadius, mutateServer} from "../mutators/RngServerMutators";

export function sendRequest(url, radius, data = {}) {
  return RequestServices.apiRequest(url + '/' + radius, 'POST', data)
    .then((response) => {
      return {
        type: MUTATE_STATE,
        mutator: mutateHexs,
        hexs: response
      }
    });
}

export function setServer(value) {
  return {
    type: MUTATE_STATE,
    mutator: mutateServer,
    value: value
  }
}

export function setRadius(value) {
  return {
    type: MUTATE_STATE,
    mutator: mutateRadius,
    value: value
  }
}