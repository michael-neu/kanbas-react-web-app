import { Navigate, HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import store from "./Kanbas/store";

export default function App() {
  return (
    <HashRouter>
      <div>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </Provider>
      </div>
    </HashRouter>
  );
}
