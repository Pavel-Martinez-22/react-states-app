import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContributePage from "./pages/ContributePage";
import StatePage from "./pages/StatePage";
import FunfactsPage from "./pages/FunfactsPage";
import AboutInterface from "./pages/AboutInterface";
import AboutAPI from "./pages/AboutAPI";
import Missing from "./pages/Missing";
import { Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header title="States App" />
      <DataProvider>
        <Nav />

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>

          <Route path="/contribute">
            <Route index element={<ContributePage />} />
          </Route>

          <Route path="/state">
            <Route index element={<Navigate to="/" replace />} />
            <Route path=":code" element={<StatePage />} />
            <Route path=":code/funfacts" element={<FunfactsPage />} />
          </Route>

          <Route path="/about-interface" element={<AboutInterface />} />
          <Route path="/about-api" element={<AboutAPI />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
