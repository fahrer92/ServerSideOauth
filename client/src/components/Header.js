import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Header extends Component{

  renderContent(){
    switch(this.props.auth){

      case null:
        return;
      case false:
        return (
        <div>
          <li>
            <a href = "/auth/google"> Login With Google </a>
          </li>
          <li>
            <a href = "/auth/facebook"> Login With Facebook </a>
          </li>
        </div>
        )
      default:
      return <li>
        <a href ="/api/logout"> Logout</a>
        </li>


    }

  }
  render(){
      console.log(this.props);

    return (

      <div>
        <nav>
          <div className ="nav-wrapper">
            <Link
             to = {this.props.auth ? "/surveys" : '/'}
             className = "left brand-logo"
             >
            Emaily
            </Link>
            <ul className ="right" >
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    )


  }

}

function mapStateToProps({auth}){
  return { auth}
}
export default connect(mapStateToProps)(Header);
