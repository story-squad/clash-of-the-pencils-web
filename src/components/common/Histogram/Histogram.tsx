import React, { useEffect, useState } from 'react';
import { PlotParams } from 'react-plotly.js';
import createPlotyComponent from 'react-plotly.js/factory';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { results } from '../../../state';

const Plot = createPlotyComponent(window.Plotly);

// Configuration options for the histogram
const histoConfig: PlotParams['config'] = {
  staticPlot: true,
  responsive: true,
};

const Histogram = (): React.ReactElement => {
  const [histData, setHistData] = useRecoilState(results.histogram);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    setLoadError(false);
    Submissions.getHistogram()
      .then((res) => {
        console.log({ res });
        setHistData(res.data);
        setLoadError(false);
      })
      .catch((err) => {
        console.log({ err });
        setHistData(null);
        setLoadError(true);
      });
  }, []);

  useEffect(() => console.log(histData), [histData]);

  return (
    <div className="histogram">
      {histData ? (
        // Histogram loaded, display it
        <>
          <p>Here’s how our robots scored your story! &#129302;</p>
          <p>Squad</p>
          <DisplayPlot {...histData} config={histoConfig} />
          <p>
            Hint: Our robots love to read stories with lots of dialogue, vivid
            descriptions, and satisfying endings.
          </p>
        </>
      ) : loadError ? (
        // No histogram, error on load
        <>
          <div className="message">Today&apos;s score not available</div>
        </>
      ) : (
        // No histogram, no error, still loading!
        <>
          <div className="message">Loading graph...</div>
        </>
      )}
    </div>
  );
};

const DisplayPlot = (props: {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
  config: Partial<Plotly.Config>;
}) => {
  return <Plot data={props.data} layout={props.layout} config={props.config} />;
};

const graph: { data: Plotly.Data[]; layout: Partial<Plotly.Layout> } = {
  data: [
    {
      hoverinfo: 'none',
      legendgroup: '',
      marker: { color: '#F66700', line: { color: '#2462D9', width: [6] } },
      name: '',
      orientation: 'v',
      showlegend: false,
      textposition: 'auto',
      type: 'bar',
      x: [120],
      xaxis: 'x',
      y: [1],
      yaxis: 'y',
    },
  ],
  layout: {
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
  },
};

export default Histogram;
