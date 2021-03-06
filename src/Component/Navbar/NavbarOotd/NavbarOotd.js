/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './NavbarOotd.scss';
import { withRouter } from 'react-router-dom';

class NavbarOotd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOotdBorder: true,
      isStoreBorder: false,
      isListOotdBorder: true,
    }
  }
  handleClickOotd = (e) => {
      this.setState({
        isOotdBorder: true,
        isStoreBorder: false,
      })
      this.props.history.push('/ootd');
  }

  handleClickStore = (e) => {
      this.setState({
        isOotdBorder: false,
        isStoreBorder: true,
      })
      this.props.history.push('/');

  }

  render() {
    const { isOotdBorder, isStoreBorder, isListOotdBorder } = this.state;
    return (
      <>
      <div className="navBarWrapper">
        <nav className="topNavBar">
          <div className="leftNavBar">
            <a className="navLogo" href="/">
              <img src='/images/navLogo.png' />
            </a>
            <div className="leftMenuWrapper">
              <ul className="leftMenuList">
                <li value="feed"
                    className="leftMenu">
                  <span  className={isOotdBorder ? "leftMenuOotdAct":"leftMenuOotd"} onClick={this.handleClickOotd}>#OOTD</span>
                </li>
                <li value="feed"
                    className="leftMenu">
                  <span className={isStoreBorder ? "leftMenuStoreAct":"leftMenuStore"} onClick={this.handleClickStore}>STORE</span>
                </li>
              </ul>
            </div>
          </div>

          <form className="searchBar">
            <input
            id="search-keyword"
            name="keyword"
            type="search"
            placeholder="스타일과 상품을 검색해보세요"
            
             />
          </form>

          <div className="rightNavBar">
            <div className="rightMenuWrapper">
              <ul className="rightMenuList">
                <li>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.377 10.573a7.63 7.63 0 0 1-.383-2.38V6.195a5.115 5.115 0 0 0-1.268-3.446 5.138 5.138 0 0 0-3.242-1.722c-.694-.072-1.4 0-2.07.227-.67.215-1.28.574-1.794 1.053a4.923 4.923 0 0 0-1.208 1.675 5.067 5.067 0 0 0-.431 2.022v2.2a7.61 7.61 0 0 1-.383 2.37L2 12.343l.479.658h3.505c0 .526.215 1.04.586 1.412.37.37.885.586 1.412.586.526 0 1.04-.215 1.411-.586s.587-.886.587-1.412h3.505l.478-.658-.586-1.77zm-4.69 3.147a.997.997 0 0 1-.705.299.997.997 0 0 1-.706-.3.997.997 0 0 1-.3-.705h1.999a.939.939 0 0 1-.287.706zm-5.515-1.71l.371-1.114a8.633 8.633 0 0 0 .443-2.691V6.004c0-.563.12-1.113.347-1.616.227-.514.55-.969.969-1.34.419-.382.91-.67 1.436-.837.538-.18 1.1-.24 1.65-.18a4.147 4.147 0 0 1 2.597 1.4 4.133 4.133 0 0 1 1.004 2.776v2.01c0 .909.144 1.818.443 2.691l.371 1.113h-9.63v-.012z"></path></svg>
                </li>
                <li>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z" clip-rule="evenodd"></path><path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"></path></svg>
                  <span className="cartListLength">1</span>
                </li>  
                <li>
                    <img src="https://usercontents-c.styleshare.io/images/40280091/30x30" />
                </li>
              </ul>
            </div>
          </div>

        </nav>
        <nav className="bottomNavBar">
          <ul className="categories">
            <li>Hot</li>
            <li className={isListOotdBorder ? "isListOotdBorder":""}>OOTD</li>
            <li>Beauty</li>
            <li>New</li>
            <li>QnA</li>
            <li>Following</li>
          </ul>
        </nav>
      </div>
    </>

    );
  }
}

export default withRouter(NavbarOotd);