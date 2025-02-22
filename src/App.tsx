import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import Spinner from "./components/Spinner";

import NavBar from "./layouts/NavBar";

const HomePage = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container sx={{ py: 15 }}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
};

export default App;
