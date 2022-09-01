import React from "react";
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Trash3Fill } from "react-bootstrap-icons";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const DragDropComponent = (props) => {
  const { data, itemClass, dragClass, onChange, onDelete } = props;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedData = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    onChange(reorderedData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((item, index) => (
              <Draggable key={`item-${item.value}`} draggableId={`item-${item.value}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? dragClass : itemClass} d-flex justify-content-between align-items-center`}
                  >
                    {item.label}
                    <Trash3Fill
                      role="button"
                      className="text-danger"
                      onClick={() => onDelete(index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropComponent;

DragDropComponent.propTypes = {
  data: PropTypes.object,
  itemClass: PropTypes.string,
  dragClass: PropTypes.string, 
  onChange: PropTypes.func, 
  onDelete: PropTypes.func
}
