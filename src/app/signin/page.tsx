'use client'

import React, { useState, useEffect } from 'react';
import './siginin.css';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/auth/asyncActions';
import { useSelector } from 'react-redux';
import { selectAuthLoading, selectAuthError, selectIsLoggedIn } from '../../redux/auth/selectors';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
  
  console.log(error)
  return (
    <div className="wrapper">
      <div className="container-enter">
        <div className="modal__block">
          <form className="modal__form-login" onSubmit={handleSignIn}>
            <Link href="/">
              <div className="modal__logo">
                <Image width={100} height={15} src="/logo_modal.png" alt="logo" />
              </div>
            </Link>
            <input
              className="modal__input login"
              type="email"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="modal__input password"
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="modal__btn-enter" disabled={loading}>
               Войти
            </button>
            <Link href="/signup">
              <button type="button" className="modal__btn-signup">
                Зарегистрироваться
              </button>
            </Link>
            {error && <p className="message">{error}</p>}
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignInPage;
