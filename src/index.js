import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ClientProvider from './Providers/ClientProvider';
import ComposeProvider from './Providers/ComposeProvider';
import LoggedInProvider from './Providers/LoggedInProvider';
import MailboxProvider from './Providers/MailboxProvider';
import ReportProvider from './Providers/ReportProvider';
import ScheduleProvider from './Providers/ScheduleProvider';
import UserProvider from './Providers/UserProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ClientProvider>
        <MailboxProvider>
          <ComposeProvider>
            <LoggedInProvider>
              <ReportProvider>
                <ScheduleProvider>
                    <App />
                </ScheduleProvider>
              </ReportProvider>
            </LoggedInProvider>
        </ComposeProvider>
      </MailboxProvider>
      </ClientProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
