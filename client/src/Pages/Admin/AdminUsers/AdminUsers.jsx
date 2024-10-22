import React, { useContext } from 'react'; 
import { Row, Col, Button, Card } from 'react-bootstrap';
import { AppContext } from '../../../Context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimesCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './adminUsers.scss';

export const AdminUsers = () => {
    const { users } = useContext(AppContext);
    const navigate = useNavigate(); 

    const handleToggleUser = (userId) => {
        console.log(`Toggle user with ID: ${userId}`); 
    };

    const handleGoBackToShop = () => {
        navigate('/adminDashboard'); 
    };

    return (
        <div className="admin-users-container">
            <h1>Lista de Usuarios</h1>
            <Button onClick={handleGoBackToShop} variant="primary boton-panel-control-users" className="mb-3">
                Panel de control
            </Button>
            
       
            <div className="user-list-container d-none d-md-block">
                <ul className="user-list">
                    {users.length === 0 ? (
                        <li>No hay usuarios registrados</li>
                    ) : (
                        users.map((user) => (
                            <li key={user.user_id} className="user-item">
                                <div className="user-info">
                                    <div className="user-details">
                                        <span className="user-name">{user.name} {user.last_name}</span>
                                        <span className="user-email ms-3">{user.email}</span>
                                    </div>
                                    <span className="user-type">
                                        {user.type === 2 ? 'Admin' : 'Usuario'}
                                    </span>
                                </div>
                                <div className="user-action" onClick={() => handleToggleUser(user.user_id)}>
                                    <FontAwesomeIcon 
                                        icon={user.enabled_status === 0 ? faTimesCircle : user.enabled_status === 1 ? faEnvelope : faCheck}
                                        className={`action-icon ${
                                            user.enabled_status === 0 ? 'disabled' : 
                                            user.enabled_status === 1 ? 'email' : 'tick'
                                        }`} 
                                    />
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

        
            <Row className="d-md-none">
                {users.length === 0 ? (
                    <Col>
                        <h5>No hay usuarios registrados</h5>
                    </Col>
                ) : (
                    users.map((user) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={user.user_id} className="mb-4">
                            <Card className="user-card">
                                <Card.Body>
                                    <Card.Title>{user.name} {user.last_name}</Card.Title>
                                    <Card.Text>
                                        <span className="user-email">{user.email}</span>
                                        <br />
                                        <span className="user-type">
                                            {user.type === 2 ? 'Admin' : 'Usuario'}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                                <div className="action-container">
                                    <div className="user-action-bottom" onClick={() => handleToggleUser(user.user_id)}>
                                        <FontAwesomeIcon 
                                            icon={user.enabled_status === 0 ? faTimesCircle : user.enabled_status === 1 ? faEnvelope : faCheck}
                                            className={`action-icon ${
                                                user.enabled_status === 0 ? 'disabled' : 
                                                user.enabled_status === 1 ? 'email' : 'tick'
                                            }`} 
                                        />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};
