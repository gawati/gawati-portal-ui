import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const style = {
  justifyContent: 'center',
  alignItems: 'center',
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  
  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <Card>
            <CardImg style={style} src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png" />
            <CardBody>
              <CardTitle>Sorry something went wrong</CardTitle>
              <CardSubtitle>Please bear with us!</CardSubtitle>
            </CardBody>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }  
}

export default ErrorBoundary