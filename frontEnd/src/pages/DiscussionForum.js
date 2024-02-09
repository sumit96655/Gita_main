import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function DiscussionForum() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/layout/content');
  }, [navigate]);

  // Render any additional content or return null
  return null;
}

export default DiscussionForum;
