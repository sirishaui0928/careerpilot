import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = ({
  jobs,
}) => {

  const data = [
    {
      name: "Applied",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Applied"
      ).length,
    },

    {
      name: "Interview",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Interview"
      ).length,
    },

    {
      name: "Selected",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Selected"
      ).length,
    },

    {
      name: "Rejected",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Rejected"
      ).length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
  ];

  return (
    <div
      className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-3xl
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          mb-6

          text-zinc-900
          dark:text-white
        "
      >
        Job Analytics
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >

              {data.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default DashboardChart;