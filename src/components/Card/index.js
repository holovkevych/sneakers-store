import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded, isFavAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    //setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width="100%"
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img 
                src={(isFavorite || isFavAdded(id)) ? 'img/liked.png' : 'img/unliked.png'} 
                title={(isFavorite || isFavAdded(id)) ? "Видалити з обраних"  : "Додати у вибране"} 
                width={25}     
                alt="like" />
            </div>
          )}
          <img 
            width="100%" 
            src={imageUrl} 
            alt="Sneakers" />
          <h5>{title}</h5>
          <div className={styles.priceBlock}>
            <div className="d-flex flex-column">
              <span>Ціна:</span>
              <b>{price} ₴</b>
            </div>
            {onPlus && (
              <img
                width={30}
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? 'img/filled.png' : 'img/empty.png'}
                title={isItemAdded(id) ? 'Видалити з кошика' : "Додати до кошика"}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
