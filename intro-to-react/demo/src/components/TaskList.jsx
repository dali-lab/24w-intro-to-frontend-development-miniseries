import { useEffect, useState } from 'react';

function TaskList({ tasks, onDelete, onUpdate, onToggle, swapTask }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const [draggedTask, setDraggedTask] = useState(null);

  // Editing logic
  const handleEditSubmit = (index) => {
    onUpdate(editValue, index);
    setEditIndex(null);
  };

  useEffect(() => {
    if (editIndex !== null) {
      setEditValue(tasks[editIndex].text);
    }
  }, [editIndex, tasks]);





  // Drag and drop callbacks
  const handleDragStart = (e, index) => {
    setDraggedTask(index);
  };

  // dragged element is moved over a valid drop target
  const handleDragOver = (e) => {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  };

  // dragged element is dropped onto a valid target
  const handleDrop = (e, index) => {
    if (draggedTask !== index) {
      swapTask(index, draggedTask);
    }

    setDraggedTask(null);
    e.currentTarget.classList.remove('drag-over');
  };
  
  // Styling logic
  // dragged element enters the boundaries of a valid drop target
  const handleDragEnter = (e, index) => {
    if (draggedTask !== index) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  
  return (
    <ul>
      {tasks.map((task, index) => (
        <div key={index}>
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
            onClick={() => { if (editIndex !== index) onToggle(index) }}
            className={task.completed ? 'completed' : ''}
          >
            {editIndex === index ? (
              <>
                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                <button onClick={() => handleEditSubmit(index)}>Save</button>
              </>
            ) : (
              <>
                <div className="text">{task.text}</div>
                <div className="edit-buttons">
                  <button onClick={() => setEditIndex(index)}>Edit</button>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </div>
              </>
            )}
            </li>
          </div>
      ))}
    </ul>
  );
}

export default TaskList;
