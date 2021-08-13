import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ArticleList from './pages/ArticleList';
import ArticleView from './pages/ArticleView';
import Contribution from './pages/Contribution';
import ContributionUpdate from './pages/ContributionUpdate';
import MyPage from './pages/MyPage';
import Subscription from './pages/Subscription';
import Visual from './pages/Visual';
import AuthMail from './components/AuthMail';
import AuthTest from './components/AuthTest';
import Loading from './pages/Loading';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/articlelist" component={ArticleList} />
          <Route path="/article" component={ArticleView} />
          <Route path="/contributionupdate" component={ContributionUpdate} />
          <Route path="/contribution" component={Contribution} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/subscribe" component={Subscription} />
          <Route path="/visual" component={Visual} />
          <Route path="/authmail/:email" component={AuthMail} />
          <Route path="/authtest" component={AuthTest} />
          <Route path="/loading" component={Loading} />
          <Route path="/error" component={Error} />
        </Switch>
      </div>
      <Footer />
      {/* </Suspense> */}
    </Router>
  );
}

export default App;
