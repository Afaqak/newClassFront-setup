const DeletePopup = ({ setToggleDelete, handleDelete, toggleDelete, setLoading }) => {
  return (
    <div className='w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='popup w-96 px-4 h-40 bg-white rounded-md flex flex-col justify-center items-center'>
        <h1 className='text-slate-900 text-2xl font-semibold'>Are you sure you want to delete this item?</h1>
        <div className='flex gap-x-4 '>
          <button
            className='bg-blue-500 mt-4 text-white py-1 px-10 rounded-lg hover:bg-blue-600'
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className='bg-white mt-4 border border-blue-500 text-blue-500 py-1 px-10 rounded-lg hover:bg-blue-500 hover:text-white'
            onClick={() => {
              setLoading(false);
              setToggleDelete(!toggleDelete);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeletePopup;
