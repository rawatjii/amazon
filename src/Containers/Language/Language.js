import { Component } from 'react';
import flag from '../../assets/icons/ind-flag.svg';
import './Language.css'

const langs = {
    EN:'English',
    HI:'हिंदी',
    TA:'தமிழ்',
    TE:'తెలుగు',
    KN:'ಕನ್ನಡ',
    ML:'മലയാളം',
    BN:'বাংলা',
    MR:'मराठी',
}

class Language extends Component{

    state={
        activeLang:'en'
    }

    render(){
        return(
            <div className='language_menu'>
                <div className='main dropdown_menu'>
                    <img src={flag} className='flag' />
                    {this.state.activeLang}
                </div>
                <div className='dropdown_items'>
                    <ul>
                        <li className=''>English - EN</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Language;