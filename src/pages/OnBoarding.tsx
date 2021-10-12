import React, { useCallback, useEffect, useRef, useState } from "react";
import { Typography } from "@material-ui/core";
// import { makeStyles, Theme } from "@material-ui/core/styles";
// import { sizing } from "@material-ui/system";
import Column from "../components/OnBoarding/Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import ItemsColumn from "../components/OnBoarding/ItemsColumn";
import AreaColumn from "../components/OnBoarding/AreaColumn";

const OnBoarding = () => {
    // For resizable Column
    const resizableDiv = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        let mouseX = 0;
        let divW = 0;
        const mouseMoveHandler = function (e: any) {
            if (resizableDiv.current) {
                // How far the mouse has been moved
                const dx = e.clientX - mouseX;

                // Adjust the dimension of element
                resizableDiv.current.style.width = `${divW + dx}px`;
            }
        };

        const mouseUpHandler = function () {
            // Remove the handlers of `mousemove` and `mouseup`
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        };

        const mouseDownHandler = function (e: any) {
            if (resizableDiv.current) {
                // Get the current mouse position
                mouseX = e.clientX;

                // Calculate the dimension of element
                divW = resizableDiv.current.offsetWidth;

                // Attach the listeners to `document`
                document.addEventListener("mousemove", mouseMoveHandler);
                document.addEventListener("mouseup", mouseUpHandler);
            }
        };

        const refToDiv = resizableDiv.current;

        refToDiv?.addEventListener("mousedown", mouseDownHandler);

        return () => {
            refToDiv?.removeEventListener("mousedown", mouseDownHandler);
        };
    }, [resizableDiv]);

    //

    const [links, setLinks] = useState({
        dndId: "links",
        content: [
            { id: "3", text: "New" },
            { id: "2", text: "In Progress" },
            { id: "1", text: "Completed" },
        ],
    });

    const [selectedLink, setSelectedLink] = useState({ text: "" });
    const [selectedItem, setSelectedItem] = useState({ id: "" });

    const [apiForSelectedItem, setApiForSelectedItem] = useState("");

    useEffect(() => {
        if (selectedItem && selectedItem.id) {
            setApiForSelectedItem(
                `http://185.185.126.15:8080/api/management/onboarding/task_item?taskId=${selectedItem.id}`
            );
        }
    }, [selectedItem]);

    useEffect(() => {
        setApiForSelectedItem("");
    }, [selectedLink]);

    let apiSelected = "";

    if (selectedLink && selectedLink.text === "Completed") {
        apiSelected =
            "http://185.185.126.15:8080/api/management/onboarding/task?status=completed";
    } else if (selectedLink && selectedLink.text === "In Progress") {
        apiSelected =
            "http://185.185.126.15:8080/api/management/onboarding/task?status=in_progress";
    } else if (selectedLink && selectedLink.text === "New") {
        apiSelected =
            "http://185.185.126.15:8080/api/management/onboarding/task?status=new";
    }

    const onDragEnd = (props: any) => {
        const { source, destination } = props;
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null;

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null;

        const start = links;

        // Move the item within the list
        // Start by making a new list without the dragged item
        const newList = start.content.filter(
            (_: any, idx: any) => idx !== source.index
        );

        // Then insert the item at the right location
        newList.splice(destination.index, 0, start.content[source.index]);

        // Then create a new copy of the column object
        const newCol = {
            dndId: start.dndId,
            content: newList,
        };

        // Update the state
        setLinks(newCol);
        return null;
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        backgroundColor: "#f9f9f9",
                        height: "auto",
                        paddingTop: "30px",
                        width: "fit-content",
                    }}
                >
                    <Typography variant={"h4"} style={{ paddingLeft: "16px" }}>
                        Links
                    </Typography>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Column
                            isLinks={true}
                            onClick={(object: any) => setSelectedLink(object)}
                            // backgroundColor={"#f9f9f9"}
                            height={"auto"}
                            width={"100%"}
                            column={links}
                            key={"links"}
                        />
                    </DragDropContext>
                </div>
                <div style={{ flex: "1", display: "flex" }}>
                    <div
                        id="resizeMe"
                        style={{
                            // flex: "1",
                            width: "27%",
                            backgroundColor: "#ffffff",
                            height: "auto",
                            paddingTop: "30px",
                            borderRight: "2px solid #f5f5f5",
                            position: "relative",
                            overflow: "auto",
                        }}
                        ref={resizableDiv}
                    >
                        <div
                            className="resizer resizer-r"
                            // ref={resizerDiv}
                            style={{
                                position: "absolute",
                                cursor: "col-resize",
                                height: "100%",
                                right: "-5px",
                                top: "0",
                                width: "5px",
                                // backgroundColor: "green",
                                zIndex: 5,
                                // minWidth: "fit-content",
                            }}
                        />
                        <Typography
                            variant={"h4"}
                            style={{ paddingLeft: "16px" }}
                        >
                            Items
                        </Typography>
                        <ItemsColumn
                            api={apiSelected}
                            passItem={(object: any) => setSelectedItem(object)}
                        />
                    </div>
                    <div
                        style={{
                            flex: "1",
                            // width: "auto",
                            backgroundColor: "#ffffff",
                            height: "auto",
                            paddingTop: "30px",
                            overflow: "auto",
                        }}
                    >
                        <Typography
                            variant={"h4"}
                            style={{ paddingLeft: "16px" }}
                        >
                            Area
                        </Typography>
                        <AreaColumn
                            api={apiForSelectedItem}
                            // passItem={(object: any) => null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnBoarding;
