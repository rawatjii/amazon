import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import flag from '../../assets/icons/ind-flag.svg';
import './Language.css'

const langs = [
    'English - EN',
    'हिंदी - HI',
    'தமிழ் - TA',
    'తెలుగు - TE',
    'ಕನ್ನಡ - KN',
    'മലയാളം - ML',
    'বাংলা - BN',
    'मराठी - MR',
];

class Backdrop extends Component{

    state={
        show:false
    }

    render(){
        return(
            <div className={`backdrop ${this.props.className}`}></div>
        );
    }
}

class Language extends Component{

    state={
        activeLang:'EN',
        show:false,
    }

    changeLang = (e)=>{
        this.setState({
            show:false,
            activeLang:e.target.innerHTML.split(' - ')[1]
        })
    }

    showDropdown = () => {
        this.setState({show:true})
    }

    hideDropdown = () => {
        this.setState({show:false})
    }

    render(){
        return(
            <>
                <div className='header_item language_menu dropdown_menu' onMouseEnter={this.showDropdown} onMouseLeave={this.hideDropdown}>
                    <div className='main'>
                        <img src={flag} className='flag' />
                        {this.state.activeLang}
                    </div>
                    <div className={`dropdown_items location_dropdown ${this.state.show ? 'active' : ''}`}>
                        {
                            langs.map((item)=>{
                                // console.log('item',item.split('-')[1], this.state.activeLang.trim());
                                if(item.split(' - ')[1] === this.state.activeLang){
                                    return <li className='active' key='active'>{item}</li>
                                }
                            })
                        }
                        
                        {langs.map((item, key)=>{
                            if(item.split(' - ')[1] !== this.state.activeLang){
                                return <li className='' key={key} onClick={this.changeLang}>{item}</li>;
                            }
                        })}
                    </div>
                </div>
                {ReactDOM.createPortal(
                    this.state.show ? <Backdrop className={this.state.show ? 'show':''}/> : null, 
                    document.getElementById('backdrop'))
                }
            </>
        )
    }
}

export default Language;