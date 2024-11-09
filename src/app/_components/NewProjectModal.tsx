import React from "react";
export default function NewProjectModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <>
    {open &&
<div className="overflow-y-auto overflow-x-hidden fixed top-0 bg-gray-300/50 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
  <div className="relative p-4 w-full max-w-md max-h-full">
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Create New Project
        </h3>
        <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <form className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-accentBrand">Project Name</label>
            <input type="text" className="bg-white border-2 border-primaryBrand text-sm rounded-lg outline-primaryBrand text-textBrand placeholder-textBrand block w-full p-2.5 " placeholder="Your Project Name" required/>
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-accentBrand">Project Description</label>
            <textarea rows={3} className="bg-white border-2 border-primaryBrand text-sm rounded-lg outline-primaryBrand text-textBrand placeholder-textBrand block w-full p-2.5 " placeholder="All about this project" required/>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-accentBrand">Completion Date</label>
            <input type="date" className="bg-white border-2 border-primaryBrand text-sm rounded-lg outline-primaryBrand text-textBrand placeholder-textBrand block w-full p-2.5 " required/>
          </div>
          <div className="col-span-2 text-center shadow-textBrand rounded-xl p-2 border shadow-sm text-accentBrand font-semibold sm:col-span-1">
            Add project members and to dos after creation!
          </div>
        </div>
        <button type="submit" className="text-white inline-flex items-center bg-secondaryBrand hover:bg-secondaryBrand/75 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer">
          <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          Add new product
        </button>
      </form>
    </div>
  </div>
</div>
}
</>
  );
}
