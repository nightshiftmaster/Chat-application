/* eslint-disable no-unused-expressions */
import { React } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  setActiveChannel, selectChannel, channelSelector, channelControlSelector,
} from '../slices/channelsSlice';
import { renderModal } from '../slices/modalSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(channelSelector.selectAll);
  const activeChannel = useSelector(channelControlSelector.selectActive);

  return channels.map(({ id, name, removable }) => (
    <li key={id} className="nav-item w-100">
      <div
        role="group"
        className="d-flex show dropdown btn-group"
      >
        <button
          onClick={() => dispatch(setActiveChannel({ id, name, removable }))}
          type="button"
          className={`w-100 rounded-0 text-start text-truncate btn ${
            activeChannel.id === id ? 'btn-secondary' : ''
          }`}
        >
          <span className="me-1">#</span>
          {name}
        </button>
        {removable ? (
          <Dropdown>
            <Dropdown.Toggle
              variant={
                  activeChannel.id === id ? 'secondary' : ''
                }
              id="dropdown-basic"
            >
              <span className="visually-hidden">
                Управление каналом
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {['removing', 'renaming'].map((action) => (
                <Dropdown.Item
                  key={action}
                  onClick={() => {
                    dispatch(selectChannel({
                      id,
                      name,
                      removable,
                    }));
                    dispatch(renderModal({ action, item: { id, name } }));
                  }}
                >
                  <span>
                    {' '}
                    {t(`headers.dropDown_links.${action}`)}
                  </span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </div>
    </li>
  ));
};

export default Channels;
