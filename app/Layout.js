/* eslint-disable import/first */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationClose from 'material-ui/svg-icons/action/power-settings-new';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import HomeIcon from 'material-ui/svg-icons/action/home';
import WorkIcon from 'material-ui/svg-icons/action/work';
import EventIcon from 'material-ui/svg-icons/action/event';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import SendIcon from 'material-ui/svg-icons/content/send';
import OpenFolderIcon from 'material-ui/svg-icons/file/folder-open';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ChartIcon from 'material-ui/svg-icons/editor/insert-chart';

import {Link} from "react-router-dom";
import {
    Avatar, Badge, FlatButton, FontIcon, IconButton, IconMenu, List, ListItem, MenuItem, RaisedButton,
    Subheader
} from "material-ui";

class Layout extends React.Component {

    state = {
        openMenu : false
    };

    handleOpenMenu = () => {
        this.setState({
            openMenu: true,
        });
    }

    handleOnRequestChange = (value) => {
        this.setState({
            openMenu: value,
        });
    }

    render() {
        const AppBarButton = (
            <div>
                <IconMenu
                    iconButtonElement={
                        <Badge
                            badgeContent={2}
                            secondary={true}
                            badgeStyle={{top: 11, right: 9}}
                        >
                            <IconButton
                                iconStyle={LayoutStyle.mediumIcon}
                                style={LayoutStyle.medium}
                                color="#FFFFFF"
                            >
                                <NotificationsIcon />
                            </IconButton>
                        </Badge>
                    }
                >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Send feedback" />
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" />
                </IconMenu>
                <IconMenu
                    iconButtonElement={
                        <ListItem
                            style={{top : -34}}
                            color="white"
                            leftAvatar={<Avatar/>}
                        >
                            <span style={{color : "#FFFFFF", fontWeight : 200}}>Bonjour Nico</span>{" "}
                        </ListItem>}
                >
                    <MenuItem primaryText="Profil" />
                </IconMenu>
                <IconMenu
                    iconButtonElement={<RaisedButton onClick={this.handleOpenMenu} label="FR" />}
                    open={this.state.openMenu}
                    style={{top : -34}}
                    onRequestChange={this.handleOnRequestChange}
                >
                    <MenuItem value="1" primaryText="Windows App" />
                    <MenuItem value="2" primaryText="Mac App" />
                    <MenuItem value="3" primaryText="Android App" />
                    <MenuItem value="4" primaryText="iOS App" />
                </IconMenu>
                <IconButton
                    iconStyle={LayoutStyle.mediumIcon}
                    style={LayoutStyle.medium}
                >
                    <NavigationClose />
                </IconButton>
            </div>
        );
        return (
            <main>
                <section>
                    <AppBar style={LayoutStyle.AppBar}
                            id="AppBar"
                            iconElementRight={AppBarButton}
                    />
                </section>
                <section id="SideBar">
                    <Drawer width={270} open={true} >
                        <h1 id="TitleApp"
                            style={{textAlign : 'center', height : 79,  borderBottom : '1px solid #EEEEEE'}}
                        >
                            Linkyway
                        </h1>
                        <List>
                            <Link key={1} to="yay">
                                <ListItem
                                primaryText="Dashboard"
                                leftIcon={<HomeIcon/>}/>
                            </Link>
                            <ListItem
                                primaryText="Mes campagnes"
                                primaryTogglesNestedList={true}
                                leftIcon={<SendIcon/>}
                                nestedItems={[
                                    <Link key={2} to="yay">
                                        <ListItem
                                        primaryText="Campagnes"
                                        style={LayoutStyle.listDownItem}
                                        leftIcon={<NavigationClose/>}
                                    />
                                    </Link>,
                                    <Link key={3} to="yay">
                                        <ListItem
                                        primaryText="Nouvelle campagne"
                                        style={LayoutStyle.listDownItem}
                                        leftIcon={<NavigationClose/>}
                                    />
                                    </Link>,
                                ]}
                            />
                            <ListItem
                                primaryText="Mes kits"
                                primaryTogglesNestedList={true}
                                leftIcon={<WorkIcon/>}
                                nestedItems={[
                                    <Link key={4} to="yay">
                                        <ListItem
                                        primaryText="Kits"
                                        style={LayoutStyle.listDownItem}
                                        leftIcon={<EditIcon/>}
                                    />
                                    </Link>,
                                    <Link key={5} to="yay">
                                        <ListItem
                                        primaryText="Nouveau kit"
                                        style={LayoutStyle.listDownItem}
                                        leftIcon={<OpenFolderIcon/>}
                                    />
                                    </Link>
                                ]}
                            />
                            <ListItem primaryText="Calendrier"
                                      leftIcon={<EventIcon/>}/>
                            <ListItem primaryText="Statistiques"
                                      leftIcon={<ChartIcon/>}/>
                            <ListItem primaryText="Alertes"
                                      leftIcon={<NotificationsIcon/>}/>
                            <ListItem primaryText="Paramétrage"
                                      leftIcon={<SettingIcon/>}/>
                        </List>
                    </Drawer>
                </section>
            </main>
        )
    }
}

const LayoutStyle = {
    AppBar : {
        position: 'fixed',
        top : 0,
        paddingLeft : 294,
        background : 'linear-gradient(90deg, rgba(85,114,250,1) 0%, rgba(91,78,218,1) 100%)'
    },
    medium: {
        width: 40,
        height: 40,
        top : -20,
        right : 5,
        color : '#FFFFFF'
    },
    mediumIcon: {
        width: 35,
        height: 35,
        color : '#FFFFFF'

    },
    listDownItem : {
        paddingLeft : 35
    }
};

export default Layout;
