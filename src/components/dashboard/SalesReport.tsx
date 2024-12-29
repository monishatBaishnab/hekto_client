import moment from 'moment';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';

const data = [
  {
    name: 'December 01, 2024',
    revenue: 24,
    users: 3,
  },
  {
    name: 'December 02, 2024',
    revenue: 13,
    users: 12,
  },
  {
    name: 'December 02, 2024',
    revenue: 98,
    users: 9,
  },
  {
    name: 'December 03, 2024',
    revenue: 39,
    users: 7,
  },
  {
    name: 'December 04, 2024',
    revenue: 48,
    users: 3,
  },
  {
    name: 'December 05, 2024',
    revenue: 38,
    users: 4,
  },
  {
    name: 'December 06, 2024',
    revenue: 43,
    users: 13,
  },
];
const SalesReport = () => {
  const chartMargins = { top: 10, right: 0, left: 0, bottom: 10 };
  const axisStyles = { fontSize: 12, fill: '#555', fontWeight: 'bold' };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-h-black">Sales Overview</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={chartMargins}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#cfcfcf"
                vertical={false}
                horizontal={true}
              />
              <Legend
                content={
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-blue-600">
                      Revenue in days
                    </span>
                  </div>
                }
                align="left"
                verticalAlign="top"
                height={36}
              />
              <XAxis
                dataKey="name"
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <text
                      x={x}
                      y={y + 20}
                      textAnchor="middle"
                      fill="#555"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {moment(payload.value).format('DD-M')}
                    </text>
                  );
                }}
                tickLine={false}
                axisLine={false}
              />

              {/* Y-Axis configuration */}
              <YAxis
                tick={axisStyles}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(2)}k`}
              />

              {/* Interactive elements */}
              <Tooltip cursor={{ stroke: '#8884d8', strokeWidth: 0.5 }} />

              {/* Area with custom styles */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
                fill="#2563EB1A"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={chartMargins}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#cfcfcf"
                vertical={false}
                horizontal={true}
              />
              <Legend
                content={
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-blue-600">
                      Sales Users
                    </span>
                  </div>
                }
                align="left"
                verticalAlign="top"
                height={36}
              />
              <XAxis
                dataKey="name"
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <text
                      x={x}
                      y={y + 20}
                      textAnchor="middle"
                      fill="#555"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {moment(payload.value).format('DD-M')}
                    </text>
                  );
                }}
                tickLine={false}
                axisLine={true}
              />

              {/* Y-Axis configuration */}
              <YAxis tick={axisStyles} tickLine={false} axisLine={true} />

              {/* Interactive elements */}
              <Tooltip cursor={{ stroke: '#8884d8', strokeWidth: 0.5 }} />
              {/* <Legend verticalAlign="top" height={36} /> */}
              <Bar
                dataKey="users"
                barSize={10}
                radius={[5, 5, 0, 0]}
                fill="#413ea0"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
