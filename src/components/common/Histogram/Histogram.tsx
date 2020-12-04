import React, { useEffect, useState } from 'react';
import { Submissions } from '../../../api';
import { results } from '../../../state';
import RenderHistogram from './RenderHistogram';

const Histogram = (): React.ReactElement => {
  const [histData, setHistData] = useState<null | results.HistData>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    setLoadError(false);
    Submissions.getHistogram()
      .then((res) => {
        console.log({ res });
        Reflect.deleteProperty(res.data.data[0], 'alignmentgroup');
        Reflect.deleteProperty(res.data.data[0], 'offsetgroup');
        Reflect.deleteProperty(res.data.layout, 'template');
        setHistData(res.data);
        setLoadError(false);
      })
      .catch((err) => {
        console.log({ err });
        setHistData(null);
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'scroll';
  }, []);

  useEffect(() => console.log(histData), [histData]);

  return histData ? (
    <RenderHistogram histData={histData} />
  ) : loadError ? (
    // No histogram, error on load
    <div className="histogram">
      <div className="message">Could not load histogram</div>
    </div>
  ) : (
    // No histogram, no error, still loading!
    <div className="histogram">
      <div className="message">Loading graph...</div>
    </div>
  );
};

export default Histogram;
