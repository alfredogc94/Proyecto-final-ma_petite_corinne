import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/ContextProvider';
import { Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CardOneCategory } from '../../components/CardOneCategory/CardOneCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import tienda from '../../assets/tienda.png';
import './showCategories.scss';

export const ShowCategories = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const { categories } = useContext(AppContext);

  const handleNavigateToShop = () => {
    navigate('/shop/allProducts');
  };

  const handleCategorySelect = (categoryName) => {
    navigate('/shop/allProducts', { state: { categoryName } });
  };

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const displayedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          variant={currentPage === i ? 'primary' : 'secondary'}
          className="pagination-button"
        >
          {i}
        </Button>
      );
    }
    return pageButtons;
  };

  return (
    <div className='bg-white'>
      <img className='titulo-tienda pt-3' src="TANGER-TIENDA.png" alt="tienda" />
      <div className='text-center pb-5 pt-5'>
        <button className='button-custom' onClick={handleNavigateToShop}>Ver Todos los Productos</button>
      </div>

      <Row className='justify-content-center'>
        <Col xs={10} md={6} className='text-center'>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Buscar categoría..."
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className='rounded-2'
            />
            <InputGroup.Text style={{ border: 'none', background: 'transparent' }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          {displayedCategories.length > 0 ? (
            <Row className='d-flex justify-content-center px-3'>
              {displayedCategories.map((elem) => (
                <Col key={elem.category_id} xs={12} md={6} className="p-2">
                  <CardOneCategory
                    category={elem}
                    onClick={() => handleCategorySelect(elem.category_name)}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className='text-center'>No se encontraron categorías</p>
          )}

          {/* Barra de paginación con flechas */}
          <div className="d-flex justify-content-center align-items-center mt-4 mb-5 pagination-container">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline-dark"
              className="pagination-button custom-button"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>

            <div className="pagination-numbers mx-2">
              {renderPaginationButtons()}
            </div>

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline-dark"
              className="pagination-button custom-button"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
