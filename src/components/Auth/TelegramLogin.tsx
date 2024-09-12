import { Component } from 'react';
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';
import { connect } from 'react-redux'; 
import { telegramAuthorized } from '../../redux/Auth/operations';


interface Props {
  telegramAuthorized: (user: any) => void;
}

class TelegramLogin extends Component<Props> {
  render() {
    return (
      <TLoginButton
        botName="FriendsRateFRT_bot"
        buttonSize={TLoginButtonSize.Large}
        lang="en"
        usePic={true}
        cornerRadius={30}
        onAuthCallback={(user: any) => {
          console.log('Hello, user!', user);
          this.props.telegramAuthorized(user);
        }}
        requestAccess={'write'}
        additionalClassNames={'css-class-for-wrapper'}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  telegramAuthorized: (user: any) => dispatch(telegramAuthorized(user))
  
});

export default connect(null, mapDispatchToProps)(TelegramLogin);