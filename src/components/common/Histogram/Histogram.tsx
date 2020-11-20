import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { results } from '../../../state';

import createPlotyComponent from 'react-plotly.js/factory';
import { PlotParams } from 'react-plotly.js';
import { Submissions } from '../../../api';
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
        console.log(err);
        setHistData(null);
        setLoadError(true);
      });
  }, []);

  return (
    <div className="histogram">
      {histData ? (
        // Histogram loaded, display it
        <>
          <Plot {...histData} config={histoConfig} />
        </>
      ) : loadError ? (
        // No histogram, error on load
        <>
          <div className="message">Error loading graph</div>
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

export default Histogram;
