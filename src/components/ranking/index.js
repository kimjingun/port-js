import './index.scss';
import Card from '../card';
import Header from '../header';

// 첫 번째 요구사항
// 생성한 카드 컴포넌트를 반복하는 renderCard 함수 구현
// 1. 총 8번 반복하도록 임의의 배열 필드 (this.cards) 만들기
// 2. render 함수 내부에 템플릿 리터럴 문법을 활용하여 renderCard 함수를 실행
// hint: Array(), fill(), map(), join() Array 메소드를 활용해서 구현
// 단, 힌트 우선이 아니라 본인의 생각대로 선 구현 후 도저히 모르겠을때 힌트 참고!

// 두 번째 요구사항
// products 데이터를 가져올 getProducts 비동기 함수 구현
// 1. http://localhost:8080/products API를 GET 요청으로 가져오기
// 2. 테스트 해보기
// hint: try-catch / async-await / lifecycle

// 세 번째 요구사항
// this.cards에 담긴 데이터를 Card 컴포넌트에 넘겨준다.
// 1. Card 컴포넌트 데이터를 넘겨준다.
// 2. Card 컴포넌트 에서 constructor를 활용하여 데이터를 받아온다.
// hint: map(), new Card(여기), ({}), Card contstuctor

// 네 번째 요구사항
// 필터링을 위한 filter 함수를 구현
// 1. filter 엘리먼트 내부의 있는 자식을 클릭했을 때 해당 data-value가 알맞게 출력되도록 구현
// 2. 잘 출력 되는지 테스트
// hint: 이벤트 위임, lifeCycle 고려한 개발 및 테스트

// 다섯 번째 요구사항
// filter 된 data를 실질적으로 API 요청을 한다.
// 1. this.sort 필드를 만든다.
// 2. filter시 getProducts를 요청할 때 포함해서 요청하게 만든다.
// 3. 그 데이터가 필터링 된 데이터인지 확인한다.

// 여섯 번째 요구사항
// 최초에 가져온 데이터 뿐만 아니라, 필터링된 데이터의 렌더링도 함께 만족하는 함수를 구현한다.
// 1. reRender() 함수를 구현
// 2. 최초 가져온 데이터를 렌더링 한다.
// 3. 필터링 했을 때 데이터를 렌더링 한다.
// 4. 가져온 데이터가 온전하다면, 컨테이너에 다시 렌더링 한다.
// hint: mount innerHTML

// 일곱 번째 요구사항
// 헤더 컴포넌트를 적용한다.
// 1. 분리한 컴포넌트를 가져와서 그려준다.
// hint: Header 컴포넌트, this, render()

class Ranking {
  constructor() {
    this.$container = undefined;
    this.$filter = undefined;
    this.cards = [];
    this.sort = '';
    this.header = new Header();
  }

  reRender(products) {
    if (products) {
      this.cards = products;

      this.$container.innerHTML = this.renderCard();
    }
  }

  filter() {
    this.$filter.addEventListener('click', async (e) => {
      this.sort = e.target.dataset.value;
      const products = await this.getProducts();
      this.reRender(products);
    });
  }

  async getProducts() {
    try {
      const response = await fetch(
        `http://localhost:8080/products?_sort=${this.sort}`,
      );
      const data = await response.json();

      return data;
    } catch (error) {
      alert(error);
    }
  }

  renderCard() {
    return this.cards
      .map(({ rank, grade, thumbnail, price, name }) =>
        new Card({ rank, grade, thumbnail, price, name }).render(),
      )
      .join('');
  }

  async mount() {
    this.$container = document.querySelector('.container');
    this.$filter = document.querySelector('.filter');
    this.header.mount();

    const products = await this.getProducts();

    this.reRender(products);
    this.filter();
  }

  render() {
    return `
        ${this.header.render()}
        <section class="ranking-wrapper">
          <h1 class="title">BEST Ranking 🏆</h1>
            <div class="filter">
              <span data-value="rank">랭킹순</span>
              <span data-value="price">가격순</span>
              <span data-value="grade">평점순</span>
            </div>
            <section class="container"></section>
        </section>
        `;
  }
}

export default Ranking;
