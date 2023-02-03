import React from 'react'

const Messages = () => {
  const texts= [
    {
        id:1,
        name:'John Doe',
        message:'Lorem ipsum dolor sit adipisicing elit. Quisquam, quod.',
        time:'12:00pm'
    },
    {
        id:2,
        name:'Jane Doe',
        message:'Lorem ipsum dolor sit adipisicing elit. Quisquam, quod.',
        time:'12:00pm'
    },
    {
        id:3,
        name:'John Doe',
        message:'Lorem ipsum dolor sit adipisicing elit. Quisquam, quod.',
        time:'12:00pm'
    },
];
    
        return (
            <div className="preview mt-10 sm:mt-0">
              <h2 className="text-xl font-medium mb-4">Preview Messages</h2>
              <div className="prose-container h-28 md:w-full  lg:h-full overflow-y-auto rounded-lg p-4 bg-white">
                {texts.map((text) => (
                  <div className="mb-4 border-b border-gray-200" key={text.id}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{text.name}</h3>
                      <p className="text-sm text-gray-500">{text.time}</p>
                    </div>
                    <p className="prose text-gray-800 my-2">{text.message}</p>
                  </div>
                ))}
              </div>
            </div>
          );
  
}


export default Messages

