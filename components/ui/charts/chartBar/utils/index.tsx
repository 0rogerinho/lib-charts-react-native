type DataProps = {
  label: string;
  value: { [key: string]: number };
};

export const getYPosition = (
  value: number,
  height: number,
  maxValue: number,
) => {
  return height - (value / maxValue) * (height - 30);
};

// Ocultar rótulos alternadamente
export const shouldShowLabel = (
  index: number,
  width: number,
  data: DataProps[],
) => {
  const minLabelWidth = 50; // Largura mínima para as labels (ajustável)
  const spacePerLabel = width / data.length;
  return spacePerLabel >= minLabelWidth || index % 2 === 0; // Exibe a cada 2 rótulos
};

export const formatNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});
