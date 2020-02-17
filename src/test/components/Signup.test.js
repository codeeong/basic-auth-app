import Signup from '../../components/Signup';
import { BrowserRouter as Router } from 'react-router-dom';

let component, historyMock

beforeEach(async () => {
  historyMock = { push: jest.fn() }
  component = mount(
    <Router>
      <Signup
        history={historyMock} />
    </Router>
  );
})

it('renders component divs and buttons correctly', () => {
  expect(component.find('button').at(0).find('span').at(0).text()).toEqual('Home');
  expect(component.find('h4').at(0).at(0).text()).toEqual('Create Account');
  expect(component.find('button').at(1).find('span').at(0).text()).toEqual('Create Account!');
});


