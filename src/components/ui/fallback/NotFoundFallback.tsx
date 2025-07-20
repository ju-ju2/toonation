import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '../button/Button';
import Text from '../text/Text';
import style from './fallback.module.scss';

const cx = classNames.bind(style);

const NotFoundFallback = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <img
        className={cx('img')}
        src="https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/main/toonation/images/hos.gif?v=2"
        alt="로딩 중"
      />
      <Text
        className={cx('title')}
        as="h1"
        label="404 Not Found"
        type="headlineBold"
      />
      <Text
        className={cx('text')}
        as="h2"
        label="찾으시는 페이지의 주소가 잘못 입력되었거나,주소가 변경 또는 삭제되어 찾을 수 없습니다. 원하시는 페이지를 찾으시려면 주소를 다시 확인해주세요."
        type="titleSemiBold"
      />
      <Button
        className={cx('button')}
        label={{ label: '홈으로 돌아가기' }}
        onClick={handleHomeClick}
      />
    </div>
  );
};

export default NotFoundFallback;

// 페이지 로딩
// https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/main/toonation/images/hos.gif?v=2
