import React from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TitleBarStyle, DrawerButtonStyle, DrawerStyle } from "../config/Styles";

/*
  Inline-styling for easier configuration
*/

export function TitleBar(props) {
    return (
        <div style={{
            width: "100vw",
            position: "fixed",
            height: TitleBarStyle.height,
            lineHeight: TitleBarStyle.height,
            backgroundColor: TitleBarStyle.backgroundColor,
            color: TitleBarStyle.color,
            alignItems: "center",
            boxShadow: "0 5px 5px #666",
            borderBottom: "solid 2px " + TitleBarStyle.borderColor,
            zIndex: "10",
        }}>
            <DrawerButton text={props.menuText}
                toggleMethod={props.toggleMethod}
                closeMethod={props.closeMethod}
                open={props.menuOpen} />
            {props.title}
        </div>
    )
}

function DrawerButton(props) {
    return (
        <ClickAwayListener onClickAway={props.closeMethod}>
            <div style={{
                height: DrawerButtonStyle.height,
                backgroundColor: DrawerButtonStyle.backgroundColor,
                display: "flex",
                position: "absolute",
                top: "0",
                left: "0",
                alignItems: "center",
                cursor: "pointer",
                color: DrawerButtonStyle.color,
                borderBottom: "solid 2px " + TitleBarStyle.borderColor,
            }} onClick={props.toggleMethod} >
                {props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />} {props.text}
            </div >
        </ClickAwayListener>
    )
}

export function Drawer(props) {

    const toggleWidth = props.open ? "0" : "-" + DrawerStyle.width;

    return (
        <div style={{
            width: DrawerStyle.width,
            backgroundColor: DrawerStyle.backgroundColor,
            transition: "all 0.3s ease-in-out",
            transform: "translate(" + toggleWidth + ")",
            position: "fixed",
            left: "0",
            height: "100vh",
            marginTop: TitleBarStyle.height,
            zIndex: "9",
        }}>
            {props.menu.map(link => (
                <Link to={link.path} style={{
                    color: DrawerStyle.color,
                    marginTop: "0.2em",
                    textDecoration: "none",
                    fontSize: "1.2em",
                    display: "block"
                }} key={link.name}>{link.name}</Link>
            ))}
        </div>
    )
}
