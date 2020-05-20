import React, { Component } from 'react'
import {handleRequestError} from '../../helpers/error_handler';
const axios = require('axios');

class LogTable extends Component {

    constructor(props) {
        super(props)
    
        this.state = {            
            t_headers : props.t_headers,
            // t_headers: ["Receiver's Address", "Sender's Address", 'Current Location', 'Last Updated'],
            reg_posts : [
                // [
                //     17,
                //     '1',
                //     ["John W.", "121/B, Temple Rd, rawathawaththa, moratuwa, 10400"],                    
                //     ["Wells", "259/2, flovive square, Old town, galle, 80000"],                    
                //     "peradeniya,20400",
                //     "2020-5-4 16:16:28"
                // ],
                // [
                //     1,
                //     '0',
                //     ["John W.", "121/B, Temple Rd, rawathawaththa, moratuwa, 10400"],                    
                //     ["Kamal Perera", "46, Mill Rd, Hiriwala, kal-eliya, 11160"],
                //     "maradana,01000",                    
                //     "2020-4-21 23:38:48"
                // ]
            ]
        }
    }
    
    componentDidMount(){
        axios({
            method: 'post',
            url: `http://localhost:5000/post-offices/reg-posts/${this.props.category}`,
            data: {post_office: localStorage.getItem('user_id'), status: this.props.delivery_status},
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'x-auth-token': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                console.log(res);                
                this.setState({
                    reg_posts: res.data
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
        const {t_headers, reg_posts} = this.state;

        if(reg_posts.length){
            return (
                <div className="table-responsive">
                    <table className="table w-auto">
                        <thead className="thead-primary" style={t_head_style}>
                            <tr className="text-center">
                                <th style={special_thead}></th>
                                {
                                    t_headers.map((t_header, idx) => (
                                        <th key={idx}>{t_header}</th>
                                    ))                           
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reg_posts.map( (reg_post, idx) => (
                                    <tr key={idx} className="text-center">                                                        
                                        {
                                            (reg_post[1] === '1') ? <td><span className="badge badge-pill badge-danger">Speed Post</span></td>
                                            : <td></td>
                                        }
                                        {                                        
                                            reg_post.slice(2).map( (el, idx) => (
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

export default LogTable