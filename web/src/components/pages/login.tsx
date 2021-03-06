import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserClient } from '../../../../common/user-clients';
import URLS from '../../urls';
import { Notifications } from '../../stores/notifications';
import StateTree from '../../stores/tree';

interface NotificationProps {
  addNotification: typeof Notifications.actions.add;
}

export const LoginFailure = connect<void, NotificationProps>(
  null,
  {
    addNotification: Notifications.actions.add,
  }
)(
  withRouter(
    class extends React.Component<
      NotificationProps & RouteComponentProps<any>
    > {
      componentDidMount() {
        const { addNotification, history } = this.props;
        addNotification('Login failed!');
        history.replace(URLS.ROOT);
      }

      render(): React.ReactNode {
        return null;
      }
    }
  )
);

interface PropsFromState {
  account: UserClient;
}

type Props = PropsFromState & RouteComponentProps<any>;

export const LoginSuccess = connect<PropsFromState>(({ user }: StateTree) => ({
  account: user.account,
}))(
  withRouter(
    class extends React.Component<Props> {
      componentDidMount() {
        this.redirect(this.props);
      }

      componentDidUpdate(props: Props) {
        this.redirect(props);
      }

      redirect({ account, history }: Props) {
        history.replace(account ? URLS.ROOT : URLS.PROFILE_INFO);
      }

      render(): React.ReactNode {
        return null;
      }
    }
  )
);
