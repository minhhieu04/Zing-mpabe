import React, { useEffect, useState } from "react";
import { apiGetChartHome } from "../../apis";

const ZingChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setChartData(response.data.data);
    };
    fetchChartData();
  }, []);

  return <div>ZingChart</div>;
};

export default ZingChart;
