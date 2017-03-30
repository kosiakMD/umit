/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/29/17
 * Time: 23:47
 */
import React, { Component, PropTypes } from 'react';
import { Breadcrumb } from 'semantic-ui-react'

export default class BreadCramps extends Component {

    constructor(props) {
        super();

        console.log(props.history)
        // setTimeout(()=>{
            // history.go(-1);
        // }, 3000)
    }

    onClick(e, index) {
        // e.preventDefault();
    }

    getCramps() {
        let { history } = this.props;
        let cramps = history.location.pathname.split('/');
        let href = '';
        return [
            <Breadcrumb.Section key={'b'+href} href={'/'}>Home</Breadcrumb.Section>,
            <Breadcrumb.Divider key={'d'+href} />,
            ...cramps.slice(1, -1).map((cramp, index) => {
                console.log(cramp)
                href += '/' + cramp;
                return ([
                    <Breadcrumb.Section key={'b'+index} href={href}>{cramp}</Breadcrumb.Section>,
                    <Breadcrumb.Divider key={'d'+index} />,
                ])
            }),
            <Breadcrumb.Section key={'b'+href} active>{cramps.slice(-1)}</Breadcrumb.Section>,
        ];
        // console.log(cramps)
        // return cramps.join(' / ');
    }

    render() {

        return (
            <div className="breadCramps">
                <Breadcrumb>{this.getCramps()}</Breadcrumb>
            </div>
        )
    }

}