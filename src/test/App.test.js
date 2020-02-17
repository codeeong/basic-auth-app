import App from '../App';
import { Switch, BrowserRouter, Route } from "react-router-dom";

let component

beforeEach(() => {
  component = shallow(<App />);
})

describe('<App /> rendering', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders router correctly', () => {
    expect(component.find(BrowserRouter).exists()).toBe(true);
    expect(component.find(Switch).exists()).toBe(true);
    expect(component.find(Route).at(0).prop('path')).toEqual('/');
    expect(component.find(Route).at(1).prop('path')).toEqual('/verify-email');
    expect(component.find(Route).at(2).prop('path')).toEqual('/login');
    expect(component.find(Route).at(3).prop('path')).toEqual('/sign-up');
  });
  
});