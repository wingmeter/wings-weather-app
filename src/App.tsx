import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./layout/Header/Header";
// import { Popup } from "./components/Popup/Popup";

function App() {
  return (
    <div className="global-container">
      {/* <Popup /> */}
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
