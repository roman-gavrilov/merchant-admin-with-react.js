import React from "react";
import "./SingleListItem.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { Draggable } from "react-beautiful-dnd";

interface SingleListItemProps {
    children?: React.ReactNode;
    dndId: any;
    itemObject: any;
    index: any;
}

function SingleListItem(props: SingleListItemProps) {
    const { itemObject, index, dndId } = props;

    let stylesForSignleIteamText = {};
    if (dndId === "items") {
        stylesForSignleIteamText = { color: "#2c2c2c", height: "42px" };
    } else {
        stylesForSignleIteamText = { color: "#2c2c2c" };
    }

    let infoToPrint: any = null;
    if (dndId === "area") {
        infoToPrint = (
            <p>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>
                    {`Title: ${itemObject.title}`}{" "}
                </span>
                <br />
                <span style={{ fontSize: "14px" }}>
                    {`Description: ${itemObject.description}`}{" "}
                </span>
                <span style={{ fontSize: "14px" }}>
                    {`CreatedAt: ${itemObject.createdAt}`}{" "}
                </span>
            </p>
        );
    } else {
        infoToPrint = (
            <p
                style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                }}
            >
                {`${
                    itemObject.text ? itemObject.text : itemObject.businessName
                }`}
            </p>
        );
    }

    return (
        <Draggable
            draggableId={`${itemObject.id}`}
            key={`${itemObject.id}`}
            index={index}
        >
            {(provided) => (
                <ListItem
                    style={{ backgroundColor: "green" }}
                    key={`${itemObject.id}`}
                    role={undefined}
                    dense
                    button
                    ContainerComponent={(<li />).type}
                    ref={provided.innerRef}
                    // ContainerProps={{ ref: provided.innerRef }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <ListItemText
                        style={stylesForSignleIteamText}
                        // sytles={{ fontFamily: "Quicksand" }}
                        primary={infoToPrint}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="comments"
                            question-uid={`${itemObject.id}`}
                        ></IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        </Draggable>
    );
}

export default SingleListItem;
