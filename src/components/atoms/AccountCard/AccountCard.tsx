import React from 'react';
import { Button } from '..';
import { editPencil } from '../../../assets';
import './styles/index.scss';

export default function AccountCard({
  codeNameDescription = false,
  edit = false,
  cardTitle,
  itemTitle,
  itemContent,
}: AccountCardProps): React.ReactElement {
  return (
    <div className="account-card-wrapper">
      <div className="title-row">
        <p className="card-title">{cardTitle}</p>
        {edit && (
          <Button
            type="secondary"
            iconLeft={<img style={{ paddingRight: 2 }} src={editPencil} />}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="card-items">
        <div className="title-wrapper">
          {itemTitle.map((item) => (
            <p className="item-title" key={Math.random()}>
              {item}
            </p>
          ))}
        </div>
        {codeNameDescription ? (
          <div className="code-name-description">
            <p className="description">
              Your codename is a name used to keep your identity secret. Think
              of it as your story-writing alter-ego that uniquely identifies you
              to other players. Your codename is case sensitive and you can’t
              change it once your account has been created.
            </p>
          </div>
        ) : (
          <div className="item-wrapper">
            {itemContent?.map((item) => (
              <p className="item" key={Math.random()}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface AccountCardProps {
  cardTitle: string;
  codeNameDescription?: boolean;
  edit?: boolean;
  itemTitle: string[];
  itemContent?: string[];
}
