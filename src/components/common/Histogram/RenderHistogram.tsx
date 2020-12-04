import React from 'react';
import { PlotParams } from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(window.Plotly);

const RenderHistogram = ({ histData }: HistProps): React.ReactElement => {
  return (
    <div className="histogram">
      <p>Here’s how our robots scored your story! &#129302;</p>
      <Plot {...histData} config={histoConfig} />

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

export default RenderHistogram;
