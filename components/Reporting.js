import styles from "../styles/Reporting.module.css";
import MenuBar from "./MenuBar";
import Header from "./Header";
import { Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "chart.js/auto";

function Reporting() {
  const user = useSelector((state) => state.user.value);
  const tableTotalValue = user.totalValue;

  const value = useSelector((state) => state.value.value);
  const totalValue = value.totalValue;
  const cryptoData = value.cryptoData;

  const pieLabels = [];
  const pieDatasets = [];
  cryptoData?.forEach((crypto) => {
    if (crypto.value > 0) {
      pieLabels.push(crypto.name);
      pieDatasets.push(crypto.value / totalValue);
    }
  });

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieDatasets,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const lineLabels = [];
  const lineDataset = [];
  tableTotalValue?.forEach((totalValue) => {
    const datePreviousConnections = new Date(totalValue.date);
    const formattedDatePreviousConnections =
      datePreviousConnections.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    lineLabels.push(formattedDatePreviousConnections);
    lineDataset.push(totalValue.value);
  });

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Evolution of your portfolio",
        data: lineDataset,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.menubar}>
          <MenuBar />
        </div>
        <div className={styles.rightContent}>
          <h1 className={styles.title}>Reporting</h1>
          <div className={styles.charts}>
            <Pie className={styles.pie} data={pieData} />
            <Line className={styles.line} data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reporting;
