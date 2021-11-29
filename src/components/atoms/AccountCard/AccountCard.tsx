import React from 'react';
import { Button } from '..';
import { editPencil } from '../../../assets';
import './styles/index.scss';

export default function AccountCard({
  openEdit,
  desc = false,
  edit = false,
  cardTitle,
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
            onClick={openEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="card-items">
        <div className="item-wrapper">
          {itemContent?.map((item) => (
            <div className="item-container" key={item.title}>
              <p className="item-title">{item.title}</p>
              <p className={`item ${desc && 'description'}`}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AccountCardProps {
  cardTitle: string;
  edit?: boolean;
  desc?: boolean;
  itemContent?: { title: string; content?: string }[];
  openEdit?: () => void;
}
