import Graph from "../../components/Graph/Graph";
import CardCrypto from "../../components/CardCrypto/CardCrypto";
import InfoCrypto from "../../components/InfoCrypto/InfoCrypto"
import Header from "../../components/Header/Header"

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <CardCrypto />
      <Graph />
      <InfoCrypto/>
    </div>
  );
}

export default Dashboard;
