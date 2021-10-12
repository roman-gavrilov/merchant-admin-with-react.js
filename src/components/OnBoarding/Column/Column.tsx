import React, { useEffect, useState } from "react";
import "./Column.css";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
// import RootRef from "@material-ui/core/RootRef";
import List from "@material-ui/core/List";
import SingleListItem from "../ListItem/SingleListItem";

interface ColumnProps {
    children?: React.ReactNode;
    isLinks: any;
    height: any;
    width: any;
    column: any;
    onClick: any;
    refresh?: any;
}

const Column = (props: ColumnProps) => {
    const { height, width, column, onClick, refresh } = props;
    const [clicked, setClicked] = useState(null);
    const [rightClickedId, setRightClickedId] = useState(-1);
    const [contextXloc, setContextXloc] = useState(-10);
    const [contextYloc, setContextYloc] = useState(-10);

    useEffect(() => {
        if (column && column.dndId) {
            onClick(clicked);
        }
    }, [clicked, column, onClick]);

    const linksStyle = { height: "100%", maxHeight: "100%", overflow: "auto" };

    let classname = "";
    if (column.dndId === "items") {
        classname = "itemSelected items";
    } else if (column.dndId === "links") {
        classname = "linkSelected links";
    } else if (column.dndId === "area") {
        classname = "areaSelected area";
    }

    return (
        <div
            style={{
                height: height,
                width: width,
            }}
            onClick={() => {
                setRightClickedId(-1);
            }}
        >
            <Droppable droppableId={`${column.dndId}`}>
                {(provided) => (
                    // <RootRef rootRef={provided.innerRef}>
                    <List style={linksStyle} ref={provided.innerRef}>
                        {column.content.map((itemObject: any, index: any) => {
                            return (
                                <div
                                    onClick={(e) => {
                                        if (e.type === "click") {
                                            setClicked(itemObject);
                                            setRightClickedId(-1);
                                        }
                                    }}
                                    onContextMenu={(e) => {
                                        console.log(e);
                                        if (
                                            e.type === "contextmenu" &&
                                            column.dndId === "items"
                                        ) {
                                            e.preventDefault();
                                            setContextYloc(
                                                e.nativeEvent.offsetX + 16
                                            );
                                            setContextXloc(
                                                e.nativeEvent.offsetY + 6
                                            );
                                            setClicked(itemObject);
                                            setRightClickedId(itemObject.id);
                                            // console.log("Right click");
                                        }
                                    }}
                                    className={
                                        clicked === itemObject
                                            ? classname
                                            : `${column.dndId}`
                                    }
                                    key={`${itemObject.id}`}
                                >
                                    <SingleListItem
                                        index={index}
                                        itemObject={itemObject}
                                        key={`${itemObject.id}`}
                                        dndId={column.dndId}
                                    />
                                    {column.dndId === "items" && (
                                        <div
                                            style={{
                                                top: `${contextXloc}px`,
                                                left: `${contextYloc}px`,
                                            }}
                                            className={
                                                itemObject.id === rightClickedId
                                                    ? "contextMenu"
                                                    : "contextMenu hideContextMenu"
                                            }
                                            onClick={async () => {
                                                try {
                                                    const response =
                                                        await axios.delete(
                                                            `http://185.185.126.15:8080/api/management/onboarding/task_item?ids=${itemObject.id}`
                                                        );
                                                    console.log(response);
                                                    refresh();
                                                } catch (e) {
                                                    console.log(e);
                                                }
                                            }}
                                        >
                                            <List
                                                style={{
                                                    width: "120px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "#ffffff",
                                                }}
                                            >
                                                <ListItem dense button>
                                                    <ListItemText
                                                        style={{
                                                            color: "#2c2c2c",
                                                            textAlign: "center",
                                                        }}
                                                        primary="Delete"
                                                    />
                                                </ListItem>
                                            </List>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {provided.placeholder}
                    </List>
                    // </RootRef>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
