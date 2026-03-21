import {useLocation, useNavigate} from 'react-router';
import {Button} from '@/components/common';

export const GoBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {location.key === 'default' ? (
        <Button className="mb-6" variant="outline" size="medium" onClick={() => navigate('/')}>
          На главную
        </Button>
      ) : (
        <Button className="mb-6" variant="outline" size="medium" onClick={() => navigate(-1)}>
          Назад
        </Button>
      )}
    </>
  );
};
