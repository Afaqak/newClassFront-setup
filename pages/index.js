import Head from 'next/head';
import { useRouter } from 'next/router';
import Main from '../components/main';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { useSelector } from 'react-redux';
import SignIn from '../components/login';
export default function Home() {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <AnimatePresence key={user ? 'main' : 'SignIn'}>
        <Head>
          <title>ClassRoom</title>
          <meta
            name='description'
            content='Generated by create next app'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <link
            rel='icon'
            href='/favicon.ico'
          />
        </Head>
        <>
          <main
            className=' 
          min-h-screen flex flex-col-reverse sm:flex-col lg:flex-row dark:bg-gray-900 overflow-x-hidden
  '
          >
            {user ? (
              <Main />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SignIn />
              </motion.div>
            )}
          </main>
        </>
      </AnimatePresence>
    </>
  );
}
