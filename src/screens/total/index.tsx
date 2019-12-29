import React, {ReactNode} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import dataService, {Record} from "../../DataService";


import "./styles.css";

// мы используем react-router и хотим иметь доступ к параметрам пути
// поэтому наследуемся от RouteComponentProps

interface TotalPageProps extends RouteComponentProps {
 
}

interface TotalPageState {
    total_output: number;
}

class TotalPage extends React.Component<TotalPageProps, TotalPageState> {


    constructor(props: Readonly<TotalPageProps>) {
        super(props);
        this.state = {
            total_output: 0,
        };
    }

    async componentDidMount() {
        let total: number = await dataService.getTotal();

        this.setState({
            total_output: total
        });
        
    }

    render(): ReactNode {
        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg sticky-top navbar-dark bd-navbar">
                    <a className="navbar-brand" href="#">TotalPage</a>
                    <div id="navbarNavDropdown" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item text-nowrap">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.props.history.push('/total')}
                                            type="button">Total
                                </button>
                            </li>

                            <li className="nav-item text-nowrap">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.props.history.push('/spendings')}
                                            type="button">Расходы
                                </button>
                            </li>

                            <li className="nav-item text-nowrap">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.props.history.push('/income')}
                                            type="button">Доходы
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="py-md-3 pl-md-5">

                    <div className="container">

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Расходы</h5>
                                    <p className="card-text">Ваш учет расходов.</p>
                                    <button className="btn btn-outline-secondary"
                                     onClick={() => this.props.history.push('/spendings')}
                                        type="button">Внести расходы
                                    </button>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Доходы</h5>
                                    <p className="card-text">Ваш учет доходов.</p>
                                    <button className="btn btn-outline-secondary"
                                     onClick={() => this.props.history.push('/income')}
                                        type="button">Внести доходы
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>

                    </div>
                </main>

            </div>
        );
    }
};

export default withRouter(TotalPage);