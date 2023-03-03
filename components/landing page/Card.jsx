const Card = ({ title, description, noBorderShadow }) => {
  return (
    <div
      className={`card p-4 
    ${noBorderShadow ? 'border-none shadow-none' : 'rounded-lg shadow-md border '}
    `}
    >
      <div className='card-body'>
        <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>{title}</h1>
        <p className='text-md md:text-lg font-sans font-medium text-gray-500 mb-4 tracking-wide leading-7'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
