import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

import LeftSidebar from './components/LeftSidebar';
import MinimalLayout from './components/MinimalLayout';
import PresentationLayout from './components/PresentationLayout';

import Error404 from './views/errors/404';
import Error500 from './views/errors/500';
import Error505 from './views/errors/505';

const Home = lazy(() => import('./views/Home'));
const Landing = lazy(() => import('./views/Landing'));
const Blank = lazy(() => import('./views/BlankView'));
const Noticias = lazy(() => import('./views/Noticias'));
const MinhaConta = lazy(() => import('./views/MinhaConta'));
const Grupos = lazy(() => import('./views/Grupos'));

const Login = lazy(() => import('./views/auth/Login'));
const RecuperarSenha = lazy(() => import('./views/auth/RecuperarSenha'));
const Cadastro = lazy(() => import('./views/auth/Cadastro'));

const Routes = () => {
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
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load the live preview examples
                  <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Redirect exact from="/" to="/landing" />
            <Route path={['/landing']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/landing" component={Landing} />
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
                '/grupos'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/home" component={Home} />
                    <Route path="/noticias" component={Noticias} />
                    <Route path="/minha-conta" component={MinhaConta} />
                    <Route path="/grupos" component={Grupos} />
                    <Route path="/blank" component={Blank} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>

            <Route
              path={[
                '/login',
                '/cadastro',
                '/recuperar-senha',
                '/error-404',
                '/error-500',
                '/error-505'
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

export default Routes;
