import React from 'react';
import { Button, LoadIcon } from '../../atoms';

export default function VotingButtons({
  buttonsDisabled,
  submitDisabled,
  onClear,
  onSubmit,
  loading,
}: {
  buttonsDisabled: boolean;
  submitDisabled: boolean;
  onSubmit: () => void;
  onClear: () => void;
  loading: boolean;
}): React.ReactElement {
  return (
    <div className="button-row">
      <Button onClick={onClear} disabled={buttonsDisabled} type="secondary">
        Reset Votes
      </Button>
      <Button
        iconLeft={loading && <LoadIcon />}
        disabled={submitDisabled || buttonsDisabled}
        onClick={onSubmit}
      >
        Submit Votes
      </Button>
    </div>
  );
}
