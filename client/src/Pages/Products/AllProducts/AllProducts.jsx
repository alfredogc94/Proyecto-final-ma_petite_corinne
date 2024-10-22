import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import { CardOneProduct } from "../../../components/CardOneProduct/CardOneProduct";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import fetchData from "../../../helpers/axiosHelper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./AllProducts.css";

export const AllProducts = () => {
  const { products } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]); // Estado para los productos recientes
  const [currentPage, setCurrentPage] = useState(1);
  const [showingRecent, setShowingRecent] = useState(false); // Para alternar entre productos recientes y todos
  const productsPerPage = 8;

  const [filter, setFilter] = useState("name");
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const categoryName = location.state?.categoryName || ""; 
 
  
 
  useEffect(() => {
    if (categoryName) {
      setSearch(categoryName);
    }
  }, [categoryName]);


  useEffect(() => {
    if (categoryName) {
      setSearch(categoryName);
    }
  }, [categoryName]);

  // Efecto para manejar la búsqueda
  useEffect(() => {
    const fetchProducts = async () => {
      if (search.length > 0) {
        try {
          const data = await fetchData(`products/searchProducts`, "post", { term: search, filter });
          setSearchResults(data);
        } catch (error) {
          console.error("Error al buscar productos:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults(products);
      }
    };

    fetchProducts();
  }, [search, products, filter]);


  useEffect(() => {
    if (showingRecent) {
      const fetchRecentProducts = async () => {
        try {
          const data = await fetchData(`products/newest`, 'get'); 
          setRecentProducts(data);
        } catch (error) {
          console.error("Error al obtener productos recientes:", error);
          setRecentProducts([]);
        }
      };

      fetchRecentProducts();
    }
  }, [showingRecent]); 

  const handleShowRecentProducts = () => {
    setShowingRecent(true); 
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    setShowingRecent(false); 
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (showingRecent ? recentProducts : searchResults).slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil((showingRecent ? recentProducts : searchResults).length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? "primary" : "secondary"}
          className="mx-1"
          style={{ minWidth: "40px" }}
        >
          {i}
        </Button>
      );
    }
    return pageButtons;
  };

  return (
    <div className="all-products-container">
      <div className="content-wrapper">
        <h1 className="titulos text-center" style={{ marginBottom: "2rem" }}>
          {showingRecent ? "Productos Recientes" : "Todos los Productos"}
        </h1>

        <div className="mb-3 d-flex justify-content-around align-items-center flex-wrap mb-5 gap-2">
          <div className="d-flex" style={{ width: "100%", maxWidth: "600px" }}>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={handleSearch}
              style={{ marginRight: "1rem" }}
            />
          </div>
          <Button className="custom-button" onClick={handleShowRecentProducts}>Nuevos productos</Button>
        </div>

        <Row>
          <Col>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {currentProducts?.map((product) => (
                <CardOneProduct key={product.product_id} product={product} />
              ))}
            </div>
          </Col>
        </Row>

        {/* Navegación entre páginas */}
        <div className="d-flex justify-content-center align-items-center mt-4 pagination-container">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline-dark"
            className="pagination-button custom-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>

          <div className="pagination-numbers">{renderPaginationButtons()}</div>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline-dark"
            className="pagination-button custom-button"
          >
            <FontAwesomeIcon icon={faChevronRight}/>
          </Button>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button onClick={() => navigate("/shop")} className="custom-button">
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};
