import Login from '../../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

let component, historyMock

beforeEach(() => {
  historyMock = { push: jest.fn() }
  component = mount(
    <Router>
      <Login
        history={historyMock} />
    </Router>
  );
})

describe('Login component rendering', () => {
  it('renders component divs and buttons correctly', () => {
    expect(component.find('button').at(0).find('span').at(0).text()).toEqual('Home');
    expect(component.find('h4').at(0).at(0).text()).toEqual('Login');
    expect(component.find('button').at(1).find('span').at(0).text()).toEqual('Sign In');
  });

  it('renders link to signup component correctly', () => {
    expect(component.find('a').text()).toEqual('Don\'t have an account? Sign Up');
    expect(component.find('a').prop('href')).toEqual('../sign-up');
  });

});