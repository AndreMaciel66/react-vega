import React, { PropTypes } from 'react';
import Vega from './Vega.js';

export default function createClassFromSpec(...args) {
  const spec = args.length === 1 ? args[0] : args[1];

  const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    viewport: PropTypes.array,
    renderer: PropTypes.string,
    data: PropTypes.object,
  };
  if (spec.signals) {
    spec.signals.forEach(signal => {
      propTypes[Vega.listenerName(signal.name)] = PropTypes.func;
    });
  }

  function Chart(props) {
    return <Vega spec={spec} {...props} />;
  }

  Chart.getSpec = function getSpec() {
    return spec;
  };

  Chart.propTypes = propTypes;

  return Chart;
}
