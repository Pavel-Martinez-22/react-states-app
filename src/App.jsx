import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ContributePage from "./components/ContributePage";
import StatePage from "./components/StatePage";
import FunfactsPage from "./components/FunfactsPage";
import AboutInterface from "./components/AboutInterface";
import AboutAPI from "./components/AboutAPI";
import Missing from "./components/Missing";
import { Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="States App" />
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

        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
