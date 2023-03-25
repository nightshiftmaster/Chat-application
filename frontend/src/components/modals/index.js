import Add from './Add';
import Rename from './Rename';
import Remove from './Remove';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

export default (type) => modals[type];
