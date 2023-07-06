import { Component } from "react";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

class Search extends Component{

    state={
        age:''
    }

    handleChange=(event)=>{
        this.setState({
            age:event.target.value
        })
    }

    render(){
        return(
            <div className='header_item search_card'>
                <FormControl className='category_input no-fieldset' color='secondary'>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        displayEmpty
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value={10}>Electronics</MenuItem>
                        <MenuItem value={20}>Mobile</MenuItem>
                        <MenuItem value={30}>Others</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField className='search_input no-fieldset' placeholder="Search Amazon.in" id="outlined-basic"  />

                <Button variant="contained" color='secondary' className='search_btn no-fieldset'>
                    <SearchIcon />
                </Button>
            </div>
        )
    }
}

export default Search;