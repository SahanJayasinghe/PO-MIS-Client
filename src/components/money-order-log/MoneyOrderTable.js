import React, { Component } from 'react'
import {handleRequestError} from '../../helpers/error_handler';
const axios = require('axios');

class MoneyOrderTable extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            t_headers: props.t_headers,
            money_orders: []
        }
    }

    componentDidMount() {
        let post_office = localStorage.getItem('user_id');
        axios({
            method: 'post',
            url: `http://localhost:5000/post-offices/money-orders/${this.props.route}`,
            data: {post_office, status: this.props.status},
            headers: {'X-Requested-With': 'XMLHttpRequest', 'x-auth-token': localStorage.getItem('user_token')}
        })
            .then(res => {
                console.log(res);                
                this.setState({
                    money_orders: res.data
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
        let {t_headers, money_orders} = this.state;

        if (money_orders.length) {
            return (
                <>
                <div className="table-responsive text-nowrap">
                    <table className="table w-auto">
                        <thead className="thead-primary" style={t_head_style}>
                            <tr className="text-center">
                            {
                                t_headers.map((t_header, idx) => (
                                    <th key={idx}>{t_header}</th>
                                ))
                            }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                money_orders.map( (money_order, idx) => (
                                    <tr key={idx} className="text-center">
                                        {
                                            money_order.slice(1).map( (el, idx) => (
                                                <td key={idx} className='product-name'>{el}</td>
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
                    <small className="text-muted">No Money Orders in this category</small>
                    <hr className="border-success" />
                </h5>
            )
        }
    }
}

export default MoneyOrderTable
