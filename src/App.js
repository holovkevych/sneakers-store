import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Slider from './components/Slider';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const url = 'https://61e98e607bc0550017bc637c.mockapi.io'

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get(`${url}/cart`),
          axios.get(`${url}/favorites`),
          axios.get(`${url}/items`),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Помилка при запиті даних ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`${url}/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`${url}/cart`, obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Помилка при додаванні до кошика');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${url}/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Помилка при видаленні з кошика');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`${url}/favorites/${findItem.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post(`${url}/favorites`, obj);
        setFavorites((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Помилка при додаванні до обраних');
      console.error(error);
    }
  };

  const onRemoveFav = (id) => {
    try {
      axios.delete(`${url}/favorites/${id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Помилка при видаленні з вибраних');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isFavAdded = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isFavAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
        onRemoveFav,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
