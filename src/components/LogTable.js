import React, { Component } from 'react'
import {handleRequestError} from '../helpers/error_handler';
import { server_baseURL } from '../helpers/data';
const axios = require('axios');

class LogTable extends Component {

    constructor(props) {
        super(props)
    
        this.state = {            
            t_headers : props.t_headers,
            // t_headers: ["Receiver's Address", "Sender's Address", 'Current Location', 'Last Updated'],
            posts : [
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

    fetchPosts = (data_obj, header_obj) => {
        axios({
            method: 'post',
            url: `${server_baseURL}/${this.props.route}`,
            data: data_obj,
            headers: header_obj
        })
            .then(res => {
                // console.log(res);
                this.setState({
                    posts: res.data
                });               
            })
            .catch(err => {
                console.log(err);
                handleRequestError(err);
            })
    }
    
    componentDidMount(){
        let header_obj;
        let data_obj;
        if(localStorage.getItem('user_type') === 'post_office'){
            header_obj = {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')};
            data_obj = {post_office: localStorage.getItem('user_id'), status: this.props.delivery_status};
        }
        else {
            header_obj = {'X-Requested-With': 'XMLHttpRequest'};
            let {resident_id, resident_key} = this.props;
            data_obj = {resident_id, status: this.props.delivery_status, resident_key};
        }
        this.fetchPosts(data_obj, header_obj);
    }

    componentDidUpdate(prevProps){
        if (! ['post_office', 'admin'].includes(localStorage.getItem('user_type'))){
            if (prevProps.resident_id !== this.props.resident_id){
                let header_obj = {'X-Requested-With': 'XMLHttpRequest'};
                let {resident_id, resident_key} = this.props;
                let data_obj = {resident_id, status: this.props.delivery_status, resident_key};
                this.fetchPosts(data_obj, header_obj);
            }
        }
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
        const {t_headers, posts} = this.state;

        if(posts.length){
            return (
                <>
                <div className="table-responsive text-nowrap">
                    <table className="table w-auto">
                        <thead className="thead-primary" style={t_head_style}>
                            <tr className="text-center">
                                {
                                    (this.props.post_type === 'Registered Post') 
                                    ? <th style={special_thead}></th> : <></>
                                }                                
                                {
                                    t_headers.map((t_header, idx) => (
                                        <th key={idx}>{t_header}</th>
                                    ))                           
                                }
                            </tr>
                        </thead>
                        <tbody>
                            { (this.props.post_type === 'Registered Post')
                                ? posts.map( (post, idx) => (
                                    <tr key={idx} className="text-center">                                                        
                                        {
                                            (post[1] === '1') ? <td><span className="badge badge-pill badge-danger">Speed Post</span></td>
                                            : <td></td>
                                        }
                                        {                                        
                                            post.slice(2).map( (el, idx) => (
                                                ((typeof el === 'string' || typeof el === 'number')) ? <td key={idx} className='product-name text-dark'>{el}</td>                                           
                                                : <td key={idx} className='product-name text-dark'>{el[0]}<br/>{el[1]}</td>                                            
                                            ))
                                        }                                
                                    </tr>
                                ))
                                : posts.map( (post, idx) => (
                                    <tr key={idx} className="text-center text-dark">                                                        
                                        {/* <td><span className="badge badge-pill badge-secondary">View</span></td> */}
                                        {                                        
                                            post.slice(1).map( (el, idx) => (
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
                <hr className="border-success" />
                </>     
            )
        }
        else{
            return(
                <h5 className="font-italic mb-4">
                    <small className="text-muted">No {this.props.post_type}s in this category</small>
                    <hr className="border-success" />
                </h5>
            )
        }
    }
}

export default LogTable