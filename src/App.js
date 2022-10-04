import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import './App.css';


function App() {

  const tasks = ['red', 'blue', 'green', 'orange', 'yellow'];

  const onDragEnd = (result) => {
    const { source , destination} = result; 

    if (result && source && destination) {
      const task = tasks.splice(source.index,1).pop(); 
      tasks.splice(destination.index, 0, task);
    }
  }

  const Itme = ({styles, color}) => (
    <div style={styles}><p>{ color }</p></div>
  )

  const Task = ({styles, id, i}) => ( 
    <Draggable index={i} draggableId={id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
          <Itme styles={styles} i={i} color={styles.backgroundColor}/>
        </div>
      )}
    </Draggable>
  ) 

  const TaskList = () => {
    const styleProp = {backgroundColor: 'red', margin: '10px', padding: '20px'};

    return tasks.map( (task, i) => (
        <Task 
          styles={{...styleProp, backgroundColor: task}} 
          id={i.toString()}
          key={'key ' + i}
          i={i}
        />
    ));
  }

  return (
    <div className="App">
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{width: '500px', alingText: 'left', border: 'solid 2px black', padding: '15px'}}>
            <h1>Todo list:</h1>
            <Droppable droppableId='1'>
              {(provider) => (
                <div {...provider.droppableProps} ref={provider.innerRef}>
                  <TaskList />
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
      </DragDropContext>
    </div>
  );
}

/**
 * <DragDropContext /> has 3 callbacks
 * 1 - onDragStart
 * 2 - onDragUpdate
 * 3 - onDragEnd -> (this is the only require callback)
 *    onDragEnds callback f() is responsible for updating the order of the list 
 *    after the DND is finished
 * 
 * The <Droppable /> Component is the section where all the items 
 * can be drag and drop in other position
 * 
 * Each <Draggable /> represents each element capable of being dragged and dropped 
 * anywhere within the <Droppable /> component
 */

export default App;
