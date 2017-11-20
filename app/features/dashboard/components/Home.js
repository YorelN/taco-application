import React from 'react';
import {Clearfix, Col, Row} from "react-bootstrap";

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import TableBody from 'material-ui/Table/TableBody'
import Table from 'material-ui/Table/Table'
import TableHeader from 'material-ui/Table/TableHeader'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRow from 'material-ui/Table/TableRow'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import Checkbox from 'material-ui/Checkbox'
import "chart.js";
import 'react-bootstrap'
import 'jquery'
import 'jqvmap'
import 'jqvmap/dist/maps/jquery.vmap.europe'


const data_ouvreur = {
    labels: ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juill", "Aôut", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
        {
            label: "Cliqueurs",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(141,160,252,1)",
            pointColor: "rgba(220,220,220,0)",
            pointStrokeColor: "rgba(220,220,220,0)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 70, 20, 41, 16, 75, 40, 65, 59, 80, 81, 56],
        },
    ],
    elements: { line: { fill: false, tension: 0.1 } }
};
const data_cliqueur = {
    labels: ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juill", "Aôut", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
        {
            label: "Cliqueurs",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(111,260,152,1)",
            pointColor: "rgba(220,220,220,0)",
            pointStrokeColor: "rgba(220,220,220,0)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [25, 20, 10, 41, 56, 25, 10, 35, 49, 20, 41, 36]
        },
    ],


};
const data_reactivite = {
    labels: ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juill", "Aôut", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
        {
            label: "Cliqueurs",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgb(252, 84, 133)",
            pointColor: "rgba(220,220,220,0)",
            pointStrokeColor: "rgba(220,220,220,0)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 70, 20, 41, 16, 75, 40, 65, 59, 80, 81, 56]
        },
    ],


};
const data_transformation = {
    labels: ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juill", "Aôut", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
        {
            label: "Cliqueurs",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgb(252, 205, 98)",
            pointColor: "rgba(220,220,220,0)",
            pointStrokeColor: "rgba(220,220,220,0)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 70, 20, 41, 16, 75, 40, 65, 59, 80, 81, 56]
        },
    ],


};

class PillsBasic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeGraph : 'Ouvreurs',
            value : 1,
            TransfoValue : ($(window).width() > 1400) ? 'Transformation' : 'Transfo.'
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    componentDidMount() {
        const ctx = (jQuery("#ouvreurGraph").get(0) != undefined) ? jQuery("#ouvreurGraph").get(0).getContext("2d") : null;
        new Chart(ctx, { type : 'line', data : data_ouvreur})
    }

    componentWillUpdate(nextProps, nextState) {
        const ctx = (jQuery("#ouvreurGraph").get(0) != undefined) ? jQuery("#ouvreurGraph").get(0).getContext("2d") : null;


    }

    setActiveClassName(activeGraph) {
        this.setState({
            activeGraph : activeGraph
        })
    }

    render() {
        return (
            <Clearfix>
                <Card id={"stats_card"}>
                    <CardTitle title={"Statistiques des campagnes"} style={{borderBottom : '1px solid #DDDDDD'}}/>
                    <Clearfix id="graph_content">
                        <Row>
                            <Col lg={12} md={12}>
                                <Col lg={3} md={3} sm={3} xs={12}
                                     className={(this.state.activeGraph === 'Ouvreurs' ? 'block_stats_dashboard_active' : 'block_stats_dashboard')}
                                     onClick={() => this.setActiveClassName('Ouvreurs')}
                                >
                                    <div className="header_stats_dashboard">
                                        <h2>Ouvreurs</h2>
                                        <div className="counter_stats_dashboard">72</div>
                                    </div>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={12}
                                     className={(this.state.activeGraph === 'Cliqueurs' ? 'block_stats_dashboard_active' : 'block_stats_dashboard')}
                                     onClick={() => this.setActiveClassName('Cliqueurs')}
                                >
                                    <div className="header_stats_dashboard">
                                        <h2>Cliqueurs</h2>
                                        <div className="counter_stats_dashboard">42</div>
                                    </div>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={12}
                                     className={(this.state.activeGraph === 'Reactivite' ? 'block_stats_dashboard_active' : 'block_stats_dashboard')}
                                     onClick={() => this.setActiveClassName('Reactivite')}
                                >
                                    <div className="header_stats_dashboard">
                                        <h2>Réactivté</h2>
                                        <div className="counter_stats_dashboard">30</div>
                                    </div>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={12}
                                     className={(this.state.activeGraph === 'Transformation' ? 'block_stats_dashboard_active' : 'block_stats_dashboard')}
                                     onClick={() => this.setActiveClassName('Transformation')}
                                >
                                    <div className="header_stats_dashboard">
                                        <h2>{this.state.TransfoValue}</h2>
                                        <div className="counter_stats_dashboard">300</div>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Col>
                            <div>
                                <canvas id='ouvreurGraph' ref="activeGrpah" style={{height : '100%', padding : '0 2% 0 2%', marginBottom : 25}}></canvas>
                            </div>
                        </Col>
                        <CardActions>
                            <DropDownMenu value={this.state.value} underlineStyle={{color : '#5574e3'}} selectedMenuItemStyle={{color : '#5574e3'}} onChange={this.handleChange}>
                                <MenuItem value={3} label="24 dernières heures" primaryText="24 dernières heures" />
                                <MenuItem value={1} label="7 derniers jours" primaryText="7 derniers jours" />
                                <MenuItem value={2} label="28 derniers jours" primaryText="28 derniers jours" />
                            </DropDownMenu>
                        </CardActions>
                    </Clearfix>
                </Card>
                <br/>
            </Clearfix>
        );
    }
}

