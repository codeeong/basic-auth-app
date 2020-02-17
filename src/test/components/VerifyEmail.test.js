import VerifyEmail from '../../components/VerifyEmail';

let component, httpCall

beforeEach(() => {
  component = shallow(<VerifyEmail />);
  httpCall = jest.mock('../../helpers/httpReqHelper.js', () => {
    return jest.fn().mockImplementation(() => {
      const resp = { 
        status: 200,
        data: {
          isVerified: false
        }
      };
      return resp;
    });
  });
});

afterEach(done => {
  done()
})

it('does not render content if not verified yet', () => {
  expect(component.exists()).toBe(true);
  expect(component.find('div').hasClass('Home-header')).toBe(true)
  expect(component.find('div').hasClass('Home-subheader')).toBe(false)
});

it('renders text if verified', () => {
  component.setState({ isVerified: true })
  component.update()
  expect(component.find('div').at(0).hasClass('Home-header')).toBe(true)
  expect(component.find('div').at(1).hasClass('Home-subheader')).toBe(true)
  expect(component.find('div').at(1).text()).toEqual('We want to make sure you\'re the only one here, so please login:')
  expect(component.find('withRouter(Login)').prop('disableHome')).toBe(true)
});
