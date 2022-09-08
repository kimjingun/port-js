import './index.scss';
import Router from '../../router';
import { ACCESS_TOKEN } from '../../constants';

// 첫 번째 요구사항
// 실제 input을 입력하고, 버튼을 클릭 했을 때 input값을 잘 가져오는지 확인
// 1. element 들을 mount 단계에서 잡아온다.
// 2. emailInput, passwordInput를 this에 저장
// 3. 테스트
// hint: lifecycle mount, constructor, 이벤트

// 두 번째 요구사항
// http://localhost:3000/signin 으로 POST 요청을 보내서 응답을 받아낸다.
// 1. button을 클릭 했을 때 fetch 요청을 통해 응답을 받아온다.
// 2. 넘어온 응답값의 accessToken을 localStorage에 저장한다.
// 3. 로그인이 성공하면 (localStorage에 값이 잘 저장 되면) 생략: ranking 페이지로 push한다.
// 4. 실패시 message alert 노출
// hint: fetch, async / await (비동기), if, localStorage
// 싱글턴 패턴 -> 디자인 패턴

class Signin {
  constructor() {
    this.$emailInput = undefined;
    this.$passwordInput = undefined;
    this.$button = undefined;
    this.email = null;
    this.password = null;
    this.router = new Router({});
  }

  mount() {
    this.$emailInput = document.querySelector('.email');
    this.$passwordInput = document.querySelector('.password');
    this.$button = document.querySelector('.button');

    this.$emailInput.addEventListener('input', (e) => {
      this.email = e.target.value;
    });

    this.$passwordInput.addEventListener('input', (e) => {
      this.password = e.target.value;
    });

    this.$button.addEventListener('click', async (e) => {
      e.preventDefault();

      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.accessToken) {
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);
        this.router.init();
      } else {
        alert(data);
      }
    });
  }

  render() {
    return `<div class="signin-container">
              <h1 class="title">로그인</h1>
              <form id="form">
                <input
                  type="email"
                  name="email"
                  class="email"
                  value=""
                  placeholder="이메일을 입력해주세요."
                />
                <input
                  type="password"
                  name="password"
                  class="password"
                  value=""
                  placeholder="비밀번호를 입력해주세요."
                />
                <button class="button">로그인</button>
              </form>
            </div>`;
  }
}

export default Signin;
