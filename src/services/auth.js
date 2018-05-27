import GoTrue from 'gotrue-js';
import get from 'lodash/get';

class Auth {
  constructor() {
    this.auth = new GoTrue({
      APIUrl: 'https://dericcain.com/.netlify/identity',
    });
  }

  async login(email, password) {
    const { token } = await this.auth.login(email, password, true);
    return !!token;
  }

  async check() {
    try {
      const user = await this.auth.currentUser();
      const email = get(user, 'email');
      return !!user  && email === 'deric.cain@gmail.com';
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  wrap({ component: Component }) {
    this.check().then(isLoggedIn => {
      if (!isLoggedIn) {

      }

      return (<Component />)
    })
  }

}

export default new Auth();


