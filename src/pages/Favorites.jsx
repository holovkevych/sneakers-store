import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
  const { favorites, onRemoveFav } = React.useContext(AppContext);
  //const { favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Вибране</h1>
      </div>

      { favorites.length
        ? (<div className="favorites--items">
            {favorites.map((item, index) => (
              <Card 
                key={item.id} 
                favorited={true} 
                onFavorite={() => onRemoveFav(item.id)} 
                {...item} />
            ))}
          </div>)
        : <div className="mt-50">
            <h2 className="d-flex justify-center">Вибраних нема :(</h2>
            <p className="d-flex justify-center">Ви ще нічого не додали до обраних</p>
          </div>
      } 
    </div>
  );
}

export default Favorites;
