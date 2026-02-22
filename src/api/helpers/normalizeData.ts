interface BaseItem {
  _id: string;
}

export interface NormalizedData<T> {
  ids: string[];
  entities: Record<string, T>;
}

export function normalizeData<T extends BaseItem>(data: T[]) {
  return data.reduce<NormalizedData<typeof data[number]>>((acc, curr) => {
    acc.entities[curr._id] = curr;
    acc.ids.push(curr._id);
    return acc;
  }, {
    entities: {},
    ids: [],
  });
}