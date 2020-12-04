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
        setHistData(res.data);
        setLoadError(false);
      })
      .catch((err) => {
        console.log({ err });
        setHistData(null);
        setLoadError(true);
      });
  }, []);

  return (
    <div className="histogram">
      {histData ? (
        // Histogram loaded, display it
        <>
          <p>Here’s how our robots scored your story! &#129302;</p>
          <Plot {...histData} config={histoConfig} />
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

// const graph: { data: Plotly.Data[]; layout: Partial<Plotly.Layout> } = {
//   data: [
//     {
//       hoverinfo: 'none',
//       line: {
//         color: '#EB7E5B',
//         width: 7,
//       },
//       marker: {
//         color: '#FED23E',
//         size: 18,
//         symbol: 'star',
//       },
//       mode: 'text+lines+markers',
//       type: 'scatter',
//       x: [1, 2, 3],
//       y: [34, 44, 54],
//     },
//   ],
//   layout: {
//     plot_bgcolor: '#6CEAE6',
//     title: {
//       font: {
//         family: 'PT Sans Narrow',
//         size: 25,
//       },
//       text: "Kelley's Squad Score Over Time",
//       x: 0.5,
//       y: 0.95,
//     },
//     xaxis: {
//       showgrid: false,
//       ticks: 'inside',
//       tickvals: [1, 2, 3],
//       title: {
//         font: {
//           family: 'PT Sans Narrow',
//           size: 20,
//         },
//         text: 'Week Number',
//       },
//       zeroline: false,
//     },
//     yaxis: {
//       showgrid: false,
//       showticklabels: false,
//       title: {
//         font: {
//           family: 'PT Sans Narrow',
//           size: 20,
//         },
//         text: 'Squad Score',
//       },
//     },
//   },
// };

export default Histogram;
