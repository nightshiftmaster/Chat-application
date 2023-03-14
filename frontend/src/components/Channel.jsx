import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const Channel = ({ item, props }) => {
  const { t } = useTranslation();
  const {
    setModalAction, setSelectedChannel, handleShowModal, activeChannel, setActiveChannel,
  } = props;
  const { id, name, removable } = item;

  return (
    <li key={id} className="nav-item w-100">
      <div
        role="group"
        className="d-flex show dropdown btn-group"
      >
        <button
          onClick={() => setActiveChannel({ id, name, removable })}
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
                    setModalAction(action);
                    setSelectedChannel({
                      id,
                      name,
                      removable,
                    });
                    handleShowModal();
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
