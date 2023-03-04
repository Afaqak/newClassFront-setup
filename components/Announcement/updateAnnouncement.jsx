import Form from './Form';

const UpdateAnnouncement = ({ type, handleInputChange, handleSubmit, loading, input, setToggleUpdate }) => {
  return (
    <div className='fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center'>
      <Form
        handleInputChange={handleInputChange}
        type={type}
        handleSubmit={handleSubmit}
        loading={loading}
        setToggleAnnouncement={setToggleUpdate}
        input={input}
      />
    </div>
  );
};

export default UpdateAnnouncement;
