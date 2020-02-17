import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import httpReqHelper from '../helpers/httpReqHelper.js'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errAlert: false,
      errMessage: ''
    }
  }

  goHome = () => {
    let path = `/`;
    this.props.history.push(path);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  loginAccount = async (event) => {
    event.preventDefault();
    const { email, password } = this.state
    let url = '/api/login';
    const passwordHash = sha256(password)
    const data = {
      email,
      passwordHash
    }
    const loginObj = {
      url,
      data,
    };
    await httpReqHelper(loginObj, this.submitSuccess, this.requestFailure);
  }

  submitSuccess = (resp) => {
    if (resp.status === 200) {
      this.goHome()
    } else {
      this.requestFailure(resp);
    }
  }

  requestFailure = (error) => {
    this.setState({
      errAlert: true,
      errMessage: error.response.data.errors[0].msg
    })  
  }

  render() {

    return (
      <div className="Login">
        {!this.props.disableHome && 
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={this.goHome}
            className="homeButton"
            style={{ 'marginLeft': '75px' }}
          >
            Home
          </Button>
        }
        <Container component="main" maxWidth="xs" className="accountContainer">
          {this.state.errAlert && <Alert severity="error">{this.state.errMessage}</Alert>}
          <br />
          <Typography variant="h4">
            Login
          </Typography>
          <form className="login-form" onSubmit={this.loginAccount}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.onChange}
              value={this.state.password}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="../sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
