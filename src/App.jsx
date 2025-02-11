import { Outlet} from "react-router";
import Header from "./shared/Header";


function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
