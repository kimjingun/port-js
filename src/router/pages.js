import Signin from '../components/signin';
import Ranking from '../components/ranking';
import { RANKING, SIGN_IN } from '../constants';

const pages = [
  {
    pathname: SIGN_IN,
    page: Signin,
  },
  {
    pathname: RANKING,
    page: Ranking,
  },
];

export default pages;
