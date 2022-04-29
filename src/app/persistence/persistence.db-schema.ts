import { DBSchema } from 'idb';
import { TabletopState } from 'store/tabletop/tabletop.state';

export interface PersistenceDbSchema extends DBSchema {
  tabletops: {
    key: number;
    value: TabletopState;
  };
}
