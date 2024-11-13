import  { useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const Chart = (chartdata) => {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth - (window.innerWidth / 100) * 10
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth( window.innerWidth - ((window.innerWidth / 100) * 10));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <div className="py-5">
      <div className="w-full flex flex-col justify-center">
        <div className="flex justify-center"><h2 className="text-2xl font-bold text-blue-600 pb-3">Net Asset Value(NAV) Details</h2></div>
        <AreaChart
          width={windowWidth}
          height={350}
          data={chartdata?.chartdata}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ccc" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ccc" stopOpacity={0} />
            </linearGradient>
            
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="nav"
            stroke="#1e88e5"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
         
        </AreaChart>
        <div className="flex justify-center text-blue-600 text-bold text-lg">Fund Date</div>
      </div>
    </div>
  );
};

export default Chart;
