type DataType = {
  日付: string
  小計: number
};

export type GraphDataType = {
  label: string
  transition: number
};

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = [];
  const today = new Date();
  data
    .filter(d => new Date(d['日付']) < today)
    .forEach(d => {
      const date = new Date(d['日付']);
      const subTotal = d['小計'];
      graphData.push({
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        transition: subTotal,
      });
    });
  return graphData;
}