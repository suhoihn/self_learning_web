import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateScreen = () => {
  const navigate = useNavigate();

  // Check for authToken and re-route accordingly
  useEffect(() => {
    !localStorage.getItem('authToken')?
    navigate('/login') : navigate('/Main')
  }, []);

};

export default PrivateScreen;
