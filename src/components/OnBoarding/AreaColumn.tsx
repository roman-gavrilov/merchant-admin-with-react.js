import React, { useEffect, useState } from "react";
import Column from "./Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

interface ItemsColumnProps {
    children?: React.ReactNode;
    api: any;
    // passItem: any;
}

const AreaColumn = (props: ItemsColumnProps) => {
    const { api } = props;

    const [items, setItems] = useState({ content: [] });
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (api) {
                setLoading(true);

                const response = await axios.get(api);
                setItems({ ...response.data, dndId: "area" });
                // console.log(response, "response");

                setLoading(false);
            } else {
                setItems({ content: [] });
            }
        };
        getData();
    }, [api]);

    // useEffect(() => {
    //     passItem(selectedItem);
    // }, [selectedItem, passItem]);

    const onDragEnd = (props: any) => {
        if (!items) {
            return null;
        }
        const { source, destination } = props;
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null;

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null;

        const start = items;

        // Move the item within the list
        // Start by making a new list without the dragged item
        const newList = start.content.filter(
            (_: any, idx: any) => idx !== source.index
        );

        // Then insert the item at the right location
        newList.splice(destination.index, 0, start.content[source.index]);

        // Then create a new copy of the column object
        const newCol = {
            ...start,
            content: newList,
        };

        // Update the state
        setItems(newCol);
        return null;
    };

    return (
        <div>
            {items.content && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Column
                        isLinks={false}
                        onClick={(object: any) => setSelectedItem(object)}
                        height={"90vh"}
                        width={"100%"}
                        column={items}
                        key={"area"}
                    />
                </DragDropContext>
            )}
        </div>
    );
};

export default AreaColumn;
