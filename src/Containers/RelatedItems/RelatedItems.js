import { Component } from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class RelatedItems extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    handleNameChange = () => {
        const { cookies } = this.props;
        cookies.set('name', 'test', { path: '/', maxAge:3600 });
    }

    render(){
        return(
            <div className="card today_deals">
                <div className="heading_row">
                    <h3 className="title">Related to items you've viewed</h3>
                    <a href="#" className="" onClick={this.handleNameChange}>See more</a>
                </div>
            </div>
        )
    }
}

export default withCookies(RelatedItems);