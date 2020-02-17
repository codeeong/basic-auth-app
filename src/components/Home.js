import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import httpReqHelper from '../helpers/httpReqHelper.js'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import babyYoda from '../babyyoda.png'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currUser: '',
      errAlert: false,
      errMessage: ''
    }
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession = async () => {
    let url = '/check-session';
    const method = 'get'
    const sessObj = {
      url,
      method,
    };
    await httpReqHelper(sessObj, this.sessionSuccess, this.requestFailure);
  }

  logout = async () => {
    let url = '/logout';
    const method = 'get'
    const sessObj = {
      url,
      method,
    };
    await httpReqHelper(sessObj, this.sessionSuccess, this.requestFailure);    
  }

  sessionSuccess = (resp) => {
    if (resp.status === 200) {
      const data = resp.data
      this.setState({
        isLoggedIn: data.isLoggedIn,
        currUser: data.isLoggedIn ? data.user.split('@')[0] : ''
      })
    } else {
      this.requestFailure(resp);
    }
  }

  requestFailure = (error) => {
    if (error.response !== undefined) {
      this.setState({
        errAlert: true,
        errMessage: error.response.data.errors[0].msg
      }) 
    }
  }

  goToLogin = () => {
    let path = `login`;
    this.props.history.push(path);
  }

  goToSignup = () => {
    let path = `sign-up`;
    this.props.history.push(path);
  }

  render() {

    return (
      <div className="Home-header">
        <Container maxWidth="md">
          {this.state.errAlert && <Alert severity="error">{this.state.errMessage}</Alert>}
          <Typography variant="h3">
            Welcome to Codee Ong's Bambu Coding Challenge:
          </Typography>
          <div className="Home-subheader">
            <Typography variant="h4">
              Authentication forces be with you
            </Typography>
          </div>
            {this.state.isLoggedIn &&
              <div>
                <Typography variant="h4">
                  May the force be with you, {this.state.currUser}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={this.logout}
                >
                  Logout!
                </Button>
              </div> 
            }
            {!this.state.isLoggedIn &&
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={this.goToLogin}
                  >
                    Login Here!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={this.goToSignup}
                  >
                    Sign Up Here!
                  </Button>
                </Grid>
              </Grid>
            }
          <div className="babyYodas">
            <img src={babyYoda} className="baby" alt="babyYoda"></img>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Home);
