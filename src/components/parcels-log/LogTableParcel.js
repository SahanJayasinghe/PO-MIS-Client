import React, { Component } from 'react'
import {handleRequestError} from '../../helpers/error_handler';
const axios = require('axios');

class LogTableParcel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            t_headers: props.t_headers,
            parcels: []
        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url: `http://localhost:5000/post-offices/parcels/${this.props.category}`,
            data: {post_office: localStorage.getItem('user_id'), status: this.props.delivery_status},
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'x-auth-token': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                console.log(res);                
                this.setState({
                    parcels: res.data
                });               
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }
    
    render() {
        let t_head_style = {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
        }
        let special_thead = {
            backgroundColor: "white"
        }
        const {t_headers, parcels} = this.state;

        if(parcels.length){
            return (
                <div className="table-responsive">
                    <table className="table w-auto">
                        <thead className="thead-primary" style={t_head_style}>
                            <tr className="text-center">
                                {/* <th style={special_thead}></th> */}
                                {
                                    t_headers.map((t_header, idx) => (
                                        <th key={idx}>{t_header}</th>
                                    ))                           
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map( (parcel, idx) => (
                                    <tr key={idx} className="text-center">                                                        
                                        {/* <td><span className="badge badge-pill badge-secondary">View</span></td> */}
                                        {                                        
                                            parcel.slice(1).map( (el, idx) => (
                                                ((typeof el === 'string' || typeof el === 'number')) ? <td key={idx} className='product-name'>{el}</td>                                           
                                                : <td key={idx} className='product-name'>{el[0]}<br/>{el[1]}</td>                                            
                                            ))
                                        }                                
                                    </tr>
                                ))
                            }                        
                        </tbody>
                    </table>
                </div>        
            )
        }
        else{
            return(
                <h5 className="font-italic">
                    <small className="text-muted">No registered posts in this category</small>
                </h5>
            )
        }    
    }
}

export default LogTableParcel
