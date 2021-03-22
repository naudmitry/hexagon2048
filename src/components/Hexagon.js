import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hex from '../models/Hex';
import HexUtils from '../utils/HexUtils';

class Hexagon extends Component {
  static propTypes = {
    q: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired
  };

  static contextTypes = {
    layout: PropTypes.object,
    points: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    const { q, r, s } = props;
    const { layout } = context;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.state = { hex, pixel };
  }

  componentWillReceiveProps(nextProps) {
    const { q, r, s } = nextProps;
    const { layout } = this.context;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.setState({ hex, pixel });
  }

  render() {
    const { fill, cellStyle, className, q, r, s } = this.props;
    const { points } = this.context;
    const { pixel } = this.state;
    const fillId = (fill) ? `url(#${fill})` : null;
    return (
      <g
        className={classNames('hexagon-group', className)}
        transform={`translate(${pixel.x}, ${pixel.y})`}
      >
        <g className="hexagon" q={q} r={r} s={s}>
          <polygon points={points} fill={fillId} style={cellStyle} />
          {this.props.children}
        </g>
      </g>
    );
  }
}

export default Hexagon;