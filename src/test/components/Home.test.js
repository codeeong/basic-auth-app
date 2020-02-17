import Home from '../../components/Home';
import { BrowserRouter as Router } from 'react-router-dom';

let component, historyMock

beforeEach(() => {
  historyMock = { push: jest.fn() }
  component = mount(
    <Router>
      <Home
        history={historyMock} />
    </Router>
  );

  jest.mock('../../helpers/httpReqHelper.js', () => {
    return jest.fn().mockImplementation(() => {
      const resp = { 
        status: 200,
        data: {
          isLoggedIn: false
        }
      };
      return resp;
    });
  });
})

afterAll(done => {
  done()
})

it('renders banner and buttons', () => {
  expect(component.find('h3').text()).toEqual('Welcome to Codee Ong\'s Bambu Coding Challenge:');
  expect(component.find('button').at(0).find('span').at(0).text()).toEqual('Login Here!');
  expect(component.find('button').at(1).find('span').at(0).text()).toEqual('Sign Up Here!');
});
