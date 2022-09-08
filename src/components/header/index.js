import './index.scss';

import Router from '../../router';
import { ACCESS_TOKEN } from '../../constants';

// 첫 번째 요구사항
// 헤더 컴포넌트를 만든다.
// 1. lifecycle 단계를 전부 가진 컴포넌트로 만든다.
// 2. 현재 랭킹에 있는 헤더 컴포넌트를 가져온다.
// hint: <nav> element, lifecycle

// 두 번째 요구사항
// 로그아웃 버튼을 동작하게 만든다.
// 1. 로그아웃 버튼을 클릭했을 때 이벤트가 출력된다.
// hint: 랭킹 컴포넌트, lifecycle, 테스트

// 세 번째 요구사항
// 로그아웃 버튼을 클릭 했을 때 accessToken을 삭제하고 로그인 페이지로 이동시킨다.
// 1. 로그인 여부를 확인한다.
// 2. 로그인 상태면 (accessToken이 있다면) 로그인을 취소
// 3. router를 통해 signin 으로 이동 시킨다.
// hint: localStorage.getItem(''), router, if

class Header {
  constructor() {
    this.$button = undefined;
    this.router = new Router({});
  }

  mount() {
    this.$button = document.querySelector('.signout-button');

    this.$button.addEventListener('click', () => {
      const isLoggedIn = localStorage.getItem(ACCESS_TOKEN);

      if (isLoggedIn) {
        localStorage.removeItem(ACCESS_TOKEN);
        this.router.init();
      } else {
        // TODO: 로그아웃이 안되는 상황
      }
    });
  }

  render() {
    return `
        <nav class="nav-container">
            <button class="signout-button">로그아웃</button>
        </nav>
      `;
  }
}

export default Header;
