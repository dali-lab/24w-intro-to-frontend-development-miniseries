import { useEffect, useRef, useState } from "react";

function Task({ index, task, onUpdate, onDelete, toggleTask, swapTask }) {
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const draggedIndex = useRef(null);

  const handleEditSubmit = (index) => {
    onUpdate(editValue, index);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      setEditValue(task.text);
    }
  }, [isEditing, task]);



  // Drag and drop callbacks
  const handleDragStart = (e) => {
    draggedIndex.current = index;
    console.log(e.currentTarget.dataset.index)
  };

  // dragged element is moved over a valid drop target
  const handleDragOver = (e) => {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  };

  // dragged element is dropped onto a valid target
  const handleDrop = (e) => {
    console.log(e.currentTarget.dataset.index, index, draggedIndex.current)
    if (draggedIndex.current != index && draggedIndex.current !== null) {
      console.log(draggedIndex.current, index);

      swapTask(index, draggedIndex.current);
      e.currentTarget.classList.remove('drag-over');

      draggedIndex.current = null;
    }
  };
  
  // Styling logic
  // dragged element enters the boundaries of a valid drop target
  const handleDragEnter = (e) => {
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  return (
    <li 
      key={index}
      // Dragging
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragLeave={(e) => handleDragLeave(e, index)}
      // Toggling
      onClick={() => { if (!isEditing) toggleTask(index) }}
      className={task.completed ? 'completed' : ''}
      data-index={index}
    >
      {isEditing ? (
        <>
          <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
          <button onClick={() => handleEditSubmit(index)}>Save</button>
        </>
      ) : (
        <>
          <div className="text">{task.text}</div>
          <div className="edit-buttons">
            <button onClick={() => setIsEditing(index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        </>
      )}
    </li>
  )
}

export default Task;