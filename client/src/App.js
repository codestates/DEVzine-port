import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
const Landing = lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import('./pages/Landing')), 1500),
    ),
);
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
const ArticleList = lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import('./pages/ArticleList')), 1500),
    ),
);
import ArticleView from './pages/ArticleView';
import Contribution from './pages/Contribution';
import ContributionUpdate from './pages/ContributionUpdate';
const ContributionList = lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import('./pages/ContributionList')), 1500),
    ),
);
import MyPage from './pages/MyPage';
import Subscription from './pages/Subscription';

const Visual = lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import('./pages/Visual')), 1500),
    ),
);

import AuthMail from './components/Email/AuthMail';
import Unsubscribe from './components/Email/Unsubscribe';
import Error from './components/Common/Error/Error';
import Loading from './components/Common/Loading/Loading';
import Admin from './pages/Admin';
import FAQ from './pages/FAQ';
import Password from './pages/Password';

function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/articlelist">
            <ArticleList />
          </Route>
          <Route path="/article/:id">
            <ArticleView />
          </Route>
          <Route path="/contributionupdate/:id">
            <ContributionUpdate />
          </Route>
          <Route path="/contribution">
            <Contribution />
          </Route>
          <Route path="/contributionlist">
            <ContributionList />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route path="/subscribe">
            <Subscription />
          </Route>
          <Route path="/visual">
            <Visual />
          </Route>
          <Route path="/authmail/:email">
            <AuthMail />
          </Route>
          <Route path="/unsubscribe/:email">
            <Unsubscribe />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/password">
            <Password />
          </Route>

          {/* 잘못된 url 정규식을 방문했을 때 */}
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
