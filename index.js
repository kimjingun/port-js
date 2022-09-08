import './index.scss';
import Router from './src/router';
import pages from './src/router/pages';

const router = new Router({ pages });

router.init();
