import { AgChartProps, AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";

type PieChartProps = Omit<AgChartProps, "options"> & {
  title?: string;
  data: { 
    url: string;
    timeCount: number;  
  }[];
};

const PieChart = ({
  data,
  title="",
  ...props
}: PieChartProps) => {
  const [options, setState] = useState({});

  useEffect(() => {
    setState({
      data,
      title: {
        text: { title },
        enabled: !!title,
      },
      series: [
        {
          type: "pie",
          angleKey: "timeCount",
          legendItemKey: "url",
        },
      ],
      legend: {
        position: "right",
      }
    });
  }, [data, title]);

  return (
    <AgCharts options={options} {...props} />
  )
};

export default PieChart;
