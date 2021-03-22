import {Component} from 'react';
import HexGrid from './components/HexGrid';
import Layout from './components/Layout';
import Utils from './utils/Utils';
import GridGenerator from './utils/GridGenerator';
import Hexagon from './components/Hexagon';
import Text from './components/Text';
import configs from './resources/configurations';
import rngServers from './resources/rngserver';
import radiuses from './resources/radiuses.json';
import './App.css';
import Hex from "./models/Hex";
import HexUtils from "./utils/HexUtils";

class App extends Component {
  constructor(props) {
    super(props);
    const config = configs['hexagon'];
    const generator = GridGenerator.getGenerator(config.map);
    const hexagons = generator.apply(this, config.mapProps);
    this.state = {hexagons, config, originHexagons: hexagons};
  }

  componentDidMount() {
    const {rngServer, radius} = this.props;
    this.props.onGetHexs(rngServer, radius, []);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (Utils.isNotEmptyObject(this.props.hexs) && Utils.compareObjects(this.props.hexs, prevProps.hexs)) {
      let newHexagons = this.state.hexagons.map((hexagon) => {
        let replace = this.props.hexs.find(hex => hex.x === hexagon.q && hex.y === hexagon.r);
        if (replace) {
          return new Hex(replace.x, replace.y, replace.z, replace.value);
        }
        return hexagon;
      });

      this.setState({
        hexagons: newHexagons
      });
    }
  }

  changeServer(event) {
    const name = event.currentTarget.value;
    this.props.onSetServer(name);
    this.setState({
      hexagons: this.state.originHexagons
    });
    this.props.onGetHexs(name, this.props.radius, []);
  }

  changeRadius(event) {
    const radius = event.currentTarget.value;
    this.props.onSetRadius(radius);
    const hexagons = GridGenerator.hexagon(radius - 1);
    this.setState({
      hexagons, originHexagons: hexagons
    });
    this.props.onGetHexs(this.props.rngServer, radius, []);
  }

  render() {
    const {hexagons, config} = this.state;
    const {rngServer, radius} = this.props;
    const layout = config.layout;
    const size = {x: layout.width, y: layout.height};

    return (
      <div className="App">
        <div>
          <strong>RNG-server url:</strong>
          <select value={rngServer} onChange={(ev) => this.changeServer(ev)}>
            {Object.keys(rngServers).map((serverName) => (
              <option key={serverName} id={serverName} name={rngServers[serverName]}>{rngServers[serverName]}</option>
            ))}
          </select>
        </div>
        <br/>
        <div>
          <strong>Radius:</strong>
          <select value={radius} onChange={(ev) => this.changeRadius(ev)}>
            {Object.keys(radiuses).map((radius) => (
              <option key={radius} id={radius} name={radiuses[radius]}>{radiuses[radius]}</option>
            ))}
          </select>
        </div>
        <hr/>
        <HexGrid width={config.width} height={config.height}>
          <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
            {
              hexagons.map((hex, i) => (
                <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s}>
                  {/*<Text>{hex.value > 0 ? hex.value.toString() : ''}</Text>*/}
                  <Text>{HexUtils.getID(hex)}</Text>
                </Hexagon>
              ))
            }
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default App;
