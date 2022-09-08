import { ACCESS_TOKEN, RANKING, SIGN_IN } from '../constants';

// 첫 번째 요구사항
// 라우터 역할을 하는 Class 형태의 객체를 만든다.
// 1. Router class 생성
// 2. pushState, replaceState를 활용한 push, replace 함수 구현
// 3. root/index.html, root/index.js 모듈을 가져와 테스트
// hint: history web API, import / export (모듈), 이벤트

// 두 번째 요구사항
// history를 이동을 했을때, 이동한 페이지를 가져온다.
// 1. 이동한 페이지를 가져올 getPage 함수를 구현
// 2. 현재 this.pages에 pathname를 통해 가져온다.
// hint: find(), location web API, new, getPage()

// 세 번째 요구사항
// 라이프 사이클상 render를 시킨다.
// 1. 컴포넌트의 render 함수를 라우터의 render 함수에 적용시킨다.
// 2. 실제로 index.html에 그려준다.
// hint: index.html, lifecycle, innerHTML

class Router {
  static instance;

  constructor({ pages }) {
    if (Router.instance) {
      return Router.instance;
    }

    this.$root = document.getElementById('root');
    this.pages = pages;
    this.nowPage = null;

    Router.instance = this;
  }

  init() {
    const user = localStorage.getItem(ACCESS_TOKEN);

    if (user) {
      this.push(RANKING);
    } else {
      this.push(SIGN_IN);
    }
  }

  getPage() {
    const { page: Page } = this.pages.find(
      ({ pathname }) => pathname === location.pathname,
    );

    const resultPage = new Page();
    this.nowPage = resultPage;

    return resultPage;
  }

  mount() {
    this.nowPage.mount();
  }

  render() {
    this.$root.innerHTML = this.nowPage.render();
  }

  push(pathname) {
    history.pushState({}, null, pathname);
    this.getPage();
    this.render();
    this.mount();
  }

  replace(pathname) {
    history.replaceState({}, null, pathname);
    this.getPage();
    this.render();
    this.mount();
  }
}

export default Router;
