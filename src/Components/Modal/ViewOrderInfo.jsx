import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const ViewOrderInfo = ({isOpen, closeModal, selectedOrder}) => {
    return (
         <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </Transition.Child>
        
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-150"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                    {/* Title */}
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className="text-xl font-semibold text-gray-800">
                        📝 Order Details
                      </Dialog.Title>
                      <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">
                        &times;
                      </button>
                    </div>
        
                    {/* Image Section */}
                    {selectedOrder?.catImg?.[0] || selectedOrder?.foodImg?.[0] ? (
                      <img
                        src={selectedOrder?.catImg?.[0] || selectedOrder?.foodImg?.[0]}
                        alt="product"
                        className="w-full h-64 object-cover rounded-xl mb-5 border"
                      />
                    ) : null}
        
                    {/* Info Section */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                      <p><strong>Type:</strong> {selectedOrder?.Type}</p>
                      <p><strong>Quantity:</strong> {selectedOrder?.quantity}</p>
                      <p><strong>Total Amount:</strong> ৳{selectedOrder?.totalAmount}</p>
                      <p><strong>Status:</strong> {selectedOrder?.status}</p>
                      <p><strong>Phone:</strong> {selectedOrder?.phone}</p>
                      <p><strong>Location:</strong> {selectedOrder?.division || selectedOrder?.buyerAddress}</p>
        
                      {selectedOrder?.Type === 'Cat' && (
                        <>
                          <p><strong>Cat Name:</strong> {selectedOrder.catName}</p>
                          <p><strong>Breed:</strong> {selectedOrder.catBreed}</p>
                          <p><strong>Color:</strong> {selectedOrder.catColor}</p>
                          <p><strong>Age:</strong> {selectedOrder.catAge} months</p>
                          <p><strong>Weight:</strong> {selectedOrder.catWeight} kg</p>
                          <p><strong>Vaccinated:</strong> {selectedOrder.catVaccinated}</p>
                        </>
                      )}
        
                      {selectedOrder?.Type === 'CatFood' && (
                        <>
                          <p><strong>Food Name:</strong> {selectedOrder.foodName}</p>
                          <p><strong>Brand:</strong> {selectedOrder.foodBand}</p>
                          <p><strong>Category:</strong> {selectedOrder.foodcategory}</p>
                          <p><strong>Weight:</strong> {selectedOrder.foodweight} kg</p>
                          <p><strong>Expiry:</strong> {selectedOrder.foodexpiryDate}</p>
                        </>
                      )}
                    </div>
        
                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={closeModal}
                        className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded px-4 py-1"
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    );
};

export default ViewOrderInfo;