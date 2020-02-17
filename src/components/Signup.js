import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import httpReqHelper from '../helpers/httpReqHelper.js'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      successAlert: false,
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

  signupAccount = async (event) => {
    event.preventDefault();
    const { email, password } = this.state
    let url = '/api/signup';
    const passwordHash = sha256(password)
    const data = {
      email,
      passwordHash
    }
    const signupObj = {
      url,
      data,
    };
    await httpReqHelper(signupObj, this.submitSuccess, this.requestFailure);

  }

  submitSuccess = (resp) => {
    if (resp.status === 200) {
      this.setState({
        errAlert: false,
        successAlert: true
      })
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
      <div className="Signup">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={this.goHome}
          className="homeButton"
          style={{'marginLeft': '75px'}}
        >
          Home
        </Button>
        <Container component="main" maxWidth="xs" className="accountContainer">
          {this.state.successAlert && <Alert severity="success" variant="filled">Verify your email - you should have received an email from us!</Alert>}
          {this.state.errAlert && <Alert severity="error" variant="filled">{this.state.errMessage}</Alert>}
          <br />
          <Typography variant="h4">
            Create Account
          </Typography>
          <form className="login-form" noValidate  onSubmit={this.signupAccount}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              onChange={this.onChange}
              value={this.state.email}              
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
              onChange={this.onChange}
              value={this.state.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-submit"
            >
              Create Account!
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default withRouter(Signup);
