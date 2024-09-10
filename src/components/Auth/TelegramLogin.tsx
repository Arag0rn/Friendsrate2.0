
import { Component } from 'react';
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';

export class TelegramLogin extends Component {
  render() {
    return (
      <TLoginButton
        botName="FriendsRateFRT_bot"
        buttonSize={TLoginButtonSize.Large}
        lang="en"
        usePic={false}
        cornerRadius={20}
        onAuthCallback={(user: any) => {
          console.log('Hello, user!', user);
        }}
        requestAccess={'write'}
        additionalClassNames={'css-class-for-wrapper'}
      />
    );
  }
}