class Maps extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const stats_card = jQuery("#stats_card").height();
        const graph_content = jQuery("#graph_content").height();

        jQuery("#map_card").css('height', stats_card + 'px');
        jQuery("#vmap").css('height', graph_content + 'px');

        window.addEventListener("resize", () => {
            const stats_card = jQuery("#stats_card").height();
            const graph_content = jQuery("#graph_content").height();
            jQuery("#map_card").css('height', stats_card + 'px');
            jQuery("#vmap").css('height', graph_content + 'px');
        });
        jQuery('#vmap').vectorMap({
            map: 'europe_en',
            backgroundColor: '#ffffff',
            color: '#5671e1',
            selectedColor: '#5044bc',
            showTooltip: false,
            hoverOpacity: 0.7,
        });
        jQuery('#vmap').vectorMap('zoomIn');
    }


    render()
    {
        return (
            <Card id={"map_card"}>
                <CardTitle title={"Géolocalisation"} style={{borderBottom : '1px solid #DDDDDD'}}/>
                <div id="vmap" style={{height : 500, width : '100%'}}></div>
            </Card>
        );
    }
}


export default class DashboardAnn extends React.Component {

    render() {
        return (
            <div className='dashboard'>
                <Row>
                    <Col sm={6} >
                        <Card>
                            <CardTitle title="Alertes"/>
                            <Table>
                                <TableHeader displaySelectAll={false} style={{backgroundColor : '#f2f3f7', color : '#000000'}}>
                                    <TableRow>
                                        <TableHeaderColumn>ID</TableHeaderColumn>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Status</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} showRowHover={true}>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn>Employed</TableRowColumn>

                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn>Employed</TableRowColumn>

                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn>Employed</TableRowColumn>

                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn>Employed</TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>

                    </Col>
                    <Col sm={6}>
                        <Card>
                            <CardTitle title="Mes campagnes"/>
                            <Table>
                                <TableHeader displaySelectAll={false} style={{backgroundColor : '#f2f3f7', color : '#000000'}}>
                                    <TableRow>
                                        <TableHeaderColumn>ID</TableHeaderColumn>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Status</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} showRowHover={true}>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn><Checkbox/></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn><Checkbox/></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn><Checkbox/></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn>John Smith</TableRowColumn>
                                        <TableRowColumn><Checkbox/></TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}