import Plotly from 'plotly.js';
import React from 'react';
import { PlotParams } from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const RenderHistogram = ({ histData }: HistProps): React.ReactElement => {
  return (
    <div className="histogram">
      <p>Here’s how our robots scored your story! &#129302;</p>
      <Plot data={histData.data} layout={histLayout} config={histoConfig} />

      <p>
        Hint: Our robots love to read stories with lots of dialogue, vivid
        descriptions, and satisfying endings.
      </p>
    </div>
  );
};

interface HistProps {
  histData: Pick<PlotParams, 'data' | 'layout'>;
}

// Configuration options for the histogram
const histoConfig: PlotParams['config'] = {
  staticPlot: true,
  responsive: true,
  autosizable: false,
};

// Layout options for histogram
const histLayout: PlotParams['layout'] = {
  autosize: true,
  height: 400,
  annotations: [
    {
      align: 'center',
      arrowcolor: '#636363',
      arrowhead: 5,
      arrowsize: 1,
      arrowwidth: 2,
      ax: 70,
      ay: -100,
      bgcolor: '#FFFFFF',
      borderpad: 4,
      borderwidth: 0,
      font: { color: 'black', family: 'PT Sans Narrow', size: 16 },
      opacity: 1,
      showarrow: true,
      text: 'Your submission<br>(100th percentile)',
      x: 120,
      xref: 'x',
      y: 0.2,
      yref: 'paper',
    },
  ],
  barmode: 'relative',
  legend: { tracegroupgap: 0 },
  margin: { t: 60 },
  plot_bgcolor: '#34C9AD',
  xaxis: {
    anchor: 'y',
    domain: [0, 1],
    showticklabels: false,
    title: {
      font: { family: 'PT Sans Narrow', size: 20 },
      text: 'Squad Score',
    },
  },
  yaxis: {
    anchor: 'x',
    domain: [0, 1],
    showgrid: false,
    showticklabels: true,
    title: {
      font: { family: 'PT Sans Narrow', size: 20 },
      text: 'Number of Stories',
    },
  },
};

export default RenderHistogram;
