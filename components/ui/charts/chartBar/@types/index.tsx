export type ChartBarData = {
  label: string;
  value: { [key: string]: number };
};

export type ChartBarProps = {
  data: ChartBarData[];
  width: number;
  height: number;
  dataKey: { key: string; stackId?: string; color: string }[];
  barSize?: number;
  maxValue: number;
  viewSize: { width: number; height: number };
  groupWidth: number;
  numberOfBar: number;
  axisPaddingX: number;
  axisPaddingY: number;
  setDataKey: React.Dispatch<React.SetStateAction<ChartBarProps['dataKey']>>;
  setMaxValue: React.Dispatch<React.SetStateAction<ChartBarProps['maxValue']>>;
  setAxisPaddingX: (number: number) => void;
  setAxisPaddingY: ChartBarProps['setAxisPaddingX'];
};
