import { Link } from 'react-router-dom';
const AddMenu = () => {

    return (
        <Link to="/add-menu-item">
            <button style={{ padding: '10px 20px', margin: '10px 0', fontSize: '16px' }}>Add New Item</button>
        </Link>
    );
};

export default AddMenu;