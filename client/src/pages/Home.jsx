import { Fragment } from 'react';
import Books from '../components/Books';
import UpdateList from '../components/UpdateList';

function Home() {
  return (
    <div className={`home`}>
      <Fragment>
        <Books />
        <UpdateList />
      </Fragment>
    </div>
  );
}

export default Home;