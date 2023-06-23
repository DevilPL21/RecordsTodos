import { connect } from 'react-redux';
import { addRecord } from '../redux/recordActions';

const AddRecordComponent = ({ addRecord }) => {
  const handleAddRecord = () => {
    const newRecord = {
      // Define the properties of the new record
    };
    addRecord(newRecord);
  };

  return (
    <button onPress={handleAddRecord}>Add Record</button>
  );
};

export default connect(null, { addRecord })(AddRecordComponent);
