import AddTask from '../../../../../components/AddTask';
import Modal from '../../../../../components/Modal';

export default async function AddTaskModal() {
    return (
        <Modal>
            <div className="w-[300px] h-[300px] flex items-center justify-center">
              <AddTask/>
            </div>
        </Modal>
    );
}
