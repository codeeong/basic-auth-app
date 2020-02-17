import React, { Component } from 'react';
import Login from './Login.js';
import httpReqHelper from '../helpers/httpReqHelper.js'

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVerified: false
    }
  }

  componentDidMount() {
    this.verifyAccount();
  }

  verifyAccount = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    
    let url = '/api/verify-email';
    const data = {
      email: params.get('email'),
      token: params.get('token')
    }
    const verificationObj = {
      url,
      data,
    };
    httpReqHelper(verificationObj, this.submitSuccess, this.requestFailure);
  }

  submitSuccess = (resp) => {
    if (resp.status === 200 || resp.status === 202) {
        this.setState({
          isVerified: true
        })
    } else {
        this.requestFailure(resp);
    }
  }

  requestFailure = (error) => {
    if (error.response !== undefined) {
      console.log(error.response.data.errors[0].msg)
    }
  }

  render() {

    return (
      <div className="Home-header">
        {this.state.isVerified && 
          <Container maxWidth="m">
            <Typography variant="h3">
              Thank you for verifying your email!
            </Typography>
            <div className="Home-subheader">
              <Typography variant="h4">
                We want to make sure you're the only one here, so please login:
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Login disableHome/>
              </Grid>
            </Grid>
          </Container>
        }
      </div>
    );
  }
}

export default VerifyEmail;
