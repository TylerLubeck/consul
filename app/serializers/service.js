import Serializer from './application';
export default Serializer.extend({
  primaryKey: 'Id',
  normalizeQueryResponse: function(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeFindAllResponse(...arguments);
  },
  normalizeFindAllResponse: function(store, primaryModelClass, payload, id, requestType) {
    return this._super(
      store,
      primaryModelClass,
      {
        [primaryModelClass.modelName]: payload.map(function(item) {
          item.Id = item.Name;
          return item;
        }),
      },
      id,
      requestType
    );
  },
  normalizeFindRecordResponse: function(store, primaryModelClass, payload, id, requestType) {
    return this._super(
      store,
      primaryModelClass,
      {
        [primaryModelClass.modelName]: {
          Id: id,
          Nodes: payload,
        },
      },
      id,
      requestType
    );
  },
});
