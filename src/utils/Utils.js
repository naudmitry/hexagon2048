import HexUtils from "./HexUtils";

class Utils {
  static isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  static isNotEmptyObject(obj) {
    return !(obj && Object.keys(obj).length === 0 && obj.constructor === Object);
  }

  static compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
  }
}

export default Utils;