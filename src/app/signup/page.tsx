'use client';
import React, { useState } from 'react';
import './signup.css';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch } from '../../redux/store';
import { signupUser } from '../../redux/auth/asyncActions';
import { useSelector } from 'react-redux';
import { selectAuthLoading, selectAuthError } from '../../redux/auth/selectors';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Пароли не совпадают');
    }

    const resultAction = await dispatch(signupUser({ email, password, username }));

    if (signupUser.fulfilled.match(resultAction)) {
      router.push('/signin');
    }
  };

  console.log(error)

  return (
    <div className="wrapper">
      <div className="container-signup">
        <div className="modal__block">
          <form className="modal__form-login" onSubmit={handleSignup}>
            <Link href="/">
              <div className="modal__logo">
                <Image width={100} height={15} src="/logo_modal.png" alt="logo" />
              </div>
            </Link>
            <input
              className="modal__input login"
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
              className="modal__input password-first"
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="modal__input password-double"
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="modal__btn-signup-ent" disabled={loading}>
              {loading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
            {error && <p className="message">{error}</p>}
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;
