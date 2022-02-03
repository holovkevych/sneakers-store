import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={60} height={40} src="img/logo_nike.svg" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">Like Nike</h3>
            <p className="opacity-5">Best nike sneakers</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={25} height={25} src="img/cart.svg" alt="Кошик" />
          <span><b>{totalPrice} ₴</b></span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={25} height={25} src="img/heart.svg" alt="Вибрані" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={25} height={25} src="img/user.svg" alt="Користувач" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;