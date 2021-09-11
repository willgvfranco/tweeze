import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

import LeftSidebar from './components/LeftSidebar';
import MinimalLayout from './components/MinimalLayout';
import PresentationLayout from './components/PresentationLayout';
import RequireAuth from './components/RequireAuth';
import RequireVip from 'components/RequireVip';
import Loader from './components/Loader';

import Error404 from './views/errors/404';
import Error500 from './views/errors/500';
import Error505 from './views/errors/505';
import { connect } from 'react-redux';

const Home = lazy(() => import('./views/Home'));
const Landing = lazy(() => import('./views/Landing/index'));
const Blank = lazy(() => import('./views/BlankView'));
const Faq = lazy(() => import('./views/Faq'));
const Pagamento = lazy(() => import('./views/Pagamento'));
const QuemSomos = lazy(() => import('./views/QuemSomos'));
const Noticias = lazy(() => import('./views/Noticias'));
const MinhaConta = lazy(() => import('./views/MinhaConta/index'));
const Informacoes = lazy(() => import('./views/MinhaConta/Informacoes'));
const Seguranca = lazy(() => import('./views/MinhaConta/Seguranca'));
const Financeiro = lazy(() => import('./views/MinhaConta/Financeiro'));
const Grupos = lazy(() => import('./views/Grupos'));

const Login = lazy(() => import('./views/auth/Login'));
const RecuperarSenha = lazy(() => import('./views/auth/RecuperarSenha'));
const Cadastro = lazy(() => import('./views/auth/Cadastro'));

const Routes = ({ loading }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

  const SuspenseLoading = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      let timeout = setTimeout(() => setShow(true), 300);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <Loader isLoading />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  const Conditional = ({ condition, children }) =>
    condition ? (
      <Loader
        isLoading
        style={{ position: 'absolute', top: '45%', left: '50%' }}
      />
    ) : (
      children
    );

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Route exact path={['/']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/" component={Landing} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/home',
                '/blank',
                '/noticias',
                '/minha-conta',
                '/minha-conta/informacoes',
                '/minha-conta/seguranca',
                '/minha-conta/financeiro',
                '/grupos'
              ]}>
              <Conditional condition={loading}>
                <LeftSidebar>
                  <Switch location={location} key={location.pathname}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}>
                      <Route
                        path="/home"
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Home />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/noticias"
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Noticias />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/minha-conta"
                        exact
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <MinhaConta />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/minha-conta/informacoes"
                        exact
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Informacoes />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/minha-conta/seguranca"
                        exact
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Seguranca />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/minha-conta/financeiro"
                        exact
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Financeiro />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/grupos"
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Grupos />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                      <Route
                        path="/blank"
                        render={() => (
                          <RequireAuth>
                            <RequireVip>
                              <Blank />
                            </RequireVip>
                          </RequireAuth>
                        )}
                      />
                    </motion.div>
                  </Switch>
                </LeftSidebar>
              </Conditional>
            </Route>

            <Route
              path={[
                '/login',
                '/cadastro',
                '/recuperar-senha',
                '/error-404',
                '/error-500',
                '/error-505',
                '/quem-somos',
                '/faq',
                '/pagamento'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/login" component={Login} />
                    <Route path="/cadastro" component={Cadastro} />
                    <Route path="/recuperar-senha" component={RecuperarSenha} />
                    <Route path="/error-404" component={Error404} />
                    <Route path="/error-500" component={Error500} />
                    <Route path="/error-505" component={Error505} />
                    <Route path="/quem-somos" component={QuemSomos} />
                    <Route path="/faq" component={Faq} />
                    <Route path="/pagamento" component={Pagamento} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ auth }) => ({ loading: auth.loading });

export default connect(mapStateToProps)(Routes);
