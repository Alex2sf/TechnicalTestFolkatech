const formatResource = (type, item, meta = null) => {
  if (!item) return null;
  const { id, ...attributes } = item;
  
  const payload = {
    data: {
      type,
      id: String(id || ''),
      attributes
    }
  };

  if (meta) payload.meta = meta;
  return payload;
};

const formatCollection = (type, items = [], meta = null, links = null) => {
  const data = items.map((item) => {
    const { id, ...attributes } = item;
    return {
      type,
      id: String(id),
      attributes
    };
  });

  const payload = { data };
  if (links) payload.links = links;
  if (meta) payload.meta = meta;
  return payload;
};

const formatError = (status, title, detail) => ({
  errors: [
    {
      status: String(status),
      title,
      detail
    }
  ]
});

module.exports = {
  formatResource,
  formatCollection,
  formatError
};
