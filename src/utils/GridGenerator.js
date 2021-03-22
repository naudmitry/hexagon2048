import Hex from '../models/Hex';

class GridGenerator {
  static getGenerator(name) {
    if (GridGenerator.hasOwnProperty(name)) {
      return GridGenerator[name];
    }

    return null;
  }

  static hexagon(mapRadius) {
    let hexas = [];
    for (let q = -mapRadius; q <= mapRadius; q++) {
      let r1 = Math.max(-mapRadius, -q - mapRadius);
      let r2 = Math.min(mapRadius, -q + mapRadius);
      for (let r = r1; r <= r2; r++) {
        hexas.push(new Hex(q, r, -q - r));
      }
    }

    return hexas;
  }
}

export default GridGenerator;