import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<h2>User</h2>
		</div>
	);
}

export default AppLayout;
