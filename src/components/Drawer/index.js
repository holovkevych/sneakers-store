import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const drawerRef = React.useRef(null)

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://61e98e607bc0550017bc637c.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://61e98e607bc0550017bc637c.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Помилка під час створення замовлення :(');
    }
    setIsLoading(false);
  };

  
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Кошик <img onClick={onClose} className="cu-p" src="img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 
          ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} ₴</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    title='Видалити з кошика'
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>До сплати:</span>
                  <div></div>
                  <b>{totalPrice} ₴</b>
                </li>
                <li>
                  <span>В т.ч. ПДВ:</span>
                  <div></div>
                  <b>{Math.ceil(totalPrice * 0.20)} ₴</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформити замовлення <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) 
        : (
          <Info
            title={isOrderComplete ? 'Замовлення оформлено!' : 'Кошик порожній'}
            description={
              isOrderComplete
                ? `Ваше замовлення #${orderId} незабаром буде передано кур'єрській доставці`
                : 'Додайте хоча б одну пару кросівок, щоб зробити замовлення.'
            }
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
