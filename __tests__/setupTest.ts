import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });
global.jestExpect = global.expect;
import util from 'util';
Object.defineProperty(global, 'TextEncoder', {
  value: util.TextEncoder,
});
