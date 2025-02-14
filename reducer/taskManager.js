"use client"

export const taskReducer = ( state, action ) =>
{
    switch ( action.type )
    {
        case 'ADD_TASK': {
            const { category, task } = action.payload;
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [ category ]: [ ...( state.tasks[ category ] || [] ), task ],
                },
            };
        }

        case 'EDIT_TASK': {
            const { currentCategory, taskId, updatedTask } = action.payload;
            const targetCategory = updatedTask.newCategory || currentCategory;

            const updateTaskList = taskList =>
                taskList.map( task => ( task.id === taskId ? { ...task, ...updatedTask } : task ) );

            if ( targetCategory !== currentCategory )
            {
                const updatedOldCategory = ( state.tasks[ currentCategory ] || [] ).filter( task => task.id !== taskId );
                const updatedNewCategory = [
                    ...( state.tasks[ targetCategory ] || [] ),
                    { ...updatedTask, id: Date.now() },
                ];

                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [ currentCategory ]: updatedOldCategory,
                        [ targetCategory ]: updatedNewCategory,
                    },
                };
            } else
            {
                const updatedCategoryTasks = updateTaskList( state.tasks[ currentCategory ] || [] );
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [ currentCategory ]: updatedCategoryTasks,
                    },
                };
            }
        };

        case 'SORT_BY_DATE': {
            const { category, direction } = action.payload;
            const tasksToSort = state.tasks[ category ];

            const sortedCategory = [ ...( tasksToSort || [] ) ].sort( ( a, b ) =>
            {
                const dateA = new Date( a.date );
                const dateB = new Date( b.date );
                return direction === 'asc' ? dateA - dateB : dateB - dateA;
            } );

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [ category ]: sortedCategory,
                },
            };
        };

        case 'SEARCH_TASKS': {
            return {
                ...state,
                searchTerm: action.payload.query,
            };
        };

        case 'DELETE_TASK': {
            const { category, taskId } = action.payload;
            const updatedCategory = ( state.tasks[ category ] || [] ).filter( task => task.id !== taskId );

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [ category ]: updatedCategory,
                },
            };
        };

        default:
            return state;
    }
};