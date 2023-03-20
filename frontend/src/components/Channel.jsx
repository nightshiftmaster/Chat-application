import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActiveChannel, selectChannel } from '../slices/activeChannelSlice';
import { openModal } from '../slices/modalSlice';

const Channel = ({ item }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = item;
  const { activeChannel } = useSelector((state) => state.activeChannel);

  return (
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
                    dispatch(openModal(action));
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
  );
};
export default Channel;
