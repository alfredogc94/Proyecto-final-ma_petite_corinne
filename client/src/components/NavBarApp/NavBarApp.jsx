import React, { useContext, useEffect, useRef, useState } from 'react';
import './navBarApp.scss';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/ContextProvider';
import { Button } from 'react-bootstrap';

export const NavBarApp = ({ setShowRegister, setShowLogin, setShowEditUser, setShowEditPassword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const [position, setPosition] = useState({});

  const { user, setUser, setToken, setIsAuthenticated, cartItems } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const editToggleRef = useRef(null); 
  const userNameRef = useRef(null);
  //
  const editToggleRef2 = useRef(null);
  const iconToggleRef = useRef(null);
 
  const toggleEdit = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleEdit2 = () => {
    setIsOpen3(!isOpen3);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/shop");
    setIsAuthenticated(false);
  };

  const toggleCart = () => {
    if (location.pathname === "/shop/cart") {
      navigate("/shop");
    } else {
      navigate("/shop/cart");
    }
  };

  const openEditUser = () => {
    setShowEditUser(true);
    setIsOpen2(false);
    setIsOpen(false);
  };

  const openEditPassword = () => {
    setShowEditPassword(true);
    setIsOpen2(false);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsOpen3(false)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editToggleRef.current && !editToggleRef.current.contains(event.target)&& 
      userNameRef.current && 
      !userNameRef.current.contains(event.target)) {
        setIsOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editToggleRef2.current && !editToggleRef2.current.contains(event.target)&& 
      iconToggleRef.current && 
      !iconToggleRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsOpen3(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 834) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 834) {
        setIsOpen3(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    
    setIsOpen(false);
    setIsOpen2(false);

  }, [location]);

  useEffect(() => {
    if (userNameRef.current) {
        const rect = userNameRef.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
    }
  }, [isOpen2]); 

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen2(false); // Cierra el modal al hacer scroll
    };

    // Añadir el event listener cuando se monte el componente
    window.addEventListener("scroll", handleScroll);

    // Eliminar el event listener cuando se desmonte el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <img className="logo-ppal" src="m-LOGO-RELLENO.png" alt="logo" />
        </Link>
  
        <div className="menu-btn" onClick={toggleMenu} ref={iconToggleRef}>

          &#9776;
        </div>

        <div className="navbar-nav">
          <div className="nav-links">
            <span><Link to="/">Inspírate</Link></span>
            <span><Link to="/">Blog</Link></span>
            <span><Link to="/">Contacto</Link></span>
            <span><Link to="/shop">Tienda</Link></span>
          </div>

          {location.pathname.startsWith('/shop') && (
            <>
              <div className='d-flex align-items-center ms-5 '>
                {user ? (

                  <div className='d-flex align-content-center ms-5'>
                    <p className='me-3 m-auto name-u' style={{ cursor: "pointer" }} onClick={toggleEdit} ref={userNameRef}>{user.name} {user.last_name}</p>

                    <Button 
                      className="custom-button"
                      onClick={logOut}
                    >
                      Cerrar Sesión
                    </Button>

                    {user.type === 2 && (
                      <Link to="/AdminDashboard" className="ms-3 me-3">
                        <Button className="custom-button">
                          Admin
                        </Button>
                      </Link>
                    )}

                  </div>
                ) : (
                  <div className='d-flex gap-3'>
                    <Button className="custom-button" onClick={() => setShowRegister(true)}>
                      Regístrate
                    </Button>
                    <Button className="custom-button" onClick={() => setShowLogin(true)}>
                      Iniciar Sesión
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {location.pathname.startsWith('/shop') && (
            <div className="cart-icon-container" onClick={toggleCart}>
              <img 
                className="carrito-compra"
                src="/carro-de-la-compra.png"
                alt="carrito-compra"
              />
              {cartItems && cartItems.length > 0 && user && (
                <span className="cart-counter">{cartItems.length}</span>
              )}
            </div>
          )}
        </div>

        {user && (
          <div className={`edit-toggle ${isOpen2 ? 'active' : ''}`} style={{ top: `${position.top + 38}px`, left: `${position.left}px` }} ref={editToggleRef}>
            <div className='edit-modals-toggle'>
              <p onClick={openEditUser}>Editar usuario</p>
              <p onClick={openEditPassword}>Cambiar contraseña</p>
              <p><Link className='link' to="/shop/orderHistory">Mis pedidos</Link></p>
            </div>
          </div>
        )}
  
        <div className={`navbar-nav-toggle ${isOpen ? 'active' : ''}`} ref={editToggleRef2}>

          <div className='nav-links-toggle '>
            <span><Link to="/">Inspírate</Link></span>
            <span><Link to="/">Blog</Link></span>
            <span><Link to="/">Contacto</Link></span>
            <span><Link to="/shop">Tienda</Link></span>
            {location.pathname.startsWith('/shop') && (
              <span><Link to="/shop/cart">Carrito</Link></span>
            )}
          </div>

          {location.pathname.startsWith('/shop') && (
            <div className='d-flex flex-column align-items-center'>
              {user ? (
                <>
                  <p style={{ cursor: "pointer" }} onClick={toggleEdit2}>{user.name} {user.last_name}</p>

                  <div className={`user-menu-toggle ${isOpen3 ? 'active' : ''}`}>
                    <div className={`user-options `}>
                    <p onClick={openEditUser}>Editar usuario</p>
                    <p onClick={openEditPassword}>Cambiar contraseña</p>
                    <p><Link className='link' to="/shop/orderHistory">Mis pedidos</Link></p>
                    </div>
                  </div>


                  <Button className="button-primary" onClick={logOut}>Cerrar Sesión</Button>
                  {user.type === 2 && (
                    <Link to="/AdminDashboard" className="mb-2">
                      <Button className="button-primary">Admin</Button>
                    </Link>
                  )}
                </>
              ) : (
                <div className='d-flex gap-3'>
                  <Button className="custom-button" onClick={() => setShowRegister(true)}>
                    Regístrate
                  </Button>
                  <Button className="custom-button" onClick={() => setShowLogin(true)}>
                    Iniciar Sesión
                  </Button>
                </div>
              )}
            </div>
          )}
{/* 
          <div className="search-toggle">
            <input type="text" placeholder="Buscar producto" />
            <img
              className="icono-search"
              src="/icon-search.svg"
              alt="icono busqueda productos"
            />
          </div> */}
        </div>
      </div>
    </nav>
  );
};
