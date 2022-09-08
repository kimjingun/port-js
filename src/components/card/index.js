import './index.scss';
import star from '../../../assets/star.svg';

// 첫 번째 요구사항
// render시 가져온 데이터를 그려준다.
// 1. this에 바인딩 되어있는 데이터를 render에 템플릿 리터럴 방식으로 넣어준다.
// 2. rank의 경우 1, 2, 3 등의 메달을 표현해주는 renderRank 함수를 만든다.
// hint: switch, 삼항 연산자
// 🥇 🥈 🥉

class Card {
  constructor({ rank, grade, thumbnail, price, name }) {
    this.rank = rank;
    this.grade = grade;
    this.thumbnail = thumbnail;
    this.price = price;
    this.name = name;
  }

  renderRank() {
    switch (this.rank) {
      case 1: {
        return '🥇';
      }
      case 2: {
        return '🥈';
      }
      case 3: {
        return '🥉';
      }
      default: {
        return null;
      }
    }
  }

  mount() {}

  render() {
    return `<article class="card">
              ${
                this.rank < 4
                  ? `<span class="rank">${this.renderRank()}</span>`
                  : ''
              }
              <div class="thumbnail-container">
                <img src="${this.thumbnail}" alt=""/>
              </div>
              <h3 class="name">${this.name}</h3>
              <strong class="price">${this.price}원</strong>
              <div class="grade-container">
                <img src="${star}" alt="star">
                <span class="grade">${this.grade}</span>
              </div>
            </article>`;
  }
}

export default Card;
