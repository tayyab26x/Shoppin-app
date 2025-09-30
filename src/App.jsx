import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList.jsx";
import ProductDetails from "./Pages/Productdetails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